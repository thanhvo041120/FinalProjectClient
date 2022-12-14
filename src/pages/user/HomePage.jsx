import { Typography } from "@mui/material";
import {
  countBooks,
  getBooks,
  getBooksByCategory,
  getBooksLengthByCategory,
} from "api/book.api";
import { GroupCardComponent } from "components/cards";
import { DrawerComponent } from "components/drawers";
import { HeaderComponent } from "components/header";
import { NotFoundComponent } from "components/notfound";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "redux/store";
import { PaginationComponent } from "components/pagination";
import "./style.css";
import { SearchComponent } from "components/search/index";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const drawerState = useAppSelector((state) => state.drawer.isOpen);
  const dataState = useAppSelector((state) => state.viewData);
  const fetchData = async () => {
    if (searchItem.length > 0) {
      if (dataState.categoryId === 0) {
        const result = await getBooks(page, 6, searchItem);
        const count = await countBooks(searchItem);
        setCount(count.data);
        setBooks(result.data);
        return;
      }
      if (dataState.categoryId > 0) {
        const result = await getBooksByCategory(
          page,
          6,
          dataState.categoryId,
          searchItem
        );
        const count = await getBooksLengthByCategory(
          dataState.categoryId,
          searchItem
        );

        setCount(count.data);
        setBooks(result.data);
        return;
      }
    } else {
      if (dataState.categoryId === 0) {
        const result = await getBooks(page, 6);
        const count = await countBooks();
        setCount(count.data);
        setBooks(result.data);
        return;
      }
      if (dataState.categoryId > 0) {
        const result = await getBooksByCategory(page, 6, dataState.categoryId);
        const count = await getBooksLengthByCategory(dataState.categoryId);
        setCount(count.data);
        setBooks(result.data);
        return;
      }
    }
  };
  const handleChange = (event, value) => {
    event.preventDefault();
    setPage(value);
  };

  useEffect(() => {
    fetchData();
  }, [page, dataState.categoryId, searchItem]);
  return (
    <div className="feedpage-container">
      <div className="feedpage-app-bar-container">
        <HeaderComponent />
      </div>
      {drawerState && (
        <div>
          <DrawerComponent />
        </div>
      )}
      <div className="feedpage-content-container">
        <div className="feedpage-content-label-container">
          <div className="feedpage-content-label">
            {dataState.categoryId === 0 ? (
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  alignItems: "center",
                  fontSize: 20,
                }}
              >
                {dataState.categoryName} types of books
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  alignItems: "center",
                  fontSize: 20,
                }}
              >
                Books of {dataState.categoryName}
              </Typography>
            )}

            <SearchComponent onSubmit={setSearchItem} />
          </div>
        </div>

        {books.length > 0 ? (
          <div className="feedpage-content">
            <GroupCardComponent books={books} count={count} />
            <PaginationComponent count={count} handleChange={handleChange} />
          </div>
        ) : (
          <NotFoundComponent />
        )}
      </div>
    </div>
  );
};

export default HomePage;
