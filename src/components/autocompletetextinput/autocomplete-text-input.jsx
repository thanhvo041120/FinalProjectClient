import { Autocomplete, TextField } from "@mui/material";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";

const InputTextAutoCompleteComponent = ({
  name,
  control,
  label,
  isRequired,
  isDisable,
  data,
}) => {
  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              disabled={isDisable}
              disablePortal
              options={data}
              sx={{
                mt: "10px",
                width: "100%",
              }}
              renderInput={(params) => (
                <TextField {...params} value={value} label={label} required />
              )}
              onChange={(_, data) => onChange(data)}
            />
          );
        }}
      />
    </Fragment>
  );
};

export default InputTextAutoCompleteComponent;
