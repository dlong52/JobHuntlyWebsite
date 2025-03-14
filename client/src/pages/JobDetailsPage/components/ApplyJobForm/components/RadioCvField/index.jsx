import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const RadioCvField = ({
  field,
  form,
  labelTop,
  options = [],
  row = false,
  required = false,
  classNameContainer = "",
  classNameLabel = "",
  classNameRadioGroup = "",
  disabled = false,
  activeColor = "primary", // New prop for active color
  ...props
}) => {
  const { name } = field;
  const { touched, errors } = form;
  const showError = Boolean(touched[name] && errors[name]);

  return (
    <FormControl
      className={`flex flex-col gap-1 select-none ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      {labelTop && (
        <label
          className={`flex items-center select-none ${classNameLabel}`}
          htmlFor=""
        >
          {labelTop}
          {required && (
            <span style={{ color: "red", marginLeft: 4 }}>*</span>
          )}
        </label>
      )}
      <RadioGroup
        row={row}
        className={classNameRadioGroup}
        {...field}
        {...props}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                disabled={disabled}
                sx={{
                  color: activeColor, 
                  "&.Mui-checked": {
                    color: activeColor, 
                  },
                }}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
      {showError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default RadioCvField;
