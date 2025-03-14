import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import TableMui from "../../ui/TableMui";
import { useGetAllReports } from "../../hooks/modules/report/useGetAllReports";
import { useConvertData, useFilters } from "../../hooks";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { CommonAvatar, CommonIcon } from "../../ui";
import { companyLogoDefault } from "../../assets/images";
import TooltipMui from "../../ui/TooltipMui";

const ReportManagementPage = () => {
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 20,
  });
  const { data, isLoading } = useGetAllReports();
  const { dataConvert } = useConvertData(data);
  const columns = [
    {
      field: "reported_by",
      headerName: "Người báo cáo",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-2">
            <CommonAvatar src={value?.profile?.avatar_url} />
            <Box>
              <Typography fontWeight={500}>
                {value?.reported_by.profile?.name}
              </Typography>
              <Typography fontSize={"14px"} className="text-neutrals-80">
                {value?.reported_by?.email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "report_job_target_id",
      headerName: "Tin tuyển dụng",
      renderCell: (value) => {
        return (
          <Link
            className="text-primary font-medium hover:underline text-[16px]"
            to={`${RouteBase.Job}/${value?.report_job_target_id._id}`}
          >
            {value?.report_job_target_id?.title}
          </Link>
        );
      },
    },
    {
      field: "report_job_target_id",
      headerName: "Công ty",
      renderCell: (value) => {
        console.log(value?.report_job_target_id);

        return (
          <TooltipMui content={<Box><CommonAvatar className={"sh"} src={value?.report_job_target_id?.company.logo || companyLogoDefault} /></Box>}>
            <Link
              className="text-primary font-medium hover:underline text-[16px]"
              to={`${RouteBase.Company}/${value?.report_job_target_id?.company._id}`}
            >
              {value?.report_job_target_id?.company.name}
            </Link>
          </TooltipMui>
        );
      },
    },
    {
      field: "reason",
      headerName: "Lí do",
      renderCell: (value) => {
        return <Typography>{value?.reason}</Typography>;
      },
    },
    {
        field: "_id",
        headerName: "Hành động",
        renderCell: (value) => {
          return (
            <IconButton>
              <CommonIcon.Report className="!text-primary" />
            </IconButton>
          );
        },
      },
  ];
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Danh mục
    </Typography>,
  ];
  return (
    <div>
      <BreadcrumbMui
        title={"Báo cáo tin tuyển dụng"}
        breadcrumbs={breadcrumbs}
      />
      <Box className="mt-5">
        <TableMui
          columns={columns}
          rows={dataConvert || []}
          total={data?.data?.pagination?.totalPages}
          page={filters.page}
          rowsPerPage={filters.limit || 20}
          onPageChange={handleChangePage}
          loading={isLoading}
          // toolbarActions={toolbarActionCategory}
          toolbarTitle="Danh sách dịch vụ"
          filters={filters}
        />
      </Box>
    </div>
  );
};

export default ReportManagementPage;
