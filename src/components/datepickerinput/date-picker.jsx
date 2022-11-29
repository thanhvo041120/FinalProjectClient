import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
const DateInput = ({ name, control, label, isDisable }) => {
  return (
    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DesktopDatePicker
            label={label}
            disabled={isDisable}
            inputFormat="MM/DD/YYYY"
            fullWidth
            value={dayjs(value)}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
