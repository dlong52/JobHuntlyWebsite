import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormControl, FormHelperText } from "@mui/material";

const CkEditerField = ({
  field, // Field từ Formik
  form, // Form từ Formik
  label,
  disabled,
  classNameContainer,
  readOnly = false,
  classNameLabel,
  required = false,
  optionsToRemove = [], // Các tùy chọn sẽ bị loại bỏ
  ...props
}) => {
  const { name, value } = field;
  const { touched, errors } = form;
  const showError = Boolean(touched[name] && errors[name]);

  // Cấu hình các công cụ muốn bỏ
  const editorConfig = {
    isReadOnly: disabled || readOnly,
    removePlugins: [
      "ImageUpload",
      "EasyImage",
      "MediaEmbed",
      "BlockQuote",
      "Table",
      "Heading",
      ...optionsToRemove,
    ], // Xóa các plugin theo yêu cầu
  };

  // Xử lý khi nội dung thay đổi
  const handleChange = (event, editor) => {
    const data = editor.getData();
    form.setFieldValue(name, data); // Cập nhật giá trị trong Formik
  };

  // Xử lý khi mất focus, kiểm tra dữ liệu required
  const handleBlur = (event, editor) => {
    
    const data = editor.getData();
    if (required && !data.trim()) {
      console.log("vjzsjdkn: ", data);
      form.setFieldError(name, `${name} là bắt buộc`); // Đặt lỗi nếu trống      
    } else {
      form.setFieldError(name, undefined); // Xóa lỗi nếu đã có dữ liệu
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
        <label className={`flex items-center mb-1 ${classNameLabel}`} htmlFor="">
          {label}
          {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <CKEditor
        editor={ClassicEditor}
        data={value || ""} // Giá trị hiện tại
        config={editorConfig} // Cấu hình CKEditor
        onChange={handleChange}
        onBlur={handleBlur} // Kiểm tra khi mất focus
        {...props} // Truyền các props bổ sung
      />
      {showError && <FormHelperText><span className="text-red-600">{errors[name]}</span></FormHelperText>}
    </div>
    </FormControl>
  );
};

export default CkEditerField;
