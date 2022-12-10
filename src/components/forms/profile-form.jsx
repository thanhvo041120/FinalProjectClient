import { joiResolver } from "@hookform/resolvers/joi";
import { Typography, Grid, Button, Box } from "@mui/material";
import { InputTextField } from "components/textinput";
import Joi from "joi";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import { updateUserProfile } from "api/user.api";
import { AlertDialogComponent } from "components/dialog";
import { useNavigate } from "react-router-dom";
const profileSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  phonenumber: Joi.string().required(),
  birthday: Joi.date().raw().required(),
  address: Joi.string().required(),
  walletAddress: Joi.string().required(),
});
const ProfileForm = ({ profile, isDisable }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [titleDialog, setTitleDialog] = useState("");
  const [warnText, setWarnText] = useState("");
  const navigate = useNavigate();
  const [defaultProfile, setDefaultProfile] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    birthday: "",
    address: "",
    walletAddress: "",
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(profileSchema),
    defaultValues: defaultProfile,
  });
  const onSubmit = async (data) => {
    const response = await updateUserProfile(data, profile.id, profile.user.id);
    if (response.status === 409) {
      if (!isDisable) {
        setTitleDialog("Failure");
        setWarnText("Your phonenumber is registered!!!");
        setOpenAlert(true);
        setAlertColor("error");
        setTimeout(() => {
          handleClose();
        }, 2500);
      }
    }
    if (response.status === 200) {
      if (!isDisable) {
        setTitleDialog("Success");
        setWarnText("Your information is updated successfully");
        setOpenAlert(true);
        setAlertColor("success");
        setTimeout(() => {
          handleClose();
          navigate(0);
        }, 3000);
      }
    }
  };
  const handleOpen = () => {
    if (!isDisable) {
      setTitleDialog("Warning");
      setWarnText("You cannot change this field!!!");
      setOpenAlert(true);
      setAlertColor("error");
      setTimeout(() => {
        handleClose();
      }, 2500);
    }
  };
  const handleClose = () => {
    setOpenAlert(false);
    setWarnText("");
    setAlertColor("");
    setTitleDialog("");
  };

  useEffect(() => {
    if (profile) {
      setDefaultProfile({
        fullname: profile?.user?.fullname,
        email: profile?.email,
        phonenumber: profile?.user?.phonenumber,
        birthday: profile?.user?.birthday,
        address: profile?.user?.address,
        walletAddress: profile?.walletAddress,
      });
    }
    reset(defaultProfile);
  }, [
    defaultProfile.walletAddress,
    defaultProfile.fullname,
    profile
  ]);

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          marginBottom: "20px",
        }}
      >
        <Grid
          container
          spacing={3}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: "#FFFFFF",
            marginTop: "10px",
            padding: "1%",
            borderRadius: "10px",
            margin: 0,
            border: "solid",
            borderColor: "#222930d3",
            borderWidth: 1,
          }}
        >
          <Grid xs={12} item pr={3}>
            <InputTextField
              isDisable={isDisable}
              isRequired={true}
              name="fullname"
              control={control}
              label="Fullname"
            />
            {errors?.fullname && (
              <Typography
                variant="subtitle2"
                sx={{ width: "100%", color: "#ff3333" }}
              >
                {errors.fullname.message?.replace('"fullname"', "Fullname")}
              </Typography>
            )}
          </Grid>

          <Grid xs={12} item pr={3} onClick={handleOpen}>
            <InputTextField
              isDisable={true}
              isRequired={true}
              name="email"
              control={control}
              label="Email"
            />
          </Grid>

          <Grid xs={12} item pr={3}>
            <InputTextField
              isDisable={isDisable}
              isRequired={true}
              name="address"
              control={control}
              label="Address"
            />
            {errors?.address && (
              <Typography
                variant="subtitle2"
                sx={{ width: "100%", color: "#ff3333" }}
              >
                {errors.address.message?.replace('"address"', "Address")}
              </Typography>
            )}
          </Grid>

          <Grid xs={12} item pr={3}>
            <InputTextField
              isDisable={isDisable}
              isRequired={true}
              name="phonenumber"
              control={control}
              label="Phonenumber"
            />
            {errors?.phonenumber && (
              <Typography
                variant="subtitle2"
                sx={{ width: "100%", color: "#ff3333" }}
              >
                {errors.phonenumber.message?.replace(
                  '"phonenumber"',
                  "Phonenumber"
                )}
              </Typography>
            )}
          </Grid>

          <Grid
            xs={12}
            item
            pr={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
            onClick={handleOpen}
          >
            <InputTextField
              isDisable={true}
              isRequired={true}
              name="walletAddress"
              control={control}
              label="Wallet address"
            />
            {errors?.walletAddress && (
              <Typography
                variant="subtitle2"
                sx={{ width: "100%", color: "#ff3333" }}
              >
                {errors.walletAddress.message?.replace(
                  '"walletAddress"',
                  "Wallet"
                )}
              </Typography>
            )}
          </Grid>
          <Grid
            xs={12}
            item
            pr={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
            onClick={handleOpen}
          >
            <InputTextField
              isDisable={true}
              isRequired={true}
              name="birthday"
              control={control}
              label="Birthday"
            />
            {errors?.birthday && (
              <Typography
                variant="subtitle2"
                sx={{ width: "100%", color: "#ff3333" }}
              >
                {errors.birthday.message?.replace('"birthday"', "Birthday")}
              </Typography>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            pr={3}
            pb={4}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            {!isDisable && <Button type="submit">Save</Button>}
          </Grid>
        </Grid>
        {openAlert && (
          <AlertDialogComponent
            isOpen={openAlert}
            title={titleDialog}
            context={warnText}
            handleClose={handleClose}
            alertColor={alertColor}
          />
        )}
      </Box>
    </Fragment>
  );
};

export default ProfileForm;
