import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { change } from "redux/slices/admin-option.slice";
import { useAppDispatch } from "redux/store";

const AdminOptions = () => {
  const dispatch = useAppDispatch();
  const onSelectOption = (text) => {
    dispatch(change({ option: text }));
  };
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
        System management
      </Typography>
      <List>
        {["Dashboard", "Staff", "User"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
              }}
              onClick={() => onSelectOption(text)}
            >
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#222930",
                  display: "flex",
                  alignItems: "center",
                }}
                sx={{
                  opacity: 1,
                  padding: "8px 16px",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default AdminOptions;
