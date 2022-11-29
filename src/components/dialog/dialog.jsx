import React, { useState, forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Slide,
} from "@mui/material";
import { AddBookFormComponent, AddAuthorFormComponent, AddCategoryComponent, UploadImageFormComponent } from "components/forms";

const Transition = forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = (_props) => {
  const [open, setOpen] = useState(false);

  const handleRenderForm = (formName) => {
    switch (formName.toLowerCase()) {
      case "add book":
        return <AddBookFormComponent title="New Book" isDisable={false} onClose={handleClose} open={open}/>;
      case "add author":
        return <AddAuthorFormComponent onClose={handleClose} />;
      case "add category":
        return <AddCategoryComponent onClose={handleClose}/>;
      case "choose image for book": 
        return <UploadImageFormComponent fn={_props.fn} setImageUrl={_props.setImageUrl} onClose={handleClose}/>;
      default:
        throw new Error("Unknown form");
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        variant="text"
        sx={_props.buttonStyle}
        fullWidth
        onClick={handleClickOpen}
      >
        {_props.buttonName}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent
          sx={{
            width: "100%",
            backgroundColor: "#E9E9E9",
          }}
        >
          {handleRenderForm(_props.buttonName)}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogComponent;
