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

const Account = () => {
  const user = useSelector((state) => state.user);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
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
      backgroundColor: "var(--accent-green)",
      ...theme.applyStyles("dark", {
        backgroundColor: "#308fe8",
      }),
    },
  }));
  const initialValues = {
    name: user?.username,
    phone_number: user?.phone_number,
    email: user?.email
  }
  return (
    <Box className="grid grid-cols-6 gap-5">
      <Box className="col-span-2 border shadow-inner rounded-md">
        <Box className=" flex items-start gap-3 p-5 border-b">
          <CommonAvatar />
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
            onSubmit={() => {}}
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
          <BorderLinearProgress variant="determinate" value={33.33} />
          <Box className="flex flex-col gap-6 mt-8">
            <Box className="flex justify-between">
              <Box className="flex items-center gap-4">
                <Box className="size-6 rounded-full border flex items-center justify-center" />
                <Typography fontSize={"15px"} fontWeight={500}>
                  Xác thực Email
                </Typography>
              </Box>
              <Box className="text-accent-green aspect-square size-8 flex items-center justify-center bg-neutrals-0 !rounded-full">
                <CommonIcon.EastRounded fontSize="small" />
              </Box>
            </Box>
            <Box className="flex justify-between">
              <Box className="flex items-center gap-4">
                <Box className="size-6 rounded-full border flex items-center justify-center" />
                <Typography fontSize={"15px"} fontWeight={500}>
                  Xác thực số điện thoại
                </Typography>
              </Box>
              <Box className="text-accent-green aspect-square size-8 flex items-center justify-center bg-neutrals-0 !rounded-full">
                <CommonIcon.EastRounded fontSize="small" />
              </Box>
            </Box>
            <Box className="flex justify-between">
              <Box className="flex items-center gap-4">
                <Box className="size-6 rounded-full border flex items-center justify-center bg-accent-green text-white">
                  <CommonIcon.CheckRounded fontSize="small" />
                </Box>
                <Typography fontSize={"15px"} fontWeight={500}>
                  Cập nhật thông tin công ty
                </Typography>
              </Box>
              <Box className="text-accent-green aspect-square size-8 flex items-center justify-center bg-neutrals-0 !rounded-full">
                <CommonIcon.EastRounded fontSize="small" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Account;
