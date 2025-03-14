import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../../../firebaseConfig";
import { Button, CommonAvatar, CommonIcon } from "../../../../../../ui";
import { useNotifications } from "../../../../../../utils/notifications";
import { Box, FormControl, FormHelperText } from "@mui/material";
import { twMerge } from "tailwind-merge";

const UploadAvatar = ({
  field,
  form,
  labelTop,
  classNameContainer = "",
  classNameLabel = "",
  className = "",
  required = false,
}) => {
  const { name } = field;
  const { touched, errors, setFieldValue } = form;
  const showErrorIp = Boolean(touched[name] && errors[name]);

  const [loading, setLoading] = useState(false);
  const { showInfo, showError } = useNotifications();
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      showInfo("Chưa chọn ảnh");
      return;
    }

    setLoading(true);

    const fileRef = ref(storage, `Logo/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        showError(error.message);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFieldValue(name, url);
          setLoading(false);
        });
      }
    );
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormControl
      className={`flex w-full flex-col gap-1 ${classNameContainer}`}
      fullWidth
      error={showError}
    >
      {labelTop && (
        <label className={`flex items-center ${classNameLabel}`} htmlFor="">
          {labelTop}
          {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <Box className={twMerge("flex items-center gap-2 w-full", className)}>
        {field.value ? (
          <img src={field.value} className="w-[80px] object-cover" alt="" />
        ) : (
          <Box className="flex items-center justify-center w-[80px] h-[100px] bg-primary text-white">
            <CommonIcon.Person />
          </Box>
        )}

        <Button
          onClick={triggerFileUpload}
          className="text-nowrap !capitalize !bg-primary !text-white"
          disabled={loading}
        >
          {loading
            ? "Đang tải..."
            : field.value
            ? "Đổi ảnh đại diện"
            : "Chọn ảnh"}
        </Button>
      </Box>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleUpload}
      />
      {showErrorIp && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default UploadAvatar;
