import { DrawerComponent } from "components/drawers";
import { BorrowFormComponent } from "components/forms";
import { HeaderComponent } from "components/header";
import React, { useEffect, useState } from "react";
import bookImage from "assets/books/sach-1.jpg";
import { useAppSelector } from "redux/store";
import { useParams } from "react-router-dom";
import { getBookById } from "api/book.api";
import {
  Box,
  Typography,
  Container,
  Stack,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import { findCategoryById } from "api/category.api";
import { findAuthorById } from "api/author.api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AlertDialogComponent } from "components/dialog";

const columns = [
  { id: "name", label: "Book SA code", minWidth: 170 },
  { id: "code", label: "Username", minWidth: 100 },
];

function createData(name, code) {
  return { name, code };
}

const rows = [
  createData("India", "IN"),
  createData("China", "CN"),
  createData("Italy", "IT"),
  createData("United States", "US"),
  createData("Canada", "CA"),
  createData("Australia", "AU"),
  createData("Germany", "DE"),
  createData("Ireland", "IE"),
  createData("Mexico", "MX"),
  createData("Japan", "JP"),
  createData("France", "FR"),
  createData("United Kingdom", "GB"),
  createData("Russia", "RU"),
  createData("Nigeria", "NG"),
  createData("Brazil", "BR"),
];

const ProductPage = () => {
  const [book, setBook] = useState({});
  const [category, setCategory] = useState({});
  const [author, setAuthor] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showForm, setShowForm] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const { bookId } = useParams();
  const drawerState = useAppSelector((state) => state.drawer.isOpen);
  const handleOpen = () => {
    setOpenAlert(!openAlert);
  };
  const fetchData = async () => {
    const response = await getBookById(bookId);
    setBook(response.data);
  };

  const handleChange = () => {
    setShowForm(!showForm);
  };
  const fetchRelatedData = async () => {
    if (book.categoryId) {
      const response = await findCategoryById(book.categoryId);
      const fetchedAuthor = await findAuthorById(book.authorId);
      setAuthor(fetchedAuthor.data);
      setCategory(response.data[0]);
    }
  };
  useEffect(() => {
    fetchData();
  }, [bookId]);
  useEffect(() => {
    fetchRelatedData();
  }, [book.categoryId]);

  return (
    <div className="product-page-container">
      <div className="app-bar-container">
        <HeaderComponent />
      </div>
      {drawerState && (
        <div>
          <DrawerComponent />
        </div>
      )}
      {book && (
        <div className="container">
          <div className="column-container">
            <div className="book-detail-container">
              <div className="book-detail">
                <div className="image-book-block">
                  <img className="image-book" src={bookImage} alt="v" />
                </div>
                {showForm ? (
                  <div>
                    <BorrowFormComponent handleCancel={handleChange} />
                  </div>
                ) : (
                  <Container maxWidth="sm" className="content-book-container">
                    <Box className="content-book">
                      <Stack
                        className="book-detail-content"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={2}
                      >
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#222930",
                            fontSize: "30px",
                            fontWeight: "bold",
                          }}
                        >
                          Book: {book.name}
                        </Typography>
                        <Tooltip
                          title={book.description}
                          enterDelay={500}
                          leaveDelay={200}
                          followCursor
                        >
                          <Typography
                            onClick={handleOpen}
                            sx={{
                              justifyContent: "flex-start",
                              alignItems: "center",
                              color: "#222930",
                              fontSize: "20px",
                              paddingLeft: "50px",
                              display: "-webkit-box",
                              wordBreak: "break-all",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            Preview: {book.description}
                          </Typography>
                        </Tooltip>

                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            color: "#222930",
                            fontSize: "20px",
                            paddingLeft: "50px",
                          }}
                        >
                          Category: {category.name}
                        </Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            color: "#222930",
                            fontSize: "20px",
                            paddingLeft: "50px",
                          }}
                        >
                          Author: {author.name}
                        </Typography>
                        <div>
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "#222930",
                              fontSize: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            Borrower
                          </Typography>
                          <TableContainer
                            sx={{
                              maxHeight: 400,
                              border: "solid",
                              borderWidth: 1,
                              borderColor: "#222930",
                            }}
                          >
                            <Table stickyHeader aria-label="sticky table">
                              <TableHead>
                                <TableRow>
                                  {columns.map((column) => (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{
                                        minWidth: column.minWidth,
                                        fontSize: 18,
                                        fontWeight: 700,
                                      }}
                                    >
                                      {column.label}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((row) => {
                                    return (
                                      <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                      >
                                        {columns.map((column) => {
                                          const value = row[column.id];
                                          return (
                                            <TableCell
                                              key={column.id}
                                              align={column.align}
                                            >
                                              {column.format &&
                                              typeof value === "number"
                                                ? column.format(value)
                                                : value}
                                            </TableCell>
                                          );
                                        })}
                                      </TableRow>
                                    );
                                  })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                        <Button
                          onClick={handleChange}
                          variant="contained"
                          sx={{ mt: 3, ml: 1 }}
                        >
                          Borrow
                        </Button>
                      </Stack>
                    </Box>
                  </Container>
                )}
              </div>
            </div>
          </div>
          {openAlert && (
            <AlertDialogComponent
              isOpen={openAlert}
              title="Preview"
              context={book.description}
              handleClose={handleOpen}
              alertColor="success"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
