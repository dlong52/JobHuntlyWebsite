import React, { useState, useRef, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../../../firebaseConfig";
import { Button, CommonAvatar, CommonIcon } from "../../../../../../ui";
import { Box, CircularProgress } from "@mui/material";
import { useNotifications } from "../../../../../../utils/notifications";
import { useDispatch, useSelector } from "react-redux";
import { updateUser as updateUserAvatar } from "../../../../../../services/UserServices";
import { updateUser } from "../../../../../../redux/userSlice";

const ChangeAvatar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const { showInfo, showError, showSuccess } = useNotifications();
    const fileInputRef = useRef(null);

    const updateLogo = useCallback(async (avatar) => {
        try {
            await updateUserAvatar({
                id: user?.user_id,
                "profile.avatar_url": avatar,
            });
            // showSuccess("Cập nhật ảnh đại diện thành công!");
        } catch (error) {
            showError(error.message || "Không thể cập nhật ảnh đại diện");
        }
    }, [user?.user_id, showSuccess, showError]);

    const handleUpload = useCallback(async (file) => {
        if (!file) {
            showInfo("Chưa chọn ảnh");
            return;
        }

        // Validate file type and size
        if (!file.type.match('image.*')) {
            showError("Vui lòng chọn tệp hình ảnh");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            showError("Kích thước ảnh không được vượt quá 5MB");
            return;
        }

        setLoading(true);
        
        try {
            const fileRef = ref(storage, `Logo/${Date.now()}-${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Optional: Add upload progress functionality here
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    showError(error.message || "Lỗi tải lên");
                    setLoading(false);
                },
                async () => {
                    try {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        setAvatarUrl(url);
                        dispatch(updateUser({ ...user, avatar_url: url }));
                        await updateLogo(url);
                    } catch (error) {
                        showError(error.message || "Không thể lấy URL ảnh");
                    } finally {
                        setLoading(false);
                    }
                }
            );
        } catch (error) {
            showError(error.message || "Lỗi tải lên");
            setLoading(false);
        }
    }, [dispatch, showError, showInfo, showSuccess, updateLogo, user]);

    const triggerFileUpload = useCallback(() => {
        if (!loading) fileInputRef.current?.click();
    }, [loading]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;
        
        const file = e.dataTransfer.files[0];
        if (file) handleUpload(file);
    }, [loading, handleUpload]);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
        // Reset file input to allow selecting the same file again
        e.target.value = '';
    }, [handleUpload]);
console.log({avatarUrl});

    return (
        <div className="relative w-fit h-fit group">
            <CommonAvatar src={avatarUrl || user?.avatar_url} className="z-0" />
            
            {/* Upload overlay */}
            <Box
                onClick={triggerFileUpload}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="absolute inset-0 flex items-center justify-center bg-[#c4c4c44b] rounded-full z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    <CommonIcon.CloudUploadOutlined fontSize="small" />
                )}
            </Box>
            
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={loading}
            />
        </div>
    );
};

export default React.memo(ChangeAvatar);