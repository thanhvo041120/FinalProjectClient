import React, { useState, forwardRef, useEffect } from "react";
import { Dialog, DialogContent, Slide } from "@mui/material";
import {
  AddBookFormComponent,
  AddAuthorFormComponent,
  AddCategoryComponent,
} from "components/forms";
import { getBookById } from "api/book.api";
import { findAuthorById } from "api/author.api";
import { findCategoryById } from "api/category.api";
import { ChangePasswordComponent, RegisterFormComponent } from "components/forms/index";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogNoButton = (_props) => {
  const [data, setData] = useState({});
  const getData = async () => {
    if (_props.formName === "book") {
      const response = await getBookById(_props.selectedId);
      setData(response.data);
    }
    if (_props.formName === "author") {
      const response = await findAuthorById(_props.selectedId);
      setData(response.data);
    }
    if (_props.formName === "category") {
      const response = await findCategoryById(_props.selectedId);
      setData(response.data);
    }
  };

  const handleRenderForm = (formName) => {
    switch (formName.toLowerCase()) {
      case "book":
        return (
          <AddBookFormComponent
            data={data}
            isDisable={true}
            title="Update Book"
            onClose={handleClose}
            open={_props.open}
          />
        );
      case "author":
        return (
          <AddAuthorFormComponent
            title="Update Author"
            open={_props.open}
            onClose={handleClose}
            data={data}
          />
        );
      case "category":
        return (
          <AddCategoryComponent
            title="Update Category"
            open={_props.open}
            onClose={handleClose}
            data={data}
          />
        );
      case "addstaff":
        return (
          <RegisterFormComponent name={_props.formName} onClose={handleClose} />
        );
      case "reset":
        return <ChangePasswordComponent id={_props.selectedId} onClose={handleClose} reset="reset"/>;
      default:
        throw new Error("Unknown form");
    }
  };
  const handleClose = () => {
    _props.setOpen(false);
  };
  useEffect(() => {
    getData();
  }, [_props.open]);
  return (
    <React.Fragment>
      <Dialog
        open={_props.open}
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
          {handleRenderForm(_props.formName)}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogNoButton;
