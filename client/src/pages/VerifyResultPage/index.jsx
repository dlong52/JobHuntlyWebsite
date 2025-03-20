import { Container, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQueryParams } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { SendEmailServices } from "../../services/SendEmailServices";
import { useNotifications } from "../../utils/notifications";
import { updateUser } from "../../redux/userSlice";
import { Button, CommonIcon } from "../../ui";
import { RouteBase } from "../../constants/routeUrl";
import { useNavigate } from "react-router-dom";

const VerifyResultPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { is_verified, user_id } = useSelector((state) => state.user);
  const { showError, showSuccess } = useNotifications();
  const query = useQueryParams();
  const token = query?.token;

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(is_verified);

  const verifyAccount = async () => {
    if (!token || verified) return;

    setLoading(true);
    try {
      const res = await SendEmailServices.verifyAccount(token);
      showSuccess("Xác thực thành công");
      dispatch(updateUser({ is_verified: true }));
      setVerified(true);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  return (
    <div className="flex flex-col gap-5 pt-10">
      {loading ? (
        <Container className="p-4 bg-white rounded-md overflow-hidden shadow flex flex-col items-center gap-2">
          <Skeleton variant="circular" width={"90px"} height={"90px"} />
          <Skeleton variant="text" width={"550px"} />
          <Skeleton variant="text" width={"650px"} />
          <Skeleton variant="rounded" width={"80px"} height={"40px"} />
        </Container>
      ) : (
        <Container className="p-4 bg-white rounded-md overflow-hidden shadow flex flex-col items-center gap-2">
          <CommonIcon.Verified
            className={`!text-green-700 !text-[100px] ${
              verified ? "!text-accent-green" : "!text-accent-red"
            }`}
          />
          <Typography fontSize={"30px"} fontWeight={600}>
            {verified
              ? "Tài khoản của bạn đã xác thực thành công!"
              : "Tài khoản của bạn chưa được xác thực!"}
          </Typography>
          <Typography>
            {verified
              ? "Các tính năng của JobHuntly đã được mở khóa. Hãy khám phá các tính năng hữu ích của JobHuntly!"
              : "Khi tài khoản của bạn được xác thực sẽ mở khóa vô vàn các tính năng hấp dẫn của JobHuntly."}
          </Typography>
          <Button
            onClick={() => navigate(RouteBase.Home)}
            className={"!normal-case !text-primary !bg-slate-100"}
          >
            {verified ? "Trang chủ" : "Xác thực ngay"}
          </Button>
        </Container>
      )}
    </div>
  );
};

export default VerifyResultPage;
