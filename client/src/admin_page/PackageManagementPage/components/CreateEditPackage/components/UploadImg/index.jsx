import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../../../firebaseConfig";
import { Button, CommonAvatar, CommonIcon } from "../../../../../../ui";
import { useNotifications } from "../../../../../../utils/notifications";
import { Box, FormControl, FormHelperText, Typography } from "@mui/material";
import { twMerge } from "tailwind-merge";

const UploadImg = ({
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
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (file) => {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormControl
      className={`flex w-full relative rounded-md overflow-hidden flex-col gap-1 ${classNameContainer}`}
      fullWidth
      error={showErrorIp}
    >
      <Box
        className={twMerge(
          "flex flex-col items-center rounded-md overflow-hidden gap-2 w-full h-fit relative bg-neutrals-80",
          isDragging ? "border-2 border-dashed border-primary" : "",
          className
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {field.value ? (
          <img
            src={field.value}
            className="w-full h-[200px] rounded-md border object-cover"
            alt=""
          />
        ) : (
          <Box className="flex items-center justify-center w-full h-[200px] rounded-md text-white bg-gradient-to-tr from-[#0e1c63ad] via-[#39026423] to-[#026762]"></Box>
        )}
        <Box className="absolute z-[1] backdrop-blur-sm rounded-md bg-[#33333341] w-full h-[200px]"></Box>
        <Box className="absolute z-[2] rounded-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col gap-1 text-white">
          <CommonIcon.BackupRounded className="!text-[40px]" />
          <Typography fontWeight={500}>
            {isDragging
              ? "Thả ảnh vào đây..."
              : "Chọn hoặc kéo thả ảnh mô tả dịch vụ vào đây."}
          </Typography>
          <Button
            onClick={triggerFileUpload}
            className="text-nowrap !normal-case !px-5 !bg-primary !text-white"
            disabled={loading}
          >
            {loading ? "Đang tải..." : field.value ? "Đổi ảnh" : "Chọn ảnh"}
          </Button>
        </Box>
      </Box>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {showErrorIp && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default UploadImg;
