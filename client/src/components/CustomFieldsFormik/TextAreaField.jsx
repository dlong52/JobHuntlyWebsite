import React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const TextAreaField = ({
  field,
  variant = "plain" | "outlined" | "soft" | "solid",
  color = "primary" | "neutral" | "danger" | "success" | "warning",
  form,
  label,
  labelTop,
  disabled,
  classNameContainer = "",
  classNameLabel = "",
  className,
  readOnly = false,
  required = false,
  placeholder = "",
  rows = 3,
  maxRows = 5,
  leftIcon,
  ...props
}) => {
  console.log({ variant });

  const { name } = field;
  const { touched, errors } = form;
  const showError = Boolean(touched[name] && errors[name]);

  return (
    <FormControl
      className={`flex flex-col gap-1 ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      {labelTop && (
        <label className={`flex items-center ${classNameLabel}`} htmlFor={name}>
          {labelTop}
          {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <div className={`relative ${className}`}>
        {leftIcon && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}
        <TextareaAutosize
          color={color}
          variant={variant}
          disabled={disabled}
          {...field}
          {...props}
          id={name}
          placeholder={placeholder}
          rows={rows}
          maxRows={maxRows}
          readOnly={readOnly}
          className={`resize-none border min-h-40 p-3 focus:outline-2 outline-blue-500 w-full ${
            leftIcon ? "pl-8" : ""
          } ${showError ? "border-red-500" : "border-gray-300"} rounded`}
          style={{ fontSize: "inherit" }}
        />
      </div>
      {showError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default TextAreaField;
