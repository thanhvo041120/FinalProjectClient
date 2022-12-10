import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import { InputTextField } from "components/textinput";
import Joi from "joi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addAuthor, updateAuthor } from "api/author.api";
import { useState } from "react";
import * as Flag from "redux/slices/flag.slice";
import { useAppDispatch } from "redux/store";

const addAuthorSchema = Joi.object({
  name: Joi.string().required(),
});

const AddAuthorForm = (_props) => {
  const dispatch = useAppDispatch();
  const [defaultAuthor, setDefaultAuthor] = useState({
    name: "",
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(addAuthorSchema),
    defaultValues: defaultAuthor,
  });
  const fetchPost = async (title, formData) => {
    if (title === "Update Author") {
      const response = await updateAuthor(_props.data.id, formData);
      return response;
    } else {
      const response = await addAuthor(formData);
      return response;
    }
  };
  const onSubmit = async (data) => {
    dispatch(Flag.reset());
    const formData = {
      name: data.name,
    };
    const response = await fetchPost(_props.title, formData);
    if (response.status === 201 || response.status === 200) {
      dispatch(Flag.successful({ success: "success" }));
      _props.onClose();
    } else {
      dispatch(Flag.failed({ fail: "failed" }));
      _props.onClose();
    }
  };
  const handleClick = () => {
    _props.onClose();
  };

  useEffect(() => {
    if (_props.data) {
      setDefaultAuthor({
        name: _props?.data.name,
      });
      reset(defaultAuthor);
    }
  }, [_props.open, _props.data, defaultAuthor?.name]);
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
            name="name"
            control={control}
            label="Name of author"
          />
          {errors?.name && (
            <Typography
              variant="subtitle2"
              sx={{ width: "100%", color: "#ff3333" }}
            >
              {errors.name.message?.replace('"name"', "Author name")}
            </Typography>
          )}
          <Button onClick={handleClick}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AddAuthorForm;
