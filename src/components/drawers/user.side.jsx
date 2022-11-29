import { findAllCategory } from "api/category.api";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "redux/store";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { setCategory } from "redux/slices/view-book.slice";
const UserOptions = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useAppDispatch();
  const drawerState = useAppSelector((state) => state.drawer.isOpen);
  const fetchCategories = async () => {
    const response = await findAllCategory();
    setCategories(response.data);
  };

  const onSelectCategory = (id,text) => {
    dispatch(setCategory({categoryId: id,categoryName: text}));
  }
  useEffect(() => {
    fetchCategories();
  }, [drawerState]);
  return (
    <React.Fragment>
      <Typography
        sx={{
          color: "#222930",
          fontWeight: "800",
          padding: "8px 16px",
          alignItems: "center",
          fontSize: "1rem",
        }}
      >
        Book Categories
      </Typography>
      <List>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: "center",
            px: 2.5,
          }}
          onClick={()=>onSelectCategory(0, "All")}
        >
          <BookmarksIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          />
          <ListItemText primary="All" sx={{ opacity: 1 }} />
        </ListItemButton>
        {categories.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
              }}
              onClick={()=>onSelectCategory(item.id,item.name)}
            >
              <BookmarksIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                }}
              />
              <ListItemText primary={item.name} sx={{ opacity: 1 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default UserOptions;
