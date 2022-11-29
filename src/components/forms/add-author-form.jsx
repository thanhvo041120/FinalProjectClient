import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { InputNumberComponent } from "components/numberinput";
import { SelectDataComponent } from "components/select";
import { InputTextField } from "components/textinput";
import Joi from "joi";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "redux/store";
import { addAuthor } from "api/author.api";

const addAuthorSchema = Joi.object({
  name: Joi.string().required(),
});

const AddAuthorForm = (_props)=> {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(addAuthorSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
    };
    await addAuthor(formData);
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
          New Author
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
  )
}

export default AddAuthorForm