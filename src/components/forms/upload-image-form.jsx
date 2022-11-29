import { Button, CssBaseline, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { uploadImage } from "api/firebase.api";
import React, { useState } from "react";

const UpLoadForm = (_props) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const handleGetImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    await uploadImage(image, setUrl);
  };

  const handleClearImage = () => {
    setImage(null);
    const input = document.getElementById("inputImage");
    input.value = "";
  };
  const handleClose = () => {
    _props.fn(url);
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
            fontWeight: "bold",
          }}
        >
          Upload Image
        </Typography>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <TextField
            id="inputImage"
            fullWidth
            type="file"
            inputProps={{
              accept: "image/*",
            }}
            onChange={handleGetImage}
            sx={{
              mt: "10px",
              width: "100%",
            }}
          />
          <TextField
            fullWidth
            value={url}
            onChange={() => _props.setImageUrl(url)}
            disabled={true}
            label="Image url"
            sx={{
              mt: "10px",
              width: "100%",
            }}
          />
          <Box
            sx={{
              marginTop: "15px",
              display: "flex",
              gap: "3%",
            }}
          >
            {url !== null ? (
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            ) : (
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            )}
            {image && url === "" && (
              <Button variant="contained" onClick={handleClearImage}>
                Clean image
              </Button>
            )}
            {url === "" && (
              <Button variant="contained" onClick={handleUpload}>
                Save
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default UpLoadForm;
