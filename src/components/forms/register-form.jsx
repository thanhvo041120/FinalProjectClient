import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Link,
  Stack
} from "@mui/material";
import dayjs from 'dayjs';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { registerAccount } from "api/user.api";

const registerSchema = Joi.object({
  firstname: Joi.string().required().max(255),
  lastname: Joi.string().required().max(255),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required().min(8),
  address: Joi.string().required(),
  city: Joi.string().required(),
  phonenumber: Joi.string().required().min(10).max(10),
  birthday: Joi.date().required(),
});

const theme = createTheme();
const RegisterForm = () => {
  const [date, setDate] = React.useState(
    dayjs(Date.now()),
  ); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(registerSchema),
  });

  const handleChange = (newValue) => {
    setDate(newValue);
  };
 
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const redirect = (isSuccess) => {
    if (isSuccess) navigate("/login");
  };
  const onSubmit = async (data) => {
    const formData = {
      fullname: data.firstname + data.lastname,
      email: data.email,
      password: data.password,
      address: data.address + " " + data.city,
      phonenumber: data.phonenumber,
      birthday: data.birthday,
      roleId: 3
    };
    const result = await registerAccount(formData);
    if (result.status === 201) redirect(true);
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  required
                  fullWidth
                  id="firstName"
                  {...register("firstname")}
                />
                {errors?.firstname && (
                  <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
                    {errors.firstname.message?.replace(
                      '"firstname"',
                      "Firstname"
                    )}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
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
                  fullWidth
                  id="email"
                  label="Email Address"
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
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  {...register("password")}
                />

                {errors?.password && (
                  <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
                    {errors.password.message?.replace('"password"', "Password")}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
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
                  fullWidth
                  id="City"
                  label="City"
                  {...register("city")}
                />
                {errors?.city && (
                  <Typography variant="subtitle2" sx={{ color: "#ff3333" }}>
                    {errors.city.message?.replace('"city"', "City")}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phonenumber"
                  type="text"
                  id="phonenumber"
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
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Birthday"
                      inputFormat="MM/DD/YYYY"
                      value={date}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} 
                      {...register('birthday')}/>}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#4EB1BA",
                color: "#E9E9E9",
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={handleClick}
                  underline="hover"
                  variant="subtitle2"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterForm;
