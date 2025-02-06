import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { CommonAvatar, CommonIcon } from "../../ui";
import { Box, Button } from "@mui/material";
import { useNotifications } from "../../utils/notifications";
import { CompanyService } from "../../services/CompanyServices";
import { useSelector } from "react-redux";

const UploadField = () => {
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

    const fileRef = ref(storage, `Logo/${file.name}`);
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
  const updateLogo = async (logo) => {
    try {
      await CompanyService.updateCompany({
        id: user?.company_id,
        logo: logo,
      });
    } catch (error) {
      showError(error);
    }
  };
  return (
    <Box
      style={{ padding: "20px" }}
      className="flex items-center justify-center h-fit"
    >
      <Box className="relative rounded-full size-fit flex flex-col gap-5 items-center">
        <CommonAvatar
          src={
            downloadURL
              ? downloadURL
              : user?.company_logo_url
              ? user?.company_logo_url
              : undefined
          }
          sx={{
            width: "100px",
            height: "100px",
          }}
          className={"shadow-lg"}
        />
        <Button
          onClick={triggerFileUpload}
          className="text-nowrap !capitalize !bg-primary !text-white"
          disabled={loading} // Disable button while loading
        >
          {loading
            ? "Đang tải..."
            : user?.company_logo_url
            ? "Đổi ảnh đại diện"
            : "Chọn ảnh"}
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

export default UploadField;
