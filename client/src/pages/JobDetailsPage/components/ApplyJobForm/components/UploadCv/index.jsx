import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../../../firebaseConfig";
import { Box, Button, Typography } from "@mui/material";
import { useNotifications } from "../../../../../../utils/notifications";
import { CommonIcon } from "../../../../../../ui";

const UploadCV = ({ field, form, disabled = false, ...props }) => {
  const [loading, setLoading] = useState(false);
  const { showInfo } = useNotifications();
  const fileInputRef = useRef(null);

  const { name, value } = field;
  const { touched, errors, setFieldValue } = form;
  const showError = Boolean(touched[name] && errors[name]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      showInfo("Chưa chọn CV");
      return;
    }

    setLoading(true);

    const fileRef = ref(storage, `CVs/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload failed:", error);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setLoading(false);
          setFieldValue(name, url);
        });
      }
    );
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box className="flex items-center justify-center h-fit w-full">
      <Box
        className={`relative w-full flex flex-col gap-2 items-center border border-dashed border-primary py-5 ${
          showError && "border-red-600 rounded-md"
        }`}
      >
        <CommonIcon.CloudUploadTwoTone className="!text-[40px] text-primary" />
        <Typography>Tải lên CV từ máy tính, chọn hoặc kéo thả</Typography>
        <Typography>
          Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 5MB
        </Typography>
        <Button
          onClick={triggerFileUpload}
          className="text-nowrap !px-10 !capitalize !bg-primary !text-white"
          disabled={loading || disabled}
        >
          {loading ? "Đang tải..." : "Chọn CV"}
        </Button>
        {value && (
          <Typography className="text-primary">
            CV đã tải lên:{" "}
            <a href={value} target="_blank" rel="noopener noreferrer">
              Xem CV
            </a>
          </Typography>
        )}
        {showError && (
          <Typography className="text-red-600">{errors[name]}</Typography>
        )}
      </Box>
      <input
        type="file"
        accept=".pdf, .docx"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleUpload}
        disabled={disabled}
      />
    </Box>
  );
};

export default UploadCV;
