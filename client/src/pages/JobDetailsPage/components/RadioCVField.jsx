import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const RadioCVField = ({
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
  borderColor = "var(--primary)", // Border color for selected item
  ...props
}) => {
  const { name, value: selectedValue } = field; // Extract selected value
  const { touched, errors } = form;
  const showError = Boolean(touched[name] && errors[name]);

  return (
    <FormControl
      className={`flex flex-col gap-2 ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      {labelTop && (
        <label className={`flex items-center ${classNameLabel}`} htmlFor="">
          {labelTop}
          {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <RadioGroup
        row={false}
        className={classNameRadioGroup}
        {...field}
        {...props}
      >
        <div className=" flex flex-col gap-3">
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              sx={{
                marginX: 0,
              }}
              className={`p-2 rounded border !flex !items-start gap-2 ${
                selectedValue === option.value ? "border-primary" : ""
              }`}
              control={
                <Radio
                  disabled={disabled}
                  className={`text-gray-100 !p-0 ${
                    selectedValue === option.value ? "text-primary" : ""
                  }`}
                />
              }
              label={option.label}
            />
          ))}
        </div>
      </RadioGroup>
      {showError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default RadioCVField;
