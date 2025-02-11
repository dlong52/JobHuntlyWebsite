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
  const { name, value } = field;
  const { touched, errors, setFieldValue } = form;
  const showError = Boolean(touched[name] && errors[name]);

  // Xử lý sự kiện thay đổi giá trị
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
              {...props}
            />
          }
          label={label}
        />
        {labelTop && (
          <label
            className={`flex items-center cursor-pointer ${classNameLabel}`}
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
