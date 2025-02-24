import React from 'react'
import { Link } from 'react-router-dom';
import { RouteBase } from '../../constants/routeUrl';
import { Box, Typography } from '@mui/material';
import BreadcrumbMui from '../../ui/BreadcrumbMui';

const CvManagementHrPage = () => {
  const breadcrumbs = [
    <Link
      key={1}
      to={RouteBase.HROverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography key={2} fontWeight={500} className="text-neutrals-100 !text-sm">
      Quản lí CV
    </Typography>,
  ];
  return (
    <Box className="flex flex-col gap-y-5">
      <BreadcrumbMui breadcrumbs={breadcrumbs} title={"Quản lí CV"} />
    </Box>
  );
}

export default CvManagementHrPage