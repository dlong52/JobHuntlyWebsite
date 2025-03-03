import {
  Box,
  Divider,
  MenuItem,
  menuItemClasses,
  MenuList,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { CommonStyles } from "../../../../ui";
import { notification_empty } from "../../../../assets/images";
import { NotificationService } from "../../../../services/NotificationServices";
import { useSelector } from "react-redux";
import { useNotifications } from "../../../../utils/notifications";

const NotifyPopover = ({ isLoading, notifications, refetch }) => {
  const user = useSelector((state) => state.user);
  const { showError } = useNotifications();
  const handleUpdateReadAll = async () => {
    try {
      await NotificationService.markAllNotifications(user?.user_id);
      refetch();
    } catch (error) {
      showError(error);
    }
  };
  return (
    <Box className="flex flex-col gap-4 w-[350px] relative">
      <Box className="flex justify-between p-4 border-b sticky top-0 right-0 left-0 z-10 !bg-white">
        <span className="font-bold text-[16px]">Thông báo</span>
        {!!notifications?.length && (
          <span
            onClick={handleUpdateReadAll}
            className="text-primary cursor-pointer hover:text-primary-dark"
          >
            Đánh dấu là đã đọc
          </span>
        )}
      </Box>
      {isLoading ? (
        <CommonStyles.LoadingNotify />
      ) : notifications?.length ? (
        <MenuList
          disablePadding
          sx={{
            gap: 1,
            display: "flex",
            paddingX: "16px",
            paddingBottom: "16px",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              p: 2,
              display: "flex",
              gap: 2,
              flexDirection: "column",
              borderRadius: 0.75,
              alignItems: "start",
              bgcolor: "#54555513",
              lineHeight: "100%",
              [`&.${menuItemClasses.selected}`]: {
                color: "#4640DE",
                bgcolor: "action.selected",
                fontWeight: "fontWeightSemiBold",
              },
            },
          }}
        >
          {notifications?.map((item) => {
            return (
              <MenuItem
                className={`${item.isRead ? "" : "!bg-primary-light"}`}
                key={item._id}
              >
                <Link
                  to={""}
                  className="flex flex-col text-wrap gap-2 leading-6 group hover:text-primary text-[15px]"
                >
                  <span className="font-semibold">{item?.title}</span>
                  <span className="text-neutrals-100 group-hover:text-primary">
                    {item?.body}
                  </span>
                </Link>
                <span className="text-sm text-gray-600">
                  {moment(item?.created_at).format("DD/MM/YYYY")}
                </span>
              </MenuItem>
            );
          })}
        </MenuList>
      ) : (
        <Box className="flex flex-col p-10 items-center justify-center">
          <img src={notification_empty} alt="" className="w-3/5" />
          <Typography fontSize={"14px"} className="text-neutrals-60">
            Bạn chưa có thông báo nào
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default NotifyPopover;
