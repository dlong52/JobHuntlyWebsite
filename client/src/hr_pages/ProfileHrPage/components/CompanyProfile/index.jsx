import { Box, Typography } from "@mui/material";
import React from "react";
import UploadField from "../../../../components/CustomFieldsFormik/UploadField";
import EditCompanyInfo from "./components/EditCompanyInfo";
import UploadCompanyCover from "./components/UploadCompanyCover";
const CompanyProfile = () => {
  return (
    <Box className="rounded-md grid grid-cols-12 bg-white gap-5 text-neutrals-100">
      <Box className="col-span-3 border rounded-lg">
        <Box className="p-4 border-b">
          <Typography fontWeight={500}>Ảnh đại diện doanh nghiệp</Typography>
        </Box>
        <UploadField />
      </Box>
      <Box className="col-span-9 h-[260px] rounded-lg overflow-hidden shadow">
        <UploadCompanyCover />
      </Box>
      <Box className="col-span-12 border rounded-lg">
        <Box className="p-4 border-b">
          <Typography fontWeight={500}>Thông tin doanh nghiệp</Typography>
        </Box>
        <EditCompanyInfo />
      </Box>
    </Box>
  );
};

export default CompanyProfile;
