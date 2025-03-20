import React from "react";
import ChipMui from "../../../../ui/Chip";
import { STATUS_APPLICANT } from "../../../../constants/enum";

const Status = ({ status }) => {
  return (
    <ChipMui
      label={
        status === STATUS_APPLICANT.UNDER_REVIEW
          ? "Đang xem xét"
          : status === STATUS_APPLICANT.SUITABLE
          ? "Phù hợp"
          : status === STATUS_APPLICANT.ACCEPT
          ? "Nhận việc"
          : status === STATUS_APPLICANT.REJECTED
          ? "Từ chối"
          : "Hẹn phỏng vấn"
      }
      color={
        status === STATUS_APPLICANT.UNDER_REVIEW
          ? "warning"
          : status === STATUS_APPLICANT.SUITABLE
          ? "info"
          : status === STATUS_APPLICANT.ACCEPT
          ? "success"
          : status === STATUS_APPLICANT.REJECTED
          ? "error"
          : "secondary"
      }
    />
  );
};

export default Status;
