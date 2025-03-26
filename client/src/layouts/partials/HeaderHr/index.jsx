import { Badge, Box, Container, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { CommonAvatar, CommonIcon, CommonPopover } from "../../../ui";
import MenuAccount from "./components/MenuAccount";
import { Link } from "react-router-dom";
import { RouteBase } from "../../../constants/routeUrl";
import { useSelector } from "react-redux";
import { useLoadingUser } from "../../../providers/LoadingUserProvider";
import { useConvertData, useFilters } from "../../../hooks";
import { useGetAllNotifications } from "../../../hooks/modules/notification/useGetAllNotifications";
import NotifyPopover from "./components/NotifyPopover";
import { useNotification } from "../../../providers/NotificationProvider";

const HeaderHr = () => {
  const user = useSelector((state) => state.user);
  const { isLoading: loadingUser } = useLoadingUser();
  const { notifications, isLoading, refetch, unreadCount } = useNotification();

  return (
    <Box className="h-header-hr w-content-hr fixed top-0 right-0 z-50 flex items-center bg-white">
      <Container className="h-5 flex items-center justify-between">
        <Typography
          className="text-primary"
          sx={{ fontWeight: 600 }}
          variant="h5"
        >
          Xin chào, {user?.username}👋
        </Typography>
        <Box className="flex items-center gap-3">
          <Link
            to={RouteBase.HRChat}
            target="_blank"
            className="size-9 flex items-center justify-center rounded-md bg-primary-light text-primary"
          >
            <CommonIcon.QuestionAnswer />
          </Link>

          <CommonPopover
            body={
              <NotifyPopover
                refetch={refetch}
                isLoading={isLoading}
                notifications={notifications}
              />
            }
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            zIndex={1300}
          >
            <Badge
              color="error"
              badgeContent={unreadCount}
              max={99}
            >
              <Box className="size-9 flex items-center justify-center rounded-md bg-primary-light text-primary">
                <CommonIcon.NotificationsTwoTone />
              </Box>
            </Badge>
          </CommonPopover>

          <CommonPopover
            body={<MenuAccount user={user} />}
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
