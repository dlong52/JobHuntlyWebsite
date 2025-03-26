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
  activeColor,
  ...props
}) => {
  const { name, value } = field;
  const { touched, errors, setFieldValue } = form;
  const showError = Boolean(touched[name] && errors[name]);

  const handleChange = (event) => {
    setFieldValue(name, event.target.checked);
  };
  return (
    <FormControl
      className={`flex gap-1 ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      <div className="flex items-center">
        <FormControlLabel
          sx={{
            margin: 0,
            padding: 0,
          }}
          control={
            <Checkbox
              id={name}
              disabled={disabled}
              checked={Boolean(value)}
              onChange={handleChange}
              sx={{
                color: "var(--neutrals-100)", // Màu khi chưa checked
                "&.Mui-checked": {
                  color: activeColor, // Màu khi checked
                },
              }}
              {...props}
            />
          }
          label={label}
        />
        {labelTop && (
          <label
            className={`flex text-neutrals-100 items-center cursor-pointer text-nowrap ${classNameLabel}`}
            htmlFor={name}
          >
            {labelTop}
            {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
          </label>
        )}
      </div>
      {showError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default CheckboxField;
