import React from "react";
import { useGetUser } from "../../../../hooks/modules/user/userGetUser";
import useConvertData from "../../../../hooks/useConvertData";
import { Button, CommonIcon } from "../../../../ui";
import { Box, Typography } from "@mui/material";
import { updateUser } from "../../../../services/UserServices";
import { useNotifications } from "../../../../utils/notifications";

const Unlock = ({ id }) => {
  const { data, isLoading } = useGetUser(id, { enabled: !!id });
  const { showSuccess, showError } = useNotifications();
  const { dataConvert } = useConvertData(data);
  const handleBanUser = async () => {
    try {
      await updateUser({ id: id, active: true });
      showSuccess("Đã mở khóa tài khoản thành công!");
    } catch (error) {
      showError(error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-5 px-5 py-2 bg-white">
      <CommonIcon.GppGood className="!text-[60px] text-accent-green" />
      <div className=" flex flex-col gap-1 items-center">
        <Typography fontWeight={600} fontSize={"20px"}>
          Bạn có chắc chắn muốn mở khóa tài khoản{" "}
          <span className="text-accent-green">{dataConvert?.profile?.name}</span>{" "}
          không?
        </Typography>
        <Typography className="text-neutrals-80" fontSize={"14px"}>
          Người dùng này sẽ có thể đăng nhập lại và sử dụng các tính năng của website lại bình thường.
        </Typography>
      </div>
      <Box className="flex flex-col items-center gap-1">
        <Button
          onClick={handleBanUser}
          className={"!bg-accent-green !text-white !normal-case !px-10"}
          startIcon={<CommonIcon.LockOpen />}
          size="large"
        >
          Mở khóa tài khoản
        </Button>
      </Box>
    </div>
  );
};

export default Unlock;
