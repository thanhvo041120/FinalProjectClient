import { TextField } from "@mui/material";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";

const TextInput = ({
  name,
  control,
  label,
  isRequired,
  isDisable,
}) => {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) =>
          isRequired ? (
            <TextField
              disabled={isDisable}
              required
              fullWidth
              variant="outlined"
              onChange={onChange}
              value={value}
              label={label}
              sx={{
                mt: "10px",
                width: "100%",
              }}
            />
          ) : (
            <TextField
              disabled={isDisable}
              fullWidth
              variant="outlined"
              onChange={onChange}
              value={value}
              label={label}
              sx={{
                mt: "10px",
                width: "100%",
              }}
            />
          )
        }
      />
    </Fragment>
  );
};

export default TextInput;
