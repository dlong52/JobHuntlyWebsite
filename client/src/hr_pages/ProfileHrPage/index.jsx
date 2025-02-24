import { Box, Breadcrumbs, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { CommonIcon } from "../../ui";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { styled } from "@mui/material/styles";
import CompanyProfile from "./components/CompanyProfile";
import Account from "./components/Account";
import ChangePassword from "./components/ChangePassword";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { useQueryParams } from "../../hooks";
export const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "var(--primary)",
  },
});

export const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
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
  })
);
const ProfileHrPage = () => {
  const query = useQueryParams();
  const navigate = useNavigate();
  const type = parseInt(query.type) || 0;
  const handleChange = (event, newValue) => {
    navigate(`${RouteBase.HRProfile}?type=${newValue}`);
  };
  const breadcrumbs = [
    <Link
      key={1}
      to={RouteBase.HROverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography key={2} fontWeight={500} className="text-neutrals-100 !text-sm">
      Thông tin cá nhân
    </Typography>,
  ];

  return (
    <Box className="flex flex-col gap-y-5">
      <BreadcrumbMui breadcrumbs={breadcrumbs} title={"Thông tin cá nhân"} />
      <Box className="p-5 bg-white rounded-md transition-all duration-500">
        <AntTabs value={type} onChange={handleChange} aria-label="ant example">
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
          {type === 0 && <Account />}
          {type === 1 && <CompanyProfile />}
          {type === 2 && <ChangePassword />}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHrPage;
