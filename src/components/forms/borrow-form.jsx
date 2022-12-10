import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  CssBaseline,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AlertDialogComponent } from "components/dialog";
import Joi from "joi";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { borrowBook, getBookById, getSADetail } from "api/book.api";
import { InputTextField } from "components/textinput";
import { InputTextAutoCompleteComponent } from "components/autocompletetextinput";
import { useAppSelector } from "redux/store";
import { borrow } from "hooks/smartcontract";
import { sendBorrowSuccessMail } from "api/mail.api";
import { getUserByWallet } from "api/user.api";

const bookSchema = Joi.object({
  bookName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  expDate: Joi.date().required(),
  SA: Joi.string().required(),
});
const BorrowForm = ({ handleCancel, bookId }) => {
  const user = useAppSelector((state) => state.auth);
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [titleDialog, setTitleDialog] = useState("");
  const [warnText, setWarnText] = useState("");
  const navigate = useNavigate();
  const [addressToSA, setAddressToSA] = useState([]);
  const [book, setBook] = useState({});
  const [success, setSuccess] = useState(false);
  const [defaultBook, setDefaultBook] = useState({
    bookName: "",
    email: "",
    expDate: dayjs(Date.now()),
    SA: "",
  });
  const [hashSA, setHashSA] = React.useState([]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(bookSchema),
    defaultValues: defaultBook,
  });
  const handleOpen = (text) => {
    setTitleDialog("Warning");
    setWarnText(text);
    setAlert(true);
    setAlertColor("error");
    setTimeout(() => {
      handleClose();
    }, 2500);
  };
  const handleClose = () => {
    setAlert(false);
    setWarnText("");
    setAlertColor("");
    setTitleDialog("");
  };
  const handleClick = () => {
    setSuccess(!success);
    navigate("/user");
  };
  const onSubmit = async (data) => {
    const bookAddress = addressToSA.filter((item) => item.hashSA === data.SA);
    const response = await borrowBook(
      data,
      bookAddress[0].address,
      user.walletAddress
    );
    if (response.status === 501) {
      handleOpen(response.result);
    }
    if (response.status === 201) {
      const response = await getUserByWallet(user.walletAddress);
      setSuccess(true);
      await sendBorrowSuccessMail({
        receiver: user.email,
        subject: "Notify about borrowing new book successfully",
        text: `Dear ${response.data.user.fullname}, Your borrowed book is successful. The book ${data.bookName} has the exprired date at ${data.expDate}. Please take note this date to avoid the penalty of the library. Thank you for using our service`,
      });
    }
  };

  const fetchData = async () => {
    const response = await getBookById(bookId);
    const SA = await getSADetail(bookId);
    const hash = SA.data.map((item) => {
      return item.hashSA;
    });
    setHashSA(hash);
    setBook(response.data);
    setAddressToSA(SA.data);
  };
  useEffect(() => {
    fetchData();
    if (book) {
      setDefaultBook({
        bookName: book?.name,
        email: user.email,
        expDate: dayjs(Date.now())
          .add(book.expLength, "day")
          .format("DD/MM/YYYY"),
        SA: "",
      });
    }
    reset(defaultBook);
  }, [bookId, book.name, defaultBook.bookName]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Receipt
          </Typography>
          {success === true ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your interest.
              </Typography>
              <Typography variant="subtitle1">
                Your borrowed book is successful. We have emailed your order
                information.
              </Typography>
              <Button variant="outlined" onClick={handleClick}>
                Go to home
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {defaultBook && (
                <Grid
                  container
                  spacing={3}
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Grid item xs={12} md={6}>
                    <InputTextField
                      isRequired={true}
                      isDisable={true}
                      name="bookName"
                      control={control}
                      label="Name of book"
                    />
                    {errors?.bookName && (
                      <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
                        {errors.bookName.message?.replace(
                          '"bookName"',
                          "Book name"
                        )}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputTextField
                      isRequired={true}
                      isDisable={true}
                      name="email"
                      control={control}
                      label="Email"
                    />
                    {errors?.email && (
                      <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
                        {errors.email.message?.replace('"email"', "Email")}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputTextField
                      isRequired={true}
                      isDisable={true}
                      name="expDate"
                      control={control}
                      label="Expiration date"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputTextAutoCompleteComponent
                      isRequired={true}
                      name="SA"
                      control={control}
                      label="SA"
                      data={hashSA}
                    />
                    {errors?.SA && (
                      <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
                        {errors.SA.message?.replace('"SA"', "SA")}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="contained"
                      onClick={handleCancel}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              )}
            </React.Fragment>
          )}
        </Paper>
        {alert && (
          <AlertDialogComponent
            isOpen={alert}
            title={titleDialog}
            context={warnText}
            handleClose={handleClose}
            alertColor={alertColor}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default BorrowForm;
