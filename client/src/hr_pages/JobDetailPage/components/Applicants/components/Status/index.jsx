import React from "react";
import ChipMui from "../../../../../../ui/Chip";
import {
  APPLICANT_STATUS,
  applicantStatusOptions,
} from "../../../../../../constants/enum";

const Status = ({ status }) => {
  const label = applicantStatusOptions.filter((item) => item.value === status);
  const color =
    status === APPLICANT_STATUS.UNDER_REVIEW
      ? "warning"
      : status === APPLICANT_STATUS.REJECTED
      ? "error"
      : "success";
  return <ChipMui variant={"outlined"} label={label[0].label} color={color} />;
};

export default Status;
