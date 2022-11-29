import React from "react";
import { DialogComponent } from "components/dialog";
import { List, ListItem, Typography } from "@mui/material";

const StaffOptions = () => {
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
        Library Management
      </Typography>
      <List>
        {["Add Book", "Add Author", "Add Category"].map((text) => (
          <ListItem key={text} disablePadding>
            <DialogComponent
              buttonStyle={{
                color: "#222930",
                fontWeight: "400",
                display: "flex",
                justifyContent: "flex-start",
                padding: "8px 16px",
                alignItems: "center",
                fontSize: "1rem",
              }}
              buttonName={text}
            />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default StaffOptions;
