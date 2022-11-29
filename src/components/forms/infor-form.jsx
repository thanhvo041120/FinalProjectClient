import React from "react";
import { Grid, Typography, TextField } from "@mui/material";
import Joi from "joi";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAppDispatch } from "redux/store";
import { setIndividualInformation } from "redux/slices/borrow.slice";

const InformationForm = () => {
  const dispatch = useAppDispatch();
  const individualInformationSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    phonenumber: Joi.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(individualInformationSchema),
  });

  const onSubmit = (data) => {
    dispatch(setIndividualInformation(data));
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Individual Information
      </Typography>
      <Grid
        container
        spacing={3}
        component="form"
        onBlur={handleSubmit(onSubmit)}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            label="First name"
            fullWidth
            variant="standard"
            {...register("firstname")}
          />
          {errors?.firstname && (
            <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
              {errors.firstname.message?.replace('"firstname"', "Firstname")}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            label="Last name"
            fullWidth
            variant="standard"
            {...register("lastname")}
          />
          {errors?.lastname && (
            <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
              {errors.lastname.message?.replace('"lastname"', "Lastname")}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            label="Email address"
            fullWidth
            variant="standard"
            {...register("email")}
          />
          {errors?.email && (
            <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
              {errors.email.message?.replace('"email"', "Email")}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            label="Address"
            fullWidth
            required
            variant="standard"
            {...register("address")}
          />
          {errors?.address && (
            <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
              {errors.address.message?.replace('"address"', "Address")}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            label="City"
            fullWidth
            variant="standard"
            {...register("city")}
          />
          {errors?.city && (
            <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
              {errors.city.message?.replace('"city"', "City")}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phonenumber"
            required
            label="Phonenumber"
            fullWidth
            variant="standard"
            {...register("phonenumber")}
          />
          {errors?.phonenumber && (
            <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
              {errors.phonenumber.message?.replace(
                '"phonenumber"',
                "Phonenumber"
              )}
            </Typography>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default InformationForm;
