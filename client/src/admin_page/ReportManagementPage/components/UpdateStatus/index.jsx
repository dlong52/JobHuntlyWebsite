import React from "react";
import { useGetUser } from "../../../../hooks/modules/user/userGetUser";
import useConvertData from "../../../../hooks/useConvertData";
import { Button, CommonIcon } from "../../../../ui";
import { Box, Typography } from "@mui/material";
import { updateUser } from "../../../../services/UserServices";
import { useNotifications } from "../../../../utils/notifications";
import { ReportService } from "../../../../services/ReportServices";

const UpdateStatus = ({ id, reportId }) => {
  const { data, isLoading } = useGetUser(id, { enabled: !!id });
  const { showSuccess, showError } = useNotifications();
  const { dataConvert } = useConvertData(data);
  const handleBanUser = async () => {
    try {
      await updateUser({ id: id, active: false });
      await ReportService.updateReport({ id: reportId, status: "resolved" });
      showSuccess("Đã khóa tài khoản thành công!");
    } catch (error) {
      showError(error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-5 px-5 py-2 bg-white">
      <CommonIcon.GppBad className="!text-[60px] text-accent-red" />
      <div className=" flex flex-col gap-1 items-center">
        <Typography fontWeight={600} fontSize={"20px"}>
          Bạn có chắc chắn muốn khóa tài khoản{" "}
          <span className="text-accent-red">{dataConvert?.profile?.name}</span>{" "}
          không?
        </Typography>
        <Typography className="text-neutrals-80" fontSize={"14px"}>
          Người dùng này sẽ không thể đăng nhập vào website cho đến khi được mở
          khóa.
        </Typography>
      </div>
      <Box className="flex flex-col items-center gap-1">
        <Button
          onClick={handleBanUser}
          className={"!bg-accent-red !text-white !normal-case !px-10"}
          startIcon={<CommonIcon.LockPerson />}
          size="large"
        >
          Khóa tài khoản
        </Button>
      </Box>
    </div>
  );
};

export default UpdateStatus;
