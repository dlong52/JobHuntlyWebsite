import { Container, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
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
  const { is_verified } = useSelector((state) => state.user);
  const { showError, showSuccess } = useNotifications();
  const query = useQueryParams();
  const token = query?.token;

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(is_verified);

  const verifyAccount = useCallback(async () => {
    if (!token || verified) return;

    setLoading(true);
    try {
      await SendEmailServices.verifyAccount(token);
      showSuccess("Xác thực thành công");
      dispatch(updateUser({ is_verified: true }));
      setVerified(true);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }, [token, verified, dispatch, showSuccess, showError]);

  useEffect(() => {
    verifyAccount();
  }, [verifyAccount]);

  const handleNavigation = () => {
    if (verified) {
      navigate(RouteBase.Home);
    } else {
      verifyAccount();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-5 pt-10">
        <Container className="p-4 bg-white rounded-md overflow-hidden shadow flex flex-col items-center gap-2">
          <Skeleton variant="circular" width={90} height={90} />
          <Skeleton variant="text" width={550} />
          <Skeleton variant="text" width={650} />
          <Skeleton variant="rounded" width={80} height={40} />
        </Container>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pt-10">
      <Container className="p-4 bg-white rounded-md overflow-hidden shadow flex flex-col items-center gap-2">
        <CommonIcon.Verified
          className={`!text-[100px] ${verified ? "!text-accent-green" : "!text-accent-red"}`}
        />
        <Typography fontSize={30} fontWeight={600}>
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
          onClick={handleNavigation}
          className="!normal-case !text-primary !bg-slate-100"
        >
          {verified ? "Trang chủ" : "Xác thực ngay"}
        </Button>
      </Container>
    </div>
  );
};

export default React.memo(VerifyResultPage);