import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

const CheckboxField = ({
  field,
  form,
  label,
  labelTop,
  disabled = false,
  classNameContainer = "",
  classNameLabel = "",
  required = false,
  ...props
}) => {
  const { name, value, onChange, onBlur } = field;
  const { touched, errors } = form;
  const showError = Boolean(touched[name] && errors[name]);

  return (
    <FormControl
      className={`flex flex-col gap-1 ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      {labelTop && (
        <label
          className={`flex items-center ${classNameLabel}`}
          htmlFor={name}
        >
          {labelTop}
          {required && (
            <span style={{ color: "red", marginLeft: 4 }}>*</span>
          )}
        </label>
      )}
      <FormControlLabel
        control={
          <Checkbox
            id={name}
            disabled={disabled}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            {...props}
          />
        }
        label={label}
      />
      {showError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default CheckboxField;
