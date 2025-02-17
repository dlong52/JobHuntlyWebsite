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
  variant = "outlined",
  options = [],
  disabled = false,
  placeholder = "",
  required = false,
  size = "medium",
  classNameContainer = "",
  classNameLabel = "",
  defaultValue,
  className,
  sx,
  multiple = false,
  leftIcon,
  ...props
}) => {
  const { name, value } = field;
  const { touched, errors, setFieldValue } = form;
  const showError = Boolean(touched[name] && errors[name]);
  const handleChange = (_, selectedValue) => {
    setFieldValue(name, multiple ? selectedValue || [] : selectedValue || null);
  };
  return (
    <FormControl
      className={`flex flex-col gap-1 ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      {labelTop && (
        <label className={`${classNameLabel}`} htmlFor={name}>
          {labelTop} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <Autocomplete
        options={options}
        sx={sx}
        defaultValue={defaultValue}
        multiple={multiple}
        getOptionLabel={(option) => option?.label ?? ""}
        value={multiple ? value ?? [] : value ?? null}
        onChange={handleChange}
        isOptionEqualToValue={(option, selected) => {
          return JSON.stringify(option) === JSON.stringify(selected);
        }}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            size={size}
            className={className}
            error={showError}
            variant={variant}
            // helperText={showError ? errors[name] : ""}
            InputProps={{
              ...params.InputProps,
              startAdornment: leftIcon && (
                <InputAdornment
                  className={disabled ? "opacity-30" : ""}
                  position="start"
                >
                  {leftIcon}
                </InputAdornment>
              ),
            }}
          />
        )}
        {...props}
      />

      {showError && <FormHelperText>{errors[name]?.value}</FormHelperText>}
    </FormControl>
  );
};

export default AutocompleteField;
