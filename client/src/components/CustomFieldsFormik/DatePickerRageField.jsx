import React from "react";
import { twMerge } from "tailwind-merge";
import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

// Custom DateRangePicker component to work with FormikField
const DateRangePicker = ({ field, form, ...props }) => {
  const {
    labelTop,
    classNameLabel,
    className,
    classNameContainer,
    readOnly = false,
    disabled = false,
    required = false,
    sx,
    fromFieldName,
    toFieldName,
  } = props;

  // Using the field.name as the base name and adding fromFieldName and toFieldName
  // If fromFieldName/toFieldName are provided, use them, otherwise use default values
  const fromName = fromFieldName || `${field.name}.from`;
  const toName = toFieldName || `${field.name}.to`;

  const { errors, touched, setFieldValue, values, handleBlur } = form;

  // Get values - support both object structure and flat structure
  const fromValue = field.value && field.value.from 
    ? moment(field.value.from, "DD/MM/YYYY", true) 
    : (values[fromName] ? moment(values[fromName], "DD/MM/YYYY", true) : null);

  const toValue = field.value && field.value.to 
    ? moment(field.value.to, "DD/MM/YYYY", true) 
    : (values[toName] ? moment(values[toName], "DD/MM/YYYY", true) : null);

  // Check for errors - support both nested and flat error structures
  const getNestedError = (obj, path) => {
    const keys = path.split('.');
    return keys.reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  };

  const fromError = getNestedError(errors, fromName) || 
    (errors[field.name] && errors[field.name].from);
  
  const toError = getNestedError(errors, toName) || 
    (errors[field.name] && errors[field.name].to);

  const fromTouched = getNestedError(touched, fromName) || 
    (touched[field.name] && touched[field.name].from);
  
  const toTouched = getNestedError(touched, toName) || 
    (touched[field.name] && touched[field.name].to);

  const showFromError = Boolean(fromTouched && fromError);
  const showToError = Boolean(toTouched && toError);

  const handleFromChange = (date) => {
    const resultDate = date ? date : "";
    
    // Update both object structure and flat structure
    if (field.value && typeof field.value === 'object') {
      setFieldValue(field.name, { ...field.value, from: resultDate }, true);
    }
    setFieldValue(fromName, resultDate, true);
    
    // Optional: If "from" date is after "to" date, update "to" date
    if (date && toValue && date.isAfter(toValue)) {
      if (field.value && typeof field.value === 'object') {
        setFieldValue(field.name, { ...field.value, to: resultDate }, true);
      }
      setFieldValue(toName, resultDate, true);
    }
  };

  const handleToChange = (date) => {
    const resultDate = date ? date : "";
    
    // Update both object structure and flat structure
    if (field.value && typeof field.value === 'object') {
      setFieldValue(field.name, { ...field.value, to: resultDate }, true);
    }
    setFieldValue(toName, resultDate, true);
    
    // Optional: If "to" date is before "from" date, update "from" date
    if (date && fromValue && date.isBefore(fromValue)) {
      if (field.value && typeof field.value === 'object') {
        setFieldValue(field.name, { ...field.value, from: resultDate }, true);
      }
      setFieldValue(fromName, resultDate, true);
    }
  };

  const handleFromBlur = (e) => {
    handleBlur(e);
    field.onBlur && field.onBlur(e);
  };

  const handleToBlur = (e) => {
    // Create a synthetic event with the toName
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: toName
      }
    };
    handleBlur(syntheticEvent);
    field.onBlur && field.onBlur(e);
  };

  return (
    <div className={`flex flex-col ${classNameContainer}`}>
      {labelTop && (
        <label className={`flex items-center ${classNameLabel}`}>
          {labelTop}
          {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <div className="flex items-center gap-2">
        <FormControl
          className="flex flex-col h-auto gap-1 flex-1"
          fullWidth
          error={showFromError}
        >
          <DatePicker
            format="DD/MM/YYYY"
            name={fromName}
            sx={sx}
            value={fromValue}
            onChange={handleFromChange}
            className={twMerge("select-none", className)}
            slotProps={{
              textField: {
                disabled,
                onBlur: handleFromBlur,
                name: fromName,
                id: fromName,
                placeholder: "Ngày bắt đầu",
                fullWidth: true,
                error: showFromError,
                helperText: showFromError ? fromError : "",
                InputProps: {
                  readOnly,
                  className: twMerge(
                    readOnly && "!bg-gray-100"
                  ),
                },
              },
            }}
          />
        </FormControl>
        
        <span className="mx-1">-</span>
        
        <FormControl
          className="flex flex-col h-auto gap-1 flex-1"
          fullWidth
          error={showToError}
        >
          <DatePicker
            format="DD/MM/YYYY"
            name={toName}
            sx={sx}
            value={toValue}
            onChange={handleToChange}
            className={twMerge("select-none", className)}
            slotProps={{
              textField: {
                disabled,
                onBlur: handleToBlur,
                name: toName,
                id: toName,
                placeholder: "Ngày kết thúc",
                fullWidth: true,
                error: showToError,
                helperText: showToError ? toError : "",
                InputProps: {
                  readOnly,
                  className: twMerge(
                    readOnly && "!bg-gray-100"
                  ),
                },
              },
            }}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default DateRangePicker;