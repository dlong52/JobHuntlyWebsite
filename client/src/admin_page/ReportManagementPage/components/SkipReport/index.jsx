import React from "react";
import { Button, CommonIcon } from "../../../../ui";
import { Box, Typography } from "@mui/material";
import { useNotifications } from "../../../../utils/notifications";
import { ReportService } from "../../../../services/ReportServices";

const SkipReport = ({ reportId }) => {
  const { showSuccess, showError } = useNotifications();
  const handleHideJob = async () => {
    try {
      await ReportService.updateReport({ id: reportId, status: "rejected" });
      showSuccess("Đã từ chối report này!");
    } catch (error) {
      showError(error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-5 px-5 py-2 bg-white">
      <CommonIcon.GppBad className="!text-[60px] text-accent-yellow" />
      <div className=" flex flex-col gap-1 items-center">
        <Typography fontWeight={600} fontSize={"20px"}>
          Bạn có chắc chắn muốn bỏ qua report này không?
        </Typography>
        <Typography className="text-neutrals-80" fontSize={"14px"}>
          Báo cáo này không được coi là không chính xác.
        </Typography>
      </div>
      <Box className="flex flex-col items-center gap-1">
        <Button
          onClick={handleHideJob}
          className={"!bg-accent-yellow !text-white !normal-case !px-10"}
          startIcon={<CommonIcon.ReportOffRounded />}
          size="large"
        >
          Từ chối
        </Button>
      </Box>
    </div>
  );
};

export default SkipReport;
