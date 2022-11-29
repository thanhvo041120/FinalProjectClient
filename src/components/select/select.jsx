import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { AuthorApi } from "api/author.api";

const SelectDataComponent = ({
  name,
  control,
  label,
  data,
  isRequired,
}) => {
  const generateSelectOptions = () => {
    return data.map((option) => {
      return (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      );
    });
  };

  return (
    <Fragment>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) =>
          isRequired ? (
            <Fragment>
              <TextField
                required
                variant="outlined"
                onChange={onChange}
                value={value}
                select
                label={label}
              >
                {generateSelectOptions()}
              </TextField>
            </Fragment>
          ) : (
            <Fragment>
              <TextField
                variant="outlined"
                onChange={onChange}
                value={value}
                select
                label={label}
              >
                {generateSelectOptions()}
              </TextField>
            </Fragment>
          )
        }
      />
    </Fragment>
  );
};

export default SelectDataComponent;
