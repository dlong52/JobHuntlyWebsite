import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  // transition: "all 0.3s ease-in-out",
  borderRadius: "8px",
  padding: "4px 8px",
  margin: "4px 0",
  border: `1px solid var(--neutrals-40)`,
  "&.Mui-checked-label": {
    border: `2px solid var(--primary)`,
  },
}));

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
  activeColor = "primary",
  ...props
}) => {
  const { name, value } = field;
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
          {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <RadioGroup row={row} className={classNameRadioGroup} {...field} {...props}>
        {options.map((option) => (
          <StyledFormControlLabel
            key={option.value}
            value={option.value}
            className={value === option.value ? "Mui-checked-label" : ""}
            control={
              <Radio
                disabled={disabled}
                sx={{
                  color: "var(--primary)",
                  "&.Mui-checked": {
                    color: "var(--primary)",
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
