import { Box, Divider, MenuItem, menuItemClasses, MenuList } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const NotifyPopover = () => {
    return (
      <Box className="p-4 flex flex-col gap-4 max-w-[350px]">
        <Box className="flex justify-between">
          <span className="font-bold text-[16px]">Thông báo</span>
          <span className="text-primary">Đánh dấu là đã đọc</span>
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
          <MenuItem>
            <Link to={""} className="flex flex-col text-wrap gap-2 leading-6 group hover:text-primary text-[15px]">
              <span className="font-semibold">Nhà tuyển dụng vừa xem CV ứng tuyển của bạn</span>
              <span className="text-neutrals-100 group-hover:text-primary">Công ty CP UD&GPDN Netbase, Công ty Cổ Phần Giải Pháp và Ứng Dụng Doanh Nghiệp Netbase, Vừa xem CV của bạn</span>
            </Link>
            <span className="text-sm text-gray-600">10/10/2024</span>
          </MenuItem>
        </MenuList>
      </Box>
    );
  };

export default NotifyPopover
