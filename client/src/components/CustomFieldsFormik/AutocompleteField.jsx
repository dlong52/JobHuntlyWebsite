import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip"; // Thêm import Chip

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

  // Đảm bảo giá trị luôn là array nếu multiple=true
  const currentValue = React.useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : value ? [value] : [];
    } else {
      return value || null;
    }
  }, [value, multiple]);

  const handleChange = (_, selectedValue) => {
    if (multiple) {
      setFieldValue(name, selectedValue || []);
    } else {
      setFieldValue(name, selectedValue || null);
    }
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
        value={currentValue}
        onChange={handleChange}
        isOptionEqualToValue={(option, selected) => {
          if (!option && !selected) return true;
          if (!option || !selected) return false;

          // So sánh bằng value thay vì toàn bộ object
          return option.value === selected.value;
        }}
        disabled={disabled}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.label}
              {...getTagProps({ index })}
              size={size === "small" ? "small" : "medium"}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={currentValue?.length > 0 ? "" : placeholder}
            size={size}
            className={className}
            error={showError}
            variant={variant}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  {leftIcon && (
                    <InputAdornment
                      className={disabled ? "opacity-30" : ""}
                      position="start"
                    >
                      {leftIcon}
                    </InputAdornment>
                  )}
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        {...props}
      />
      {showError && (
        <FormHelperText>{errors[name]?.value || errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default AutocompleteField;
