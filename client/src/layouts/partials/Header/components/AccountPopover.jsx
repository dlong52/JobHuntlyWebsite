import {
  Box,
  Divider,
  MenuItem,
  menuItemClasses,
  MenuList,
  Typography,
} from "@mui/material";
import React from "react";
import { CommonAvatar, CommonIcon } from "../../../../ui";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import { useAuthentication } from "../../../../providers/AuthenticationProvider";

const AccountPopover = ({ user, onClose }) => {
  const { logout } = useAuthentication();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <CommonIcon.EditOutlined className="text-primary" />,
      text: "Cài đặt thông tin cá nhân",
      route: RouteBase.Profile,
    },
    {
      icon: <CommonIcon.VisibilityOutlined className="text-primary" />,
      text: "Nhà tuyển dụng xem hồ sơ",
      route: RouteBase.ViewedResume,
    },
    {
      icon: <CommonIcon.FavoriteBorder className="text-primary" />,
      text: "Danh sách tin đã lưu",
      route: RouteBase.WishList,
    },
    {
      icon: <CommonIcon.AssignmentIndOutlined className="text-primary" />,
      text: "Danh sách CV",
      route: RouteBase.MyCv,
    },
    {
      icon: <CommonIcon.LockOutlined className="text-primary" />,
      text: "Đổi mật khẩu",
      route: RouteBase.ChangePassword,
    },
  ];

  return (
    <Box className="p-4 flex flex-col gap-4 min-w-[350px]">
      <Box className="flex gap-4">
        <CommonAvatar />
        <Box className="flex flex-col">
          <span className="text-primary font-semibold">{user?.username}</span>
          <span className="text-gray-500 text-sm">{user?.email}</span>
        </Box>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          [`& .${menuItemClasses.root}`]: {
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 0.75,
            bgcolor: "#54555513",
            "&:hover": { color: "var(--primary)" },
            [`&.${menuItemClasses.selected}`]: {
              color: "#4640DE",
              bgcolor: "action.selected",
              fontWeight: "fontWeightSemiBold",
            },
          },
        }}
      >
        {menuItems.map(({ icon, text, route }, index) => (
          <MenuItem
            className="flex items-center"
            key={index}
            onClick={() => {
              navigate(route)
              onClose()
            }}
          >
            {icon}
            <Typography fontSize={"14px"}>{text}</Typography>
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            onClose()
            logout(user?.user_id);
          }}
        >
          <CommonIcon.LogoutOutlined className="text-primary" />
          <Typography fontSize={"14px"} className="text-red-600">
            Đăng xuất
          </Typography>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default AccountPopover;
