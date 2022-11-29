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
import React from "react";
import { useForm } from "react-hook-form";
import { addCategory } from "api/category.api";

const addCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

const AddCategoryForm = (_props) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(addCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      description: data.description,
    };
    await addCategory(formData);
    _props.onClose();
  };
  const handleClick = () => {
    _props.onClose();
  };
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
          New Category
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
