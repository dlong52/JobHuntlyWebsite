import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNotifications } from "../../../../../../utils/notifications";
import { CompanyService } from "../../../../../../services/CompanyServices";
import { storage } from "../../../../../../../firebaseConfig";
import { CommonIcon } from "../../../../../../ui";

const UploadCompanyCover = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false); // State to track loading status
  const [downloadURL, setDownloadURL] = useState("");
  const { showInfo, showError } = useNotifications();
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      showInfo("Chưa chọn ảnh");
      return;
    }

    setLoading(true); // Start loading

    const fileRef = ref(storage, `Cover/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        showError(error);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          updateLogo(url);
          setLoading(false);
        });
      }
    );
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  const updateLogo = async (cover) => {
    try {
      await CompanyService.updateCompany({
        id: user?.company_id,
        cover: cover,
      });
    } catch (error) {
      showError(error);
    }
  };
  return (
    <Box className="flex items-center justify-center h-full">
      <Box className="relative size-full flex flex-col gap-5 items-center">
        <img
          src={
            downloadURL
              ? downloadURL
              : user?.company_cover
              ? user?.company_cover
              : undefined
          }
          alt=""
          className="size-full object-cover object-center"
        />
        <Button
          onClick={triggerFileUpload}
          startIcon={<CommonIcon.PhotoCameraRounded />}
          className="text-nowrap !absolute bottom-2 right-2 !px-3 !capitalize !bg-primary !text-white"
          disabled={loading} // Disable button while loading
        >
          {loading
            ? "Đang tải..."
            : user?.company_cover
            ? "Đổi ảnh bìa"
            : "Thêm ảnh bìa"}
        </Button>
      </Box>
      {/* Hidden Input */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleUpload}
      />
    </Box>
  );
};

export default UploadCompanyCover;
