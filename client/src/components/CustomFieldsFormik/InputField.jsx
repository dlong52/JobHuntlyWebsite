import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import { twMerge } from "tailwind-merge";

const InputField = ({
  field,
  form,
  label,
  labelTop,
  disabled,
  classNameContainer = "",
  classNameLabel = "",
  className,
  readOnly = false,
  required = false,
  size = "medium",
  placeholder = "",
  type = "text",
  leftIcon,
  sx,
  ...props
}) => {
  const { name } = field;
  const { touched, errors } = form;
  const showError = Boolean(touched[name] && errors[name]);

  return (
    <FormControl
      className={`flex w-full flex-col gap-1 ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      {labelTop && (
        <label className={`flex items-center ${classNameLabel}`} htmlFor="">
          {labelTop}
          {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <TextField
        disabled={disabled}
        label={label}
        size={size}
        {...field}
        {...props}
        type={type}
        sx={sx}
        className={twMerge("", className)}
        placeholder={placeholder}
        InputProps={{
          readOnly: readOnly,
          startAdornment: leftIcon && (
            <InputAdornment position="start">{leftIcon}</InputAdornment>
          ),
        }}
        required={required}
        error={showError}
      />
      {showError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default InputField;
