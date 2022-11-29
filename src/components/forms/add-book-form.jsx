import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Typography,
} from "@mui/material";
import { InputNumberComponent } from "components/numberinput";
import { SelectDataComponent } from "components/select";
import { InputTextField } from "components/textinput";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Flag from "redux/slices/flag.slice";
import { useAppDispatch } from "redux/store";
import { findAllAuthor } from "api/author.api";
import { createBook, updateBooks } from "api/book.api";
import { findAllCategory } from "api/category.api";
import { DialogComponent } from "components/dialog";

const addBookSchema = Joi.object({
  bookName: Joi.string().required(),
  description: Joi.string(),
  total: Joi.number().required(),
  authorId: Joi.number().required(),
  categoryId: Joi.number().required(),
  image: Joi.string().required(),
});

const AddBookForm = (_props) => {
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [defaultBook, setDefaultBook] = useState({
    bookName: "",
    description: "",
    total: 0,
    authorId: 0,
    categoryId: 0,
    image: "",
  });
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(addBookSchema),
    defaultValues: defaultBook,
  });

  register("image");
  const handleGetUrl = (url) => {
    if (url) setValue("image", url);
  };
  const onSubmit = async (data) => {
    try {
      dispatch(Flag.reset());
      let response;
      const formData = {
        name: data.bookName,
        description: data.description,
        total: data.total,
        authorId: data.authorId,
        categoryId: data.categoryId,
        image: data.image,
      };

      if (!_props.data) {
        response = await updateBooks(formData, _props.data.id);
      } else {
        response = await createBook(formData);
        console.log("🚀 ~ file: add-book-form.jsx ~ line 76 ~ onSubmit ~ response", response)

      }
      response.status === 201 || response.status === 200
        ? dispatch(Flag.successful({ success: "success" }))
        : dispatch(Flag.failed({ fail: "failed" }));
      _props.onClose();
    } catch (error) {
      console.log(">>>", error.message);
    }
  };
  const handleClick = () => {
    _props.onClose();
  };

  const fetchAuthor = async () => {
    const result = await findAllAuthor();
    setAuthors(result.data);
  };

  const fetCategory = async () => {
    const result = await findAllCategory();
    setCategories(result.data);
  };
  useEffect(() => {
    fetchAuthor();
    fetCategory();
    if (_props.data) {
      setDefaultBook({
        bookName: _props?.data.name,
        description: _props?.data.description,
        total: _props?.data.total,
        authorId: _props?.data.authorId,
        categoryId: _props?.data.categoryId,
        image: _props?.data.image,
      });
      reset(defaultBook);
    }
  }, [_props.open, _props.data, defaultBook.bookName]);
  return (
    <React.Fragment>
      <Container
        maxWidth="xs"
        sx={{
          width: "100%",
        }}
      >
        <CssBaseline />
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            color: "#222930",
            fontWeight: "bold",
          }}
        >
          {_props.title}
        </Typography>
        <Box
          component="form"
          sx={{
            width: "100%",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputTextField
            isRequired={true}
            name="bookName"
            control={control}
            label="Name of book"
          />
          {errors?.bookName && (
            <Typography
              variant="subtitle2"
              sx={{ width: "100%", color: "#ff3333" }}
            >
              {errors.bookName.message?.replace('"bookName"', "Book name")}
            </Typography>
          )}

          <InputTextField
            isRequired={false}
            name="description"
            control={control}
            label="Description of book"
          />

          <InputNumberComponent
            name="total"
            isDisable={_props.isDisable}
            isRequired={true}
            control={control}
            label="Total"
          />
          {errors?.total && (
            <Typography
              variant="subtitle2"
              sx={{ width: "100%", color: "#ff3333" }}
            >
              {errors.total.message?.replace('"total"', "Total")}
            </Typography>
          )}

          <FormControl
            variant="standard"
            fullWidth
            sx={{
              mt: "10px",
              width: "100%",
            }}
          >
            <SelectDataComponent
              isRequired={true}
              name="authorId"
              control={control}
              label={"Author"}
              data={authors}
            />
            {errors?.authorId && (
              <Typography
                variant="subtitle2"
                sx={{ width: "100%", color: "#ff3333" }}
              >
                {errors.authorId.message?.replace('"authorId"', "author")}
              </Typography>
            )}
          </FormControl>
          <FormControl
            variant="standard"
            fullWidth
            sx={{
              mt: "10px",
              width: "100%",
            }}
          >
            <SelectDataComponent
              isRequired={true}
              name="categoryId"
              control={control}
              label={"Category"}
              data={categories}
            />
            {errors?.categoryId && (
              <Typography
                variant="subtitle2"
                sx={{ width: "100%", color: "#ff3333" }}
              >
                {errors.categoryId.message?.replace('"categoryId"', "category")}
              </Typography>
            )}
          </FormControl>
          <Box
            sx={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DialogComponent
              buttonStyle={{
                color: "#222930",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "15px",
                color: "#FFFFFF",
                backgroundColor: "#1976D2",
                height: "50px",
                "&:hover": {
                  color: "#FFFFFF",
                  backgroundColor: "#1976d299",
                },
              }}
              buttonName="Choose image for book"
              fn={handleGetUrl}
            />
          </Box>
          <Box
            sx={{
              marginTop: "15px",
              display: "flex",
              gap: "3%",
            }}
          >
            <Button variant="contained" onClick={handleClick}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AddBookForm;
