import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormControl, FormHelperText } from "@mui/material";
import { twMerge } from "tailwind-merge";

const CkEditerField = ({
  field,
  form,
  label,
  className,
  disabled,
  classNameContainer,
  readOnly = false,
  classNameLabel,
  required = false,
  optionsToRemove = [],
  ...props
}) => {
  const { name, value } = field;
  const { touched, errors } = form;
  const showError = Boolean(touched[name] && errors[name]);

  const editorConfig = {
    isReadOnly: disabled || readOnly,
    removePlugins: [...optionsToRemove],
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
      "|",
      "link",
      "insertTable",
      "|",
      "undo",
      "redo",
    ],
    fontSize: {
      options: ["tiny", "small", "default", "big", "huge"], // Sử dụng các option có sẵn
    },
  };
  

  const handleChange = (event, editor) => {
    const data = editor.getData();
    form.setFieldValue(name, data);
  };

  const handleBlur = (event, editor) => {
    const data = editor.getData();
    if (required && !data.trim()) {
      form.setFieldError(name, `${name} là bắt buộc`);
    } else {
      form.setFieldError(name, undefined);
    }
  };

  return (
    <FormControl
      className={`flex flex-col gap-1 ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      <div className={`ck-editor-field ${showError ? "has-error" : ""}`}>
        {label && (
          <label
            className={`flex items-center mb-1 ${classNameLabel}`}
            htmlFor=""
          >
            {label}
            {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
          </label>
        )}
        <div
          className={twMerge(
            "overflow-hidden rounded-[4px] border border-gray-300",
            className
          )}
        >
          <CKEditor
            editor={ClassicEditor}
            data={value || ""}
            config={editorConfig}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
          />
        </div>
        {showError && (
          <FormHelperText>
            <span className="text-red-600">{errors[name]}</span>
          </FormHelperText>
        )}
      </div>
    </FormControl>
  );
};

export default CkEditerField;
