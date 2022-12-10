import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import { InputTextField } from "components/textinput";
import Joi from "joi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addCategory, updateCategory } from "api/category.api";
import { useState } from "react";
import * as Flag from "redux/slices/flag.slice";
import { useAppDispatch } from "redux/store";

const addCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

const AddCategoryForm = (_props) => {
  const dispatch = useAppDispatch();

  const [defaultCategory, setDefaultCategory] = useState({
    name: "",
    description: "",
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(addCategorySchema),
    defaultValues: defaultCategory,
  });

  const fetchPost = async (title, formData) => {
    if (title === "Update Category") {
      const response = await updateCategory(_props.data[0].id, formData);
      return response;
    } else {
      const response = await addCategory(formData);
      return response;
    }
  };
  const onSubmit = async (data) => {
    dispatch(Flag.reset());
    const formData = {
      name: data.name,
      description: data.description,
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
      setDefaultCategory({
        name: _props.data[0]?.name,
        description: _props.data[0]?.description,
      });
      reset(defaultCategory);
    }
  }, [_props.open, _props.data, defaultCategory?.name]);
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
            label="Name of category"
          />
          {errors?.name && (
            <Typography
              variant="subtitle2"
              sx={{ width: "100%", color: "#ff3333" }}
            >
              {errors.name.message?.replace('"name"', "Author name")}
            </Typography>
          )}
          <InputTextField
            isRequired={false}
            name="description"
            control={control}
            label="Description"
          />
          <Button onClick={handleClick}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AddCategoryForm;
