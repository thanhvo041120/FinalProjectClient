import React, { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Joi from "joi";
import {
  Box,
  Button,
  Container,
  Typography,
} from "../../../node_modules/@mui/material/index";
import { InputTextField } from "components/textinput/index";
import { useAppSelector } from "redux/store";
import { changePassword, resetPassword } from "api/user.api";
import { AlertDialogComponent } from "components/dialog/index";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const changePasswordSchema = Joi.object({
  newPassword: Joi.string().required().min(8),
  oldPassword: Joi.string().required().min(8),
});

const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().required().min(8),
});
const ChangPasswordForm = ({ id, reset, onClose }) => {
  const accountId = useAppSelector((state) => state.auth.id);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [titleDialog, setTitleDialog] = useState("");
  const [warnText, setWarnText] = useState("");
  const navigate = useNavigate();
  let schema;
  let defaultValue;
  if (reset !== "reset") {
    schema = changePasswordSchema;
    defaultValue = {
      newPassword: "",
      oldPassword: "",
    };
  } else {
    schema = resetPasswordSchema;
    defaultValue = {
      newPassword: "",
    };
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema),
    defaulValues: defaultValue,
  });

  const onSubmit = async (data) => {
    let response;
    if (reset === "reset") {
      response = await resetPassword(data, id);
    } else {
      response = await changePassword(data, accountId);
    }

    if (reset === "reset") {
      if (response.status === 200) {
        onClose();
        setTitleDialog("Success");
        setWarnText("Password is changed");
        setOpenAlert(true);
        setAlertColor("success");
        setTimeout(() => {
          handleClose();
          navigate(0);
        }, 2500);
      }
      if (response.status === 406) {
        onClose();
        setTitleDialog("Failure");
        setWarnText(response.data.data);
        setOpenAlert(true);
        setAlertColor("error");
        setTimeout(() => {
          handleClose();
        }, 2500);
      }
    } else {
      if (response.status === 200) {
        setTitleDialog("Success");
        setWarnText("Your password is changed");
        setOpenAlert(true);
        setAlertColor("success");
        setTimeout(() => {
          handleClose();
          navigate(0);
        }, 2500);
      }
      if (response.status === 406) {
        setTitleDialog("Failure");
        setWarnText(response.data.data);
        setOpenAlert(true);
        setAlertColor("error");
        setTimeout(() => {
          handleClose();
        }, 2500);
      }
    }
  };
  const handleClose = () => {
    setOpenAlert(false);
    setWarnText("");
    setAlertColor("");
    setTitleDialog("");
  };
  return (
    <React.Fragment>
      <Container
        sx={{
          backgroundColor: "#FFFFFF",
          marginTop: "10px",
          padding: "1%",
          borderRadius: "10px",
          marginBottom: "30px",
          border: "solid",
          borderColor: "#222930d3",
          width: "100%",
          borderWidth: 1,
        }}
      >
        {reset !== "reset" && (
          <Box
            component="form"
            sx={{
              width: "100%",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputTextField
              isRequired={true}
              name="oldPassword"
              control={control}
              label="Old password"
            />
            {errors?.oldPassword && (
              <Typography
                variant="subtitle2"
                sx={{ width: "100%", color: "#ff3333" }}
              >
                {errors.oldPassword.message?.replace(
                  '"oldPassword"',
                  "Old password"
                )}
              </Typography>
            )}
            <InputTextField
              isRequired={true}
              name="newPassword"
              control={control}
              label="New password"
            />
            {errors?.newPassword && (
              <Typography
                variant="subtitle2"
                sx={{ width: "100%", color: "#ff3333" }}
              >
                {errors.newPassword.message?.replace('"password"', "Password")}
              </Typography>
            )}
            <Button type="submit">Save</Button>
          </Box>
        )}
        {reset === "reset" && (
          <Box
            component="form"
            sx={{
              width: "100%",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputTextField
              isRequired={true}
              name="newPassword"
              control={control}
              label="New password"
            />
            {errors?.newPassword && (
              <Typography
                variant="subtitle2"
                sx={{ width: "100%", color: "#ff3333" }}
              >
                {errors.newPassword.message?.replace('"password"', "Password")}
              </Typography>
            )}
            <Button type="submit">Save</Button>
          </Box>
        )}
        {openAlert && (
          <AlertDialogComponent
            isOpen={openAlert}
            title={titleDialog}
            context={warnText}
            handleClose={handleClose}
            alertColor={alertColor}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default ChangPasswordForm;
