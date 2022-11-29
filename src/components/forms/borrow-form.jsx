import React, { useState } from "react";
import {
  Button,
  Typography,
  CssBaseline,
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import InformationForm from "./infor-form";
import BookForm from "./book-form";
import { useNavigate } from "react-router-dom";

const BorrowForm = ({handleCancel}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Individual information", "Book information"];
  const navigate = useNavigate();
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleClick = () => {
    navigate("/staff");
  };
  const changeSteps = (step) => {
    switch (step) {
      case 0:
        return <InformationForm />;
      case 1:
        return <BookForm />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Receipt
          </Typography>
          <Stepper activeStep={currentStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {currentStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your interest.
                </Typography>
                <Typography variant="subtitle1">
                  Your borrowed book is successful. We have emailed your order
                  information.
                </Typography>
                <Button variant="outlined" onClick={handleClick}>
                  Go to home
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {changeSteps(currentStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {currentStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleCancel}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {currentStep === steps.length - 1 ? "Borrow" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default BorrowForm;
