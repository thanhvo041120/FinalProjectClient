import { useAppSelector } from "redux/store";
import { getUserProfile } from "api/user.api";
import { HeaderComponent } from "components/header";
import { DrawerComponent } from "components/drawers";
import "./style.css";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import ProfileForm from "components/forms/profile-form";

import React, { useState, useEffect } from "react";

const UserProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [isDisable, setIsDisable] = useState(true);
  const accountId = useAppSelector((state) => state.auth.id);
  const fetchProfile = async () => {
    const result = await getUserProfile(accountId);
    setProfile(result.data);
  };

  const handleClickEdit = () => {
    setIsDisable(!isDisable);
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const drawerState = useAppSelector((state) => state.drawer.isOpen);

  return (
    <div className="background">
      <div className="app-bar-container">
        <HeaderComponent />
      </div>
      <div className="profile-header"></div>
      <div className="content-container responsive-container">
        <div className="css-name">
          <div className="vertical-box align-items-absolute-center">
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: "200px",
                  height: "200px",
                  fontSize: "100px",
                }}
                alt="Name"
                src="/broken-image.jpg"
              >
                {profile?.user?.fullname.charAt(0).toUpperCase()}
              </Avatar>
            </Stack>
            <Typography
              sx={{
                color: "#fff",
                width: "100%",
                textAlign: "center",
                marginTop: "30px",
                fontSize: "22px",
                lineHeight: "24px",
              }}
            >
              {profile?.user?.fullname.toUpperCase()}
            </Typography>
          </div>
        </div>
        <div className="vertical-box">
          <Typography
            variant="h3"
            sx={{
              color: "#FFF",
              marginTop: "10px"
            }}
          >
            About Me
          </Typography>
          <div className="edit-button-container">
            <Button
              onClick={handleClickEdit}
              sx={{
                width: "30%",
                fontSize: "18px",
                fontWeight: "bold",
                height: "50px",
                color: "#E9E9E9",
              }}
            >
              {isDisable ? "Edit Profile" : "Cancel Edit"}
            </Button>
          </div>
        </div>
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          {profile && <ProfileForm profile={profile} isDisable={isDisable} />}
        </Box>
      </div>
      {drawerState && (
        <div>
          <DrawerComponent />
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
