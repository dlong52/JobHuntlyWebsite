import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { CommonAvatar, CommonIcon, CommonPopover } from "../../../ui";
import MenuAccount from "./components/MenuAccount";
import { Link } from "react-router-dom";
import { RouteBase } from "../../../constants/routeUrl";

const HeaderHr = () => {
  return (
    <Box className="h-header-hr w-content-hr fixed top-0 right-0 z-50 flex items-center bg-white">
      <Container className="h-5 flex items-center justify-between">
        <Typography
          className="text-primary"
          sx={{ fontWeight: 600 }}
          variant="h5"
        >
          Hello, Đức Long👋
        </Typography>
        <Box className="flex items-center gap-3">
          <Link to={RouteBase.HRChat} className="size-9 flex items-center justify-center rounded-md bg-primary-light text-primary">
            <CommonIcon.QuestionAnswer />
          </Link>
          <Box className="size-9 flex items-center justify-center rounded-md bg-primary-light text-primary">
            <CommonIcon.ShoppingCartTwoTone />
          </Box>
          <Box className="size-9 flex items-center justify-center rounded-md bg-primary-light text-primary">
            <CommonIcon.NotificationsTwoTone />
          </Box>
          <CommonPopover
            body={<MenuAccount />}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            zIndex={1300}
            onClick={() => console.log("Popover clicked!")}
          >
            <Box className="flex items-center gap-2 border p-[5px] rounded-full bg-primary text-white">
              <CommonAvatar sx={{ width: "30px", height: "30px" }} />
              <CommonIcon.ArrowDropDownRounded sx={{ fontSize: "30px" }} />
            </Box>
          </CommonPopover>
        </Box>
      </Container>
    </Box>
  );
};

export default HeaderHr;
