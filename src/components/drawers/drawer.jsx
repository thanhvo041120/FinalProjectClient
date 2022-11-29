import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Typography,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "redux/store";
import { changeVisibility } from "redux/slices/drawer.slice";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import { logout } from "redux/slices/auth.slice";
import * as DrawerStore from "redux/slices/drawer.slice";
import * as BorrowStore from "redux/slices/borrow.slice";
import * as FlagStore from "redux/slices/flag.slice";
import * as ViewStore from "redux/slices/view-book.slice";
import { logoutAccout } from "api/user.api";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import UserOptions from "./user.side";
import StaffOptions from "./staff.side";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  height: "80px",
}));

const AppDrawerBar = () => {
  const drawerState = useAppSelector((state) => state.drawer.isOpen);
  const userState = useAppSelector((state) => state.auth.roleId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDrawerClose = () => {
    dispatch(changeVisibility(!drawerState));
  };

  const handleLogout = async () => {
    await logoutAccout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(logout());
    dispatch(DrawerStore.reset());
    dispatch(BorrowStore.reset());
    dispatch(FlagStore.reset());
    dispatch(ViewStore.reset());
  };
  const handleNavigate = (text) => {
    if (userState === 3) {
      if (text.toLocaleLowerCase() === "home") {
        navigate("/user");

        dispatch(changeVisibility(!drawerState));
      }
      if (text.toLocaleLowerCase() === "profile") {
        navigate("/user/profile");
        dispatch(changeVisibility(!drawerState));
      }
      if (text.toLocaleLowerCase() === "logout") {
        handleLogout();
      }
    }
    if (userState === 2) {
      if (text.toLocaleLowerCase() === "home") {
        navigate("/staff");
        dispatch(changeVisibility(!drawerState));
      }
      if (text.toLocaleLowerCase() === "logout") {
        handleLogout();
      }
    }
  };
  const Side = () => {
    if (userState === 3) return <UserOptions />;
    if (userState === 2) return <StaffOptions />;
  };
  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        open={drawerState}
        sx={{
          width: "360px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "360px",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography
          sx={{
            color: "#222930",
            fontWeight: "800",
            padding: "8px 16px",
            alignItems: "center",
            fontSize: "1rem",
          }}
        >
          Navigation
        </Typography>
        <List>
          {["Home", "Profile", "Logout"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  px: 2.5,
                }}
                onClick={() => handleNavigate(text)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: 1 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Side />
      </Drawer>
    </React.Fragment>
  );
};

export default AppDrawerBar;
