import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";

const AutocompleteField = ({
  field,
  form,
  labelTop,
  variant,
  options = [],
  disabled = false,
  placeholder = "",
  required = false,
  size = "medium",
  classNameContainer = "",
  classNameLabel = "",
  leftIcon, // Add leftIcon prop
  ...props
}) => {
  const { name, value } = field;
  const { touched, errors, setFieldValue } = form;
  const showError = Boolean(touched[name] && errors[name]);

  const handleChange = (_, selectedValue) => {
    setFieldValue(name, selectedValue);
  };

  return (
    <FormControl
      className={`flex flex-col gap-1 ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      {labelTop && (
        <label className={`${classNameLabel}`} htmlFor="">
          {labelTop} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label || ""}
        value={value || null}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            size={size}
            error={showError}
            variant={variant}
            helperText={showError ? errors[name] : ""}
            InputProps={{
              ...params.InputProps,
              startAdornment: leftIcon && (
                <InputAdornment className={ disabled ? "opacity-30" : ""} position="start">{leftIcon}</InputAdornment>
              ),
            }}
          />
        )}
        {...props}
      />
      {showError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default AutocompleteField;
