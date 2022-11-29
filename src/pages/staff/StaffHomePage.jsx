import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { HeaderComponent } from "components/header";
import { DrawerComponent } from "components/drawers";
import { useAppSelector } from "redux/store";
import { getBooks } from "api/book.api";
import { TableComponent } from "components/table";
import { Stack } from "@mui/system";
import { findAllCategory } from "api/category.api";
import { findAllAuthor } from "api/author.api";
import { DialogNoButtonComponent } from "components/dialog";

const StaffHomePage = () => {
  const flag = useAppSelector((state) => state.flag.successState);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [open, setOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const drawerState = useAppSelector((state) => state.drawer.isOpen);
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
  const bookColumns = [
    { id: "name", label: "Book name", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
  ];
  const categoryColumns = [
    { id: "name", label: "Category", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
  ];
  const authorColumns = [{ id: "name", label: "Name", minWidth: 170 }];
  const handleClick = (form, id) => {
    setOpen(true);
    setFormName(form);
    setSelectedId(id);
  };
  useEffect(() => {
    fetchBooks();
    fetchCategories();
    fetchAuthors();
  }, [flag, books[0]?.name]);
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
      <Container>
        <Box
          className="content-book"
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Stack spacing={8}>
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
              <TableComponent
                tableName="book"
                handleClick={handleClick}
                columns={bookColumns}
                data={books}
                tableHeight={500}
              />
            </Box>

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
                columns={categoryColumns}
                data={categories}
                tableHeight={500}
              />
            </Box>

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
                columns={authorColumns}
                data={authors}
                tableHeight={500}
              />
            </Box>
          </Stack>
        </Box>
      </Container>
      {open && (
        <DialogNoButtonComponent
          selectedId={selectedId}
          open={open}
          setOpen={setOpen}
          formName={formName}
        />
      )}
    </div>
  );
};

export default StaffHomePage;
