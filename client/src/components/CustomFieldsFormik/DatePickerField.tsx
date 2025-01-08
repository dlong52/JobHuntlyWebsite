import React from "react";
import { twMerge } from "tailwind-merge";
// import {  } from "lodash";
import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const DatePickerField = (props) => {
  const {
    labelTop,
    classNameLabel,
    classNameContainer,
    form,
    readOnly = false,
    disabled = false,
    field,
    required = false,
    sx,
  } = props;

  const { name, onBlur, value } = field;
  const { errors, touched, setFieldValue } = form;

  const showError = Boolean(touched[name] && errors[name]);
//   const msgError = get(touched, name) && get(errors, name);

  // Ensure value is a valid moment object or null
  const validValue = value ? moment(value, "DD/MM/YYYY", true) : null;

  const handleChange = (date) => {
    const resultDate = date ? date.format("DD/MM/YYYY") : "";
    console.log(resultDate);
    console.log(name);

    setFieldValue(name, resultDate, true);
  };

  return (
    <FormControl
      className={`flex flex-col h-auto gap-1 ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      {labelTop && (
        <label
          className={`flex items-center ${classNameLabel}`}
          htmlFor={name}
        >
          {labelTop}
          {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <DatePicker
        format="DD/MM/YYYY"
        name={name}
        sx={sx}
        value={validValue}
        onChange={handleChange}
        className="select-none"
        slotProps={{
          textField: {
            disabled,
            onBlur,
            name,
            id: name,
            fullWidth: true,
            error: showError,
            // helperText: showError ? msgError : "",
            InputProps: {
              readOnly,
              className: twMerge(
                readOnly && "!bg-gray-100",
                // msgError && "!border-red-500",
                // "!tw-h-[45px]"
              ),
            },
          },
        }}
      />
    </FormControl>
  );
};

export default DatePickerField;
