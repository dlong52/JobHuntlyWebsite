import React from "react";
import { Box, Typography } from "@mui/material"
import CommonIcon from "../../ui/CommonIcon";
const OverViewAdminPage = () => {
  return (
    <div>
      <div className="flex gap-5">
        <Box className="bg-primary rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              CV Tiếp nhận
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              100
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.PaidTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-blue rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              CV Tiếp nhận
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              100
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.AccountCircleTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-red rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              CV Tiếp nhận
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              100
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.LocalMallTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
      </div>
    </div>
  );
};

export default OverViewAdminPage;
