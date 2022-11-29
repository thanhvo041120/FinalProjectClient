import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "redux/store";
import MenuIcon from "@mui/icons-material/Menu";
import { changeVisibility } from "redux/slices/drawer.slice";
import {
  Button,
  ButtonGroup,
  Box,
  Toolbar,
  IconButton,
  Typography,
  AppBar,
} from "@mui/material";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const urlState = useLocation();
  const authState = useAppSelector((state) => state.auth.isLogin);
  const drawerState = useAppSelector((state) => state.drawer.isOpen);
  const handleDrawerOpen = () => {
    dispatch(changeVisibility(!drawerState));
  };

  const Buttons = (
    <React.Fragment>
      <ButtonGroup variant="outlined" sx={{ borderColor: "#E9E9E9" }}>
        <Button onClick={() => navigate("/login")} sx={{ color: "#E9E9E9" }}>
          SignIn
        </Button>
        <Button onClick={() => navigate("/register")} sx={{ color: "#E9E9E9" }}>
          SignUp
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222930",
        height: "80px"
      }}
    >
      <AppBar
        position="static"
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#222930",
          height: "80px",
        }}
      >
        <Toolbar>
          {urlState.pathname !== "/login" && urlState.pathname !== "/register" && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                mr: 2,
                ...(authState === false && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "Robonto",
              fontWeight: 800,
              letterSpacing: ".1rem",
              color: "#E9E9E9",
              textDecoration: "none",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              fontSize: "35px",
            }}
          >
            Smart library
          </Typography>
          {!authState && Buttons}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderComponent;
