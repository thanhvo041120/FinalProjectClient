import React from "react";
import { Typography, TextField, Grid, Stack } from "@mui/material";
import Joi from "joi";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch } from "redux/store";
import { setBookInformation } from "redux/slices/borrow.slice";


const bookSchema = Joi.object({
  bookName: Joi.string().required(),
  bookCategory: Joi.string().required(),
  expiredDate: Joi.date().required(),
  SA: Joi.string().required(),
});


const BookForm = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = React.useState(dayjs(Date.now()));
  const handleChange = (newValue) => {
    setDate(newValue);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(bookSchema),
  });

  const onSubmit = (data) => {
    const resolvedDate = data.expiredDate.toLocaleDateString();
    data = {...data, stringDate: resolvedDate}
    dispatch(setBookInformation(data))
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Book detail
      </Typography>
      <Grid
        container
        spacing={3}
        component="form"
        onBlur={handleSubmit(onSubmit)}
      >
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="bookName"
            label="Name of book"
            fullWidth
            variant="standard"
            {...register("bookName")}
          />
          {errors?.bookName && (
            <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
              {errors.bookName.message?.replace('"bookName"', "Book name")}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="bookCategory"
            label="Category"
            fullWidth
            variant="standard"
            {...register("bookCategory")}
          />
          {errors?.bookCategory && (
            <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
              {errors.bookCategory.message?.replace(
                '"bookCategory"',
                "Book category"
              )}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Expiration date"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField {...params} {...register("expiredDate")} />
                )}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="blockid"
            label="SA"
            fullWidth
            variant="standard"
            {...register("SA")}
          />
          {errors?.SA && (
            <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
              {errors.SA.message?.replace('"SA"', "SA")}
            </Typography>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default BookForm;
