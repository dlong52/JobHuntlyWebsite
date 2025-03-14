import { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Button, CommonIcon } from "../../ui";
import { useSelector } from "react-redux";
import DialogMUI from "../../components/Dialogs";
import { useToggleDialog } from "../../hooks";
import SendEmailForm from "./ChangeEmailForm";
import { SendEmailServices } from "../../services/SendEmailServices";
import { useNotifications } from "../../utils/notifications";

const VerifyAccountPage = () => {
  const { showSuccess, showError } = useNotifications();
  const { open, shouldRender, toggle } = useToggleDialog();
  const { email } = useSelector((state) => state.user);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const expireTime = localStorage.getItem("emailVerifyExpireTime");
    if (expireTime) {
      const remainingTime = Math.floor((expireTime - Date.now()) / 1000);
      if (remainingTime > 0) {
        setIsDisabled(true);
        setTimer(remainingTime);
        startCountdown(remainingTime);
      }
    }
  }, []);

  const startCountdown = (time) => {
    setTimer(time);
    setIsDisabled(true);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setIsDisabled(false);
          localStorage.removeItem("emailVerifyExpireTime");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendEmail = async () => {
    if (isDisabled) return;
    try {
      if (email) {
        await SendEmailServices.sendVerify({ email: email });
        showSuccess("Gửi email thành công! Vui lòng kiểm tra hòm thư của bạn");

        const expireTime = Date.now() + 60000; // Thời gian hết hạn sau 60s
        localStorage.setItem("emailVerifyExpireTime", expireTime);
        startCountdown(60);
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 pt-10">
      <Container className="p-4 bg-white rounded-md overflow-hidden shadow flex flex-col">
        <Typography
          className="text-neutrals-100"
          fontWeight={600}
          fontSize={"20px"}
        >
          Xác thực email đăng nhập
        </Typography>
        <Typography className="text-neutrals-80 !mt-3 !text-[14px]">
          Xác thực email <b className="text-primary">{email}</b> để đảm bảo
          quyền lợi tốt nhất.
        </Typography>
        <Button
          className="!bg-primary !text-white !normal-case !px-10 !py-3 w-fit !mt-2"
          startIcon={<CommonIcon.Email />}
          onClick={sendEmail}
          disabled={isDisabled}
        >
          {isDisabled ? `Gửi lại sau ${timer}s` : "Gửi email xác thực"}
        </Button>
        <Box className="pt-4 border-t mt-4">
          <Box
            onClick={toggle}
            className="flex items-center gap-2 font-semibold text-[14px] !text-primary cursor-pointer"
          >
            <CommonIcon.DriveFileRenameOutline />
            Tôi muốn thay đổi địa chỉ email khác
          </Box>
        </Box>
      </Container>
      {/* Phần khắc phục lỗi thường gặp */}
      <Container className="p-4 bg-white rounded-md overflow-hidden shadow">
        <Typography
          className="text-neutrals-100"
          fontWeight={600}
          fontSize={"20px"}
        >
          Khắc phục lỗi thường gặp
        </Typography>
        <Box className="space-y-3 my-5">
          <Box className="flex items-center gap-2 text-neutrals-100 text-sm">
            <span className="font-semibold size-[22px] flex justify-center items-center rounded-full bg-neutrals-20 text-xs">
              1
            </span>
            <Typography fontSize={"14px"}>
              Địa chỉ email không chính xác? Hãy bấm{" "}
              <span
                onClick={toggle}
                className="text-primary cursor-pointer font-semibold"
              >
                vào đây
              </span>{" "}
              để thay đổi
            </Typography>
          </Box>
          <Box className="flex items-center gap-2 text-neutrals-100 text-sm">
            <span className="font-semibold size-[22px] flex justify-center items-center rounded-full bg-neutrals-20 text-xs">
              2
            </span>
            <Typography fontSize={"14px"}>
              Không thấy email trong hộp thư đến? Hãy kiểm tra{" "}
              <span className="font-bold">Hòm thư Spam</span> hoặc bấm{" "}
              <span className="font-bold">Gửi lại</span>
            </Typography>
          </Box>
        </Box>
        <Box className="mt-4 border-t pt-5 text-sm text-neutrals-80">
          <Typography className="!font-semibold !text-[15px] text-neutrals-80">
            Mọi thắc mắc vui lòng liên hệ bộ phận CSKH của JobHuntly:
          </Typography>
          <div className="flex items-center gap-10">
            <Box className="flex items-center gap-1 mt-2">
              <CommonIcon.Phone className="!text-[17px]" />
              <Typography fontSize={"14px"}>
                Điện thoại: <b className="text-neutrals-100">(024) 6680 5588</b>
              </Typography>
            </Box>
            <Box className="flex items-center gap-1 mt-1">
              <CommonIcon.Email className="!text-[17px]" />
              <Typography fontSize={"14px"}>
                Email: <b className="text-neutrals-100">hotro@jobhuntly.vn</b>
              </Typography>
            </Box>
          </div>
        </Box>
      </Container>
      {shouldRender && (
        <DialogMUI
          body={<SendEmailForm onClose={toggle} />}
          open={open}
          title={"Thay đổi địa chỉ email"}
          toggle={toggle}
        />
      )}
    </div>
  );
};

export default VerifyAccountPage;
