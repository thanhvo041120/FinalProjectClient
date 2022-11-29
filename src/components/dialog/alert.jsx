import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import React, { Fragment, forwardRef, useState, useEffect } from "react";

const AlerDialog = ({ isOpen, context, handleClose, alertColor, title }) => {
  const [color, setColor] = useState("#ff3333");
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  const changeColor = () => {
    if (alertColor === "error") {
      setColor("#ff3333");
      return;
    }
    if (alertColor === "info") {
      setColor("#0288D1");
      return;
    }
    if (alertColor === "warning") {
      setColor("#ED6C02");
      return;
    }
    if (alertColor === "success") {
      setColor("#2E7D32");
      return;
    }
  };
  const AlertItem = () => {
    switch (alertColor) {
      case "error":
        return (
          <Alert variant="filled" severity="error">
            {context}
          </Alert>
        );
      case "info":
        return (
          <Alert variant="filled" severity="info">
            {context}
          </Alert>
        );
      case "warning":
        return (
          <Alert variant="filled" severity="warning">
            {context}
          </Alert>
        );
      case "success":
        return (
          <Alert variant="filled" severity="success">
            {context}
          </Alert>
        );
    }
  };

  useEffect(() => {
    changeColor();
  }, [alertColor]);
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      disableScrollLock={true}
      onClose={handleClose}
      sx={{ width: "100%" }}
    >
      <DialogTitle>
        <Typography
          sx={{
            width: "100%",
            color: `${color}`,
            fontWeight: "bolder",
            fontSize: "25px",
          }}
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <AlertItem />
      </DialogContent>
    </Dialog>
  );
};

export default AlerDialog;
