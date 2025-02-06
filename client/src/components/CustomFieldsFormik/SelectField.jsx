import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const SelectField = ({
  label,
  name,
  value,
  options = [],
  onChange,
  labelTop,
  error = false,
  helperText = "",
  classNameLabel,
  classNameContainer = "",
  fullWidth = true,
  placeholder,
  variant = "outlined",
  required,
  ...props
}) => {
  return (
    <FormControl
    className={`flex flex-col gap-1 ${classNameContainer}`}
      fullWidth={fullWidth}
      variant={variant}
      error={error}
    >
      {label && <InputLabel>{label}</InputLabel>}
      {labelTop && (
        <label className={`flex items-center ${classNameLabel}`} htmlFor="">
          {labelTop}
          {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <Select
        MenuProps={{
          disableScrollLock: true, // Ngăn chặn khoá cuộn khi menu mở
        }}
        displayEmpty
        input={<OutlinedInput />}
        placeholder=""
        renderValue={(selected) => {
          if (!selected) {
            return <em className="text-gray-400">{placeholder}</em>;
          }
        }}
        inputProps={{ 'aria-label': 'Without label' }}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
