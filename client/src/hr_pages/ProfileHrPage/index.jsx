import {
  Box,
  Breadcrumbs,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { CommonIcon } from "../../ui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { styled } from "@mui/material/styles";
import CompanyProfile from "./components/CompanyProfile";
import Account from "./components/Account";
import ChangePassword from "./components/ChangePassword";
const ProfileHrPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          {value === 0 && <Account />}
          {value === 1 && <CompanyProfile />}
          {value === 2 && <ChangePassword />}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHrPage;
