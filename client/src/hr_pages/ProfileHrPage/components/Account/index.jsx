import {
  Box,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { Button, CommonAvatar, CommonIcon } from "../../../../ui";
import { Form, Formik } from "formik";
import { validationSchema } from "./form";
import {
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import { useNotifications } from "../../../../utils/notifications";
import { updateUser as updateUserAcc } from "../../../../services/UserServices";
import ChangeAvatar from "./components/ChangeAvatar";
export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "var(--primary)",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));
const Account = () => {
  const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const { showError, showSuccess } = useNotifications();
  const initialValues = {
    name: user?.username,
    phone_number: user?.phone_number,
    email: user?.email,
  };
  const handleSubmit = async (values) => {
    try {
      await updateUserAcc({
        id: user.user_id,
        "profile.name": values.name,
        "profile.phone_number": values.phone_number,
      });

      window.location.reload();
      showSuccess("Cập nhật tài khoản thành công!");
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Box className="grid grid-cols-6 gap-5">
      <Box className="col-span-2 border shadow-inner rounded-md">
        <Box className=" flex items-start gap-3 p-5 border-b">
          <div className="">
           
            <ChangeAvatar />
          </div>
          <Box className="">
            <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
              {user?.username}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "var(--neutrals-60)" }}>
              Nhà tuyển dụng
            </Typography>
          </Box>
        </Box>
        <Box className="p-5">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form className="flex flex-col gap-4 w-full text-neutrals-100">
                <FormikField
                  classNameLabel="font-medium text-neutrals-80"
                  className="w-full"
                  name="name"
                  component={InputField}
                  size="small"
                  required
                  labelTop="Họ và tên"
                  placeholder="Nhập họ và tên"
                />
                <FormikField
                  classNameLabel="font-medium text-neutrals-80"
                  className="w-full"
                  name="phone_number"
                  component={InputField}
                  size="small"
                  labelTop="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                />
                <FormikField
                  classNameLabel="font-medium text-neutrals-80"
                  className="w-full"
                  name="email"
                  component={InputField}
                  disabled={true}
                  size="small"
                  readOnly={true}
                  labelTop="Email"
                />
                <Button
                  size="large"
                  type="submit"
                  className="!font-medium !w-fit !text-sm !bg-primary !text-white"
                >
                  Lưu
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      <Box className="col-span-4 p-5 border rounded-md">
        <Box className="p-5">
          <BorderLinearProgress
            variant="determinate"
            value={
              user?.is_verified
                ? 66.66
                : user?.is_verified_phone && user?.is_verified
                  ? 100
                  : 33.33
            }
          />
          <Box className="flex flex-col gap-6 mt-8">
            <Box className="flex justify-between">
              <Box className="flex items-center gap-4">
                <Box
                  className={`size-6 rounded-full border flex items-center text-white justify-center ${user?.is_verified ? "bg-primary" : "bg-[#4e4e62]"
                    }`}
                >
                  <CommonIcon.CheckRounded className="!text-[18px]" />
                </Box>
                <Typography fontSize={"15px"} fontWeight={500}>
                  Xác thực Email
                </Typography>
              </Box>
              <Link
                to={RouteBase.HRVerify}
                className="text-primary aspect-square size-8 flex items-center justify-center bg-primary-light !rounded-full"
              >
                <CommonIcon.EastRounded fontSize="small" />
              </Link>
            </Box>
            <Box className="flex justify-between">
              <Box className="flex items-center gap-4">
                <Box
                  className={`size-6 rounded-full border flex items-center text-white justify-center ${user?.is_verified_phone ? "bg-primary" : "bg-[#4e4e62]"
                    }`}
                >
                  <CommonIcon.CheckRounded className="!text-[18px]" />
                </Box>
                <Typography fontSize={"15px"} fontWeight={500}>
                  Xác thực số điện thoại
                </Typography>
              </Box>
              <Link
                to={RouteBase.HRVerifyPhone}
                className="text-primary aspect-square size-8 flex items-center justify-center bg-primary-light !rounded-full"
              >
                <CommonIcon.EastRounded fontSize="small" />
              </Link>
            </Box>
            <Box className="flex justify-between">
              <Box className="flex items-center gap-4">
                <Box className="size-6 rounded-full border flex items-center justify-center bg-primary text-white">
                  <CommonIcon.CheckRounded className="!text-[18px]" />
                </Box>
                <Typography fontSize={"15px"} fontWeight={500}>
                  Cập nhật thông tin công ty
                </Typography>
              </Box>
              <Link
                to={`${RouteBase.HRProfile}?type=1`}
                className="text-primary aspect-square size-8 flex items-center justify-center bg-primary-light !rounded-full"
              >
                <CommonIcon.EastRounded fontSize="small" />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
