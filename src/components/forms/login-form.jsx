import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
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
  IconButton,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FaFacebook } from "react-icons/fa";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { loginAccount } from "api/user.api";
import { login } from "redux/slices/auth.slice";
import { useAppDispatch } from "redux/store";

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .default(""),
  password: Joi.string().required().min(8).default(""),
});
const theme = createTheme();

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(loginSchema),
  });

  const redirect = (isSuccess, roleId) => {
    if (isSuccess) {
      switch (roleId) {
        case 2:
          navigate("/staff");
          break;
        case 3:
          navigate("/user");
          break;
      }
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  const onSubmit = async (data) => {
    const result = await loginAccount(data);
    const reduxState = {
      isLogin: true,
      email: result.data.email,
      id: result.data.accountId,
      roleId: result.data.roleId,
    };
    dispatch(login(reduxState));
    if (result.status !== 201) navigate(0);
    if (result.status === 201) {
      localStorage.setItem("access_token", result.data.tokens.access_token);
      localStorage.setItem("refresh_token", result.data.tokens.refresh_token);
    }
    if (localStorage.getItem("access_token"))
      redirect(true, result.data.roleId);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="dense"
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
            <TextField
              margin="dense"
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
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={handleClick}
                  sx={{
                    cursor: "pointer",
                  }}
                  underline="hover"
                  variant="subtitle2"
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <div className="open-authentication-side">
        <Typography variant="h6" color={"#424242"}>
          Or Sign In Using
        </Typography>
        <div className="open-authentication-options">
          <IconButton aria-label="Google" color="info">
            <FcGoogle fontSize={50} />
          </IconButton>
          <IconButton aria-label="Facebook" color="primary">
            <FaFacebook fontSize={50} />
          </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LoginForm;
