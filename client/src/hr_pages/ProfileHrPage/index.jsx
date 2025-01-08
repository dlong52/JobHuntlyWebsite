import {
  Box,
  Breadcrumbs,
  LinearProgress,
  linearProgressClasses,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { Form, Formik } from "formik";
import { CommonAvatar, CommonIcon } from "../../ui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { styled } from "@mui/material/styles";
import FormikField from "../../components/CustomFieldsFormik/FormikField";
import InputField from "../../components/CustomFieldsFormik/InputField";
import { Button } from "@/ui";
import * as Yup from "yup";
import { cpLogo } from "../../assets/images";
const ProfileHrPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên là bắt buộc"),
    phone_number: Yup.string()
      .min(6, "Số điện thoại phải ít nhất 6 ký tự")
      .required("Số điện thoại là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
  });

  const initialValues = {
    name: "Nguyễn Đức Long",
    phone_number: "0123456789",
    email: "dlong.work23@gmail.com",
  };
  const AntTabs = styled(Tabs)({
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
      backgroundColor: "var(--primary)",
    },
  });

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      minWidth: 0,
      [theme.breakpoints.up("sm")]: {
        minWidth: 0,
      },
      fontWeight: theme.typography.fontWeightMedium,
      marginRight: theme.spacing(1),
      color: "var(--neutrals-80)",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "var(--primary)",
        opacity: 1,
      },
      "&.Mui-selected": {
        color: "var(--primary)",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&.Mui-focusVisible": {
        backgroundColor: "var(--primary)",
      },
    })
  );
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
  return (
    <Box className="flex flex-col gap-y-5">
      <Box className="flex justify-between p-5 bg-white rounded-md">
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            color: "var(--neutrals-100)",
          }}
        >
          Thông tin cá nhân
        </Typography>
        <Breadcrumbs
          separator={<CommonIcon.NavigateNext />}
          aria-label="breadcrumb"
          className="flex items-center"
        >
          <Link
            underline="hover"
            key="1"
            color="inherit"
            to={RouteBase.Home}
            className="text-primary"
          >
            <CommonIcon.Home fontSize="small" />
          </Link>
          <Typography
            key="3"
            sx={{ fontWeight: 500, fontSize: "14px", color: "text.primary" }}
          >
            Thông tin cá nhân
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box className="p-5 bg-white rounded-md transition-all duration-500">
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab
            label={
              <Box className="flex items-center gap-1">
                <CommonIcon.AccountCircleTwoTone />
                Tài khoản
              </Box>
            }
          />
          <AntTab
            label={
              <Box className="flex items-center gap-1">
                <CommonIcon.BusinessTwoTone />
                Hồ sơ công ty
              </Box>
            }
          />
          <AntTab
            label={
              <Box className="flex items-center gap-1">
                <CommonIcon.KeyTwoTone />
                Đổi mật khẩu
              </Box>
            }
          />
        </AntTabs>
        <Box className="mt-5">
          {value === 0 && (
            <Box className="grid grid-cols-6 gap-5">
              <Box className="col-span-2 border shadow-inner rounded-md">
                <Box className=" flex items-start gap-3 p-5 border-b">
                  <CommonAvatar />
                  <Box className="">
                    <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                      Nguyễn Đức Long
                    </Typography>
                    <Typography
                      sx={{ fontSize: "14px", color: "var(--neutrals-60)" }}
                    >
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
                          className="!font-medium !w-fit !text-sm !bg-primary"
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
          )}
          {value === 1 && (
            <Box className="rounded-md bg-white flex flex-col gap-y-5">
              <Box className="p-5 flex items-center gap-2 border rounded-md">
                <img src={cpLogo} alt="" className="rounded-full size-12" />
                <Box className="">
                  <Typography fontWeight={500} color="var(--neutrals-100)">
                    CÔNG TY TNHH ALPHA FRANCE PHARMA
                  </Typography>
                  <Typography fontSize={"14px"} color="var(--neutrals-80)">
                    Việt Nam | 25-99 nhân viên
                  </Typography>
                </Box>
              </Box>
              <Box className="p-5 rounded-md border"></Box>
            </Box>
          )}
          {value === 2 && (
            <Formik
              // initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={() => {}}
              enableReinitialize
            >
              {() => (
                <Form className="flex flex-col gap-4 w-full text-neutrals-100">
                  <FormikField
                    classNameLabel="font-medium text-neutrals-80 my-1"
                    className="max-w-[300px]"
                    name="password"
                    component={InputField}
                    size="small"
                    required
                    labelTop="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                  />
                  <FormikField
                    classNameLabel="font-medium text-neutrals-80 my-1"
                    className="max-w-[300px]"
                    name="password"
                    component={InputField}
                    size="small"
                    required
                    labelTop="Nhập lại mật khẩu"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHrPage;
