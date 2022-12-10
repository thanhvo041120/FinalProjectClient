import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { HeaderComponent } from "components/header";
import { DrawerComponent } from "components/drawers";
import { useAppDispatch, useAppSelector } from "redux/store";
import { getBooks, getOverdueBorrowers } from "api/book.api";
import { TableComponent } from "components/table";
import { Stack } from "@mui/system";
import { deleteCategory, findAllCategory } from "api/category.api";
import { deleteAuthor, findAllAuthor } from "api/author.api";
import { AlertDialogComponent } from "components/dialog/index";
import { DialogNoButtonComponent } from "components/dialog";
import { failed, reset, successful } from "redux/slices/flag.slice";
import { ExpandTableComponent } from "components/table/index";
import { NotFoundComponent } from "components/notfound/index";
import { sendBorrowSuccessMail } from "api/mail.api";

const StaffHomePage = () => {
  const drawerState = useAppSelector((state) => state.drawer.isOpen);
  const flag = useAppSelector((state) => state.flag.successState);
  const dispatch = useAppDispatch();
  const [books, setBooks] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [open, setOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [titleDialog, setTitleDialog] = useState("");
  const [warnText, setWarnText] = useState("");
  const fetchBooks = async () => {
    const response = await getBooks();
    setBooks(response.data);
  };
  const fetchCategories = async () => {
    const response = await findAllCategory();
    setCategories(response.data);
  };
  const fetchAuthors = async () => {
    const response = await findAllAuthor();
    setAuthors(response.data);
  };
  const fetchOverdueBorrowers = async () => {
    const response = await getOverdueBorrowers();
    const data = response.data.filter((item) => item.account.roleId === 3);
    setOverdue(data);
  };
  const bookColumns = [
    { id: "name", label: "Book name", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "options", label: "Options", minWidth: 100 },
  ];
  const categoryColumns = [
    { id: "name", label: "Category", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "options", label: "Options", minWidth: 100 },
  ];
  const authorColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "options", label: "Options", minWidth: 100 },
  ];
  const overdueColums = [
    { id: "email", label: "Email", minWidth: 170 },
    { id: "bookName", label: "Book", minWidth: 170 },
    { id: "expDate", label: "Expired date", minWidth: 170 },
    { id: "options", label: "Options", minWidth: 100 },
  ];
  const fetchDetete = async (form, id) => {
    dispatch(reset());
    if (form === "category") {
      const response = await deleteCategory(id);

      if (response.status === 200) {
        handleOpen("Success", "Delete successfully", "success");
        dispatch(successful({ success: "success" }));
      } else {
        handleOpen("Failed", "Delete failed", "error");
        dispatch(failed({ fail: "failed" }));
      }
    }
    if (form === "author") {
      const response = await deleteAuthor(id);

      if (response.status === 200) {
        handleOpen("Success", "Delete successfully", "success");
        dispatch(successful({ success: "success" }));
      } else {
        handleOpen("Failed", "Delete failed", "error");
        dispatch(failed({ fail: "failed" }));
      }
    }
  };
  const handleClick = async (form, id, buttonName) => {
    if (
      buttonName.toLowerCase() === "update" ||
      buttonName.toLowerCase() === "borrower"
    ) {
      setOpen(true);
      setFormName(form);
      setSelectedId(id);
    }
    if (buttonName.toLowerCase() === "delete") {
      fetchDetete(form, id);
    }
    if (buttonName.toLowerCase() === "notify") {
      const user = overdue.filter((item) => item.id === id);
      const response = await sendBorrowSuccessMail({
        receiver: user[0].account.email,
        subject: "Notify about overdue",
        text: `Dear ${user[0].account.email}, Your borrowed book is overdue.
         The book  has the exprired date at ${user[0].expDate}. Please take note this date to avoid the penalty of the library. Thank you for using our service`,
      });
      if(response.status ===200){
        handleOpen("Success", "Notifying mail is sent to borrower", "success")
      }
    }
  };
  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchAuthors();
    fetchOverdueBorrowers();
  }, [flag, books[0]?.name]);

  const handleOpen = (title, warningText, color) => {
    setTitleDialog(title);
    setWarnText(warningText);
    setOpenAlert(true);
    setAlertColor(color);
    setTimeout(() => {
      handleClose();
    }, 2500);
  };
  const handleClose = () => {
    setOpenAlert(false);
    setWarnText("");
    setAlertColor("");
    setTitleDialog("");
  };
  return (
    <div>
      <div>
        <HeaderComponent />
      </div>
      {drawerState && (
        <div>
          <DrawerComponent />
        </div>
      )}
      {overdue.length === 0 &&
      books.length === 0 &&
      authors.length === 0 &&
      categories.length === 0 ? (
        <NotFoundComponent />
      ) : (
        <Container>
          <Box
            className="content-book"
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Stack spacing={8}>
              {books.length > 0 && (
                <Box>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#222930",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    Book
                  </Typography>

                  <ExpandTableComponent
                    tableName="book"
                    handleClick={handleClick}
                    columns={bookColumns}
                    data={books}
                    tableHeight={500}
                  />
                </Box>
              )}

              {categories.length > 0 && (
                <Box>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#222930",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    Category
                  </Typography>
                  <TableComponent
                    tableName="category"
                    columns={categoryColumns}
                    data={categories}
                    tableHeight={500}
                    handleClick={handleClick}
                  />
                </Box>
              )}

              {authors.length > 0 && (
                <Box>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#222930",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    Author
                  </Typography>
                  <TableComponent
                    tableName="author"
                    columns={authorColumns}
                    data={authors}
                    tableHeight={500}
                    handleClick={handleClick}
                  />
                </Box>
              )}

              {overdue.length > 0 && (
                <Box>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#222930",
                      fontSize: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    Overdue borrowers
                  </Typography>
                  <TableComponent
                    tableName="overdue"
                    columns={overdueColums}
                    data={overdue}
                    tableHeight={500}
                    handleClick={handleClick}
                  />
                </Box>
              )}
            </Stack>
          </Box>
        </Container>
      )}

      {open && (
        <DialogNoButtonComponent
          selectedId={selectedId}
          open={open}
          setOpen={setOpen}
          formName={formName}
        />
      )}
      {openAlert && (
        <AlertDialogComponent
          isOpen={openAlert}
          title={titleDialog}
          context={warnText}
          handleClose={handleClose}
          alertColor={alertColor}
        />
      )}
    </div>
  );
};

export default StaffHomePage;
