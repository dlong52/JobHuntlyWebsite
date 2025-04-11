import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import React from "react";
import { Button } from "../../ui";

const ConfirmDelete = ({
  onDelete,
  isLoading,
  onClose,
  title = "Xóa bài đăng này?",
  subtitle = "Bạn có chắc chắn muốn xóa bài đăng này không",
  alertMessage = "Tất cả dữ liệu về bài đăng sẽ bị xóa",
}) => {
  return (
    <div className="flex flex-col items-center gap-4 min-w-[450px]">
      <Typography fontSize={"20px"} fontWeight={"600"}>
        {title}
      </Typography>
      <Box className="flex flex-col items-center">
        <Typography> {subtitle} </Typography>
        <Typography>Bạn không thể hoàn tác hành động này.</Typography>
      </Box>
      <Alert severity="warning" className="w-full">
        <AlertTitle>Cảnh báo</AlertTitle>
        <Typography className="!text-sm">
          {alertMessage}
        </Typography>
      </Alert>
      <Box className="flex gap-4 w-full">
        <Button onClick={onClose} className="!flex-1 !bg-slate-600 !text-white">
          Hủy
        </Button>
        <Button
          className="!bg-red-700 !text-white !flex-1"
          isLoading={isLoading}
          onClick={onDelete}
        >
          Xác nhận
        </Button>
      </Box>
    </div>
  );
};

export default ConfirmDelete;
