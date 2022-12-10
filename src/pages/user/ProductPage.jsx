import { DrawerComponent } from "components/drawers";
import { BorrowFormComponent } from "components/forms";
import { HeaderComponent } from "components/header";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/store";
import { useParams } from "react-router-dom";
import { getBookById, getSADetail } from "api/book.api";
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
import { AlertDialogComponent } from "components/dialog";
import { NormalTableComponent } from "components/table";
import { getBorrowers } from "hooks/smartcontract";
import { getUserByWallet } from "api/user.api";
import { ethers } from "../../../node_modules/ethers/lib/index";

const borrowersColumn = [
  { id: "hashSA", label: "Book SA code", minWidth: 170 },
  { id: "borrower", label: "Borrowrers", minWidth: 100 },
];
const ProductPage = () => {
  const [book, setBook] = useState({});
  const [category, setCategory] = useState({});
  const [owners, setOwners] = useState([]);
  const [author, setAuthor] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { bookId } = useParams();
  const [account, setAccount] = useState(null);
  const drawerState = useAppSelector((state) => state.drawer.isOpen);
  const handleOpen = () => {
    setOpenAlert(!openAlert);
  };
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const handleChange = () => {
    setShowForm(!showForm);
  };
  const fetchData = async () => {
    if (window.ethereum) {
      const account = await provider.send("eth_requestAccounts", []);
      setAccount(account[0]);
    }
    const response = await getBookById(bookId);
    setBook(response.data);
  };
  const fetchRelatedData = async () => {
    if (book.categoryId !== null) {
      const fetchedCategory = await findCategoryById(book.categoryId);
      setCategory(fetchedCategory.data[0]);
    } else {
      setCategory({ name: "Empty" });
    }
    if (book.authorId !== null) {
      const fetchedAuthor = await findAuthorById(book.authorId);
      setAuthor(fetchedAuthor.data);
    } else {
      setAuthor({ name: "Empty" });
    }
    if (book) {
      const response = await getSADetail(bookId);
      const data = await Promise.all(
        response.data.map(async (item) => {
          const borrower = await getBorrowers(item.address);
          return { hashSA: item.hashSA, borrower: borrower };
        })
      );
      const users = await Promise.all(
        data.map(async (item) => {
          const response = await getUserByWallet(item.borrower);
          if (response.data.roleId === 2 || response.data.roleId === 1) {
            return { hashSA: item.hashSA, borrower: "Library" };
          }
          return {
            hashSA: item.hashSA,
            borrower: response.data?.user?.fullname,
          };
        })
      );
      setOwners(users);
    }
  };
  useEffect(() => {
    fetchData();
    fetchRelatedData();
  }, [book.categoryId, owners.length, account]);

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
                  <img className="image-book" src={book.image} alt="v" />
                </div>
                {showForm ? (
                  <div>
                    <BorrowFormComponent
                      bookId={bookId}
                      handleCancel={handleChange}
                    />
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
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#222930",
                            fontSize: "30px",
                            fontWeight: "bold",
                            display: "-webkit-box",
                            wordBreak: "break-all",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
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
                            Borrower List
                          </Typography>
                          <NormalTableComponent
                            columns={borrowersColumn}
                            data={owners}
                            tableHeight={400}
                          />
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
