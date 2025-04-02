import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../firebaseConfig";
import { Button, CommonAvatar } from "../../../../ui";
import { Box } from "@mui/material";
import { useNotifications } from "../../../../utils/notifications";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../services/UserServices";

const UploadAvatar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false); // State to track loading status
  const [downloadURL, setDownloadURL] = useState(null);
  const { showInfo, showError, showSuccess } = useNotifications();
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
          dispatch(updateUser({ profile: { avatar_url: url } }));
          setLoading(false);
        });
      }
    );
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  const updateLogo = async (avatar) => {
    try {
      await updateUser({
        id: user?.user_id,
        "profile.avatar_url": avatar,
      });
      showSuccess("Cập nhật ảnh đại diện thành công!");
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
          src={downloadURL ? downloadURL : user?.avatar_url}
          sx={{
            width: "100px",
            height: "100px",
          }}
          className={"shadow-lg"}
        />
        <Button
          onClick={triggerFileUpload}
          className="text-nowrap !bg-primary !text-white !px-4 !normal-case"
          disabled={loading} // Disable button while loading
        >
          {loading
            ? "Đang tải..."
            : user?.avatar_url
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

export default UploadAvatar;
