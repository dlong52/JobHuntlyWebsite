import React from "react";
import { useGetUser } from "../../../../hooks/modules/user/userGetUser";
import { Button, CommonIcon } from "../../../../ui";
import { Box, Typography } from "@mui/material";
import { updateUser } from "../../../../services/UserServices";
import { useNotifications } from "../../../../utils/notifications";
import { ReportService } from "../../../../services/ReportServices";
import { postService } from "../../../../services/PostServices";

const HideJob = ({ id, reportId }) => {
  const { showSuccess, showError } = useNotifications();
  const handleHideJob = async () => {
    try {
      await postService.updatePost({ id: id, status: "deny" });
      await ReportService.updateReport({ id: reportId, status: "resolved" });
      showSuccess("Đã ẩn tin tuyển dụng này!");
    } catch (error) {
      showError(error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-5 px-5 py-2 bg-white">
      <CommonIcon.GppBad className="!text-[60px] text-primary" />
      <div className=" flex flex-col gap-1 items-center">
        <Typography fontWeight={600} fontSize={"20px"}>
          Bạn có chắc chắn muốn ẩn bài đăng này không?
        </Typography>
        <Typography className="text-neutrals-80" fontSize={"14px"}>
          Bài đăng này sẽ được ẩn khỏi trang web cho đến khi mở lại.
        </Typography>
      </div>
      <Box className="flex flex-col items-center gap-1">
        <Button
          onClick={handleHideJob}
          className={"!bg-primary !text-white !normal-case !px-10"}
          startIcon={<CommonIcon.VisibilityOff />}
          size="large"
        >
          Ẩn tin
        </Button>
      </Box>
    </div>
  );
};

export default HideJob;
