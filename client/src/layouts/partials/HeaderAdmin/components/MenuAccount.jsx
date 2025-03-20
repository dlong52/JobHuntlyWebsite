import {
  Box,
  Divider,
  MenuItem,
  menuItemClasses,
  MenuList,
} from "@mui/material";
import React from "react";
import { CommonAvatar, CommonIcon } from "../../../../ui";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import { useAuthentication } from "../../../../providers/AuthenticationProvider";

const MenuAccount = ({ user, onClose }) => {
  const { logout } = useAuthentication();
  const navigate = useNavigate();
  return (
    <Box className="p-4 flex flex-col gap-4 min-w-[300px]">
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
          gap: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${menuItemClasses.root}`]: {
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 0.75,
            bgcolor: "#54555513",
            lineHeight: "100%",
            "&:hover": { color: "#4640DE" },
            [`&.${menuItemClasses.selected}`]: {
              color: "#4640DE",
              bgcolor: "action.selected",
              fontWeight: "fontWeightSemiBold",
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate(RouteBase.AdminProfile);
            onClose();
          }}
        >
          <CommonIcon.EditOutlined className="text-primary" />
          <span className="text-[14px] font-medium">Cài đặt tài khoản</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClose();
          }}
        >
          <CommonIcon.KeyOutlined className="text-primary" />
          <span className="text-[14px] font-medium">
            Đổi mật khẩu
          </span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout(user?.user_id);
            onClose()
          }}
        >
          <CommonIcon.LogoutOutlined className="text-primary" />
          <span className="text-[14px] font-medium text-accent-red">
            Đăng xuất
          </span>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default MenuAccount;
