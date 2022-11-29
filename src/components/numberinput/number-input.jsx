import { TextField } from "@mui/material";
import { required } from "joi";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";



const InputNumber = ({
  name,
  control,
  label,
  isRequired,
  isDisable
}) => {
  if(!isDisable){
    isDisable = false;
  }
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) =>
          isRequired ? (
            <TextField
              required
              type="number"
              fullWidth
              disabled={isDisable}
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
              fullWidth
              type="number"
              variant="outlined"
              onChange={onChange}
              disabled={isDisable}
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

export default InputNumber;
