import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../firebaseConfig";
import { Button, CommonAvatar, CommonIcon } from "../../../../ui";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNotifications } from "../../../../utils/notifications";
import { useDispatch, useSelector } from "react-redux";
import { updateUser as updateUserAvatar } from "../../../../services/UserServices";
import TooltipMui from "../../../../ui/TooltipMui";
import { updateUser } from "../../../../redux/userSlice";

const UploadAvatar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const { showInfo, showError, showSuccess } = useNotifications();
  const fileInputRef = useRef(null);

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
          setDownloadURL(url);
          dispatch(updateUser({ ...user, avatar_url: url }));
          updateLogo(url);
          setLoading(false);
        });
      }
    );
  };

  const triggerFileUpload = () => {
    if (!loading) fileInputRef.current?.click();
  };

  const updateLogo = async (avatar) => {
    try {
      await updateUserAvatar({
        id: user?.user_id,
        "profile.avatar_url": avatar,
      });
      showSuccess("Cập nhật ảnh đại diện thành công!");
    } catch (error) {
      showError(error.message);
    }
  };

  // Xử lý kéo & thả ảnh
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (loading) return;
    const file = e.dataTransfer.files[0];
    handleUpload(file);
  };

  return (
    <Box className="col-span-12 bg-white shadow-md rounded-md p-8 flex gap-10">
      <Box className="flex gap-4 items-center">
        <Box className="size-[80px] relative">
          <CommonAvatar
            src={user?.avatar_url}
            className="!size-[80px] shadow"
          />
        </Box>
        <Box className="flex flex-col">
          <span className="font-medium">Chào bạn trở lại,</span>
          <span
            className="font-semibold text-xl text-nowrap"
            style={{ lineBreak: "anywhere" }}
          >
            {user?.username}{" "}
            {user?.is_verified && (
              <TooltipMui content={"Đã xác thực"}>
                <CommonIcon.Verified className="text-green-700" />
              </TooltipMui>
            )}
          </span>
        </Box>
      </Box>

      {/* Khu vực kéo & thả ảnh */}
      <Box
        onClick={triggerFileUpload}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`min-w-[200px] h-full border border-dashed flex flex-col gap-1 items-center justify-center p-5 rounded-lg 
          ${
            loading
              ? "border-gray-400 text-gray-400 cursor-not-allowed"
              : "border-primary text-primary cursor-pointer"
          }`}
        disabled={loading}
      >
        <CommonIcon.ImageOutlined />
        <Typography className="text-nowrap !text-sm">
          {loading
            ? "Đang tải ảnh lên..."
            : "Bấm hoặc thả để thay đổi ảnh đại diện"}
        </Typography>
      </Box>

      {/* <Box>
        <Typography>Tài khoản chưa xác thực</Typography>
        <Button
          className={"!normal-case !bg-accent-green !text-white"}
          endIcon={<CommonIcon.ShortcutRounded />}
        >
          Xác thực ngay
        </Button>
      </Box> */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) => handleUpload(e.target.files[0])}
        disabled={loading}
      />
    </Box>
  );
};

export default UploadAvatar;
