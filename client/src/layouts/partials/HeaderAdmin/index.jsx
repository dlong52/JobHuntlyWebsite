import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { CommonAvatar, CommonIcon, CommonPopover } from "../../../ui";
import MenuAccount from "./components/MenuAccount";
import { useSelector } from "react-redux";

const HeaderAdmin = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box className="h-header-hr w-content-hr fixed top-0 right-0 z-50 flex items-center bg-white">
      <Container className="h-5 flex items-center justify-between">
        <Typography
          className="text-primary"
          sx={{ fontWeight: 600 }}
          variant="h5"
        >
          Xin chào, {user?.username || "Admin"}👋
        </Typography>
        <Box className="flex items-center gap-3">
          <CommonPopover
            body={<MenuAccount user={user} />}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            zIndex={1300}
          >
            <Box className="flex items-center gap-2 border p-[5px] rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-500 cursor-pointer">
              <CommonAvatar
                src={user?.avatar_url || undefined}
                sx={{ width: "30px", height: "30px" }}
              />
              <CommonIcon.ArrowDropDownRounded sx={{ fontSize: "30px" }} />
            </Box>
          </CommonPopover>
        </Box>
      </Container>
    </Box>
  );
};

export default HeaderAdmin;
