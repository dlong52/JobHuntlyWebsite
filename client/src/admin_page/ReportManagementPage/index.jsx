import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableMui from "../../ui/TableMui";
import { useGetAllReports } from "../../hooks/modules/report/useGetAllReports";
import { useConvertData, useFilters, useToggleDialog } from "../../hooks";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { CommonAvatar, CommonIcon } from "../../ui";
import TooltipMui from "../../ui/TooltipMui";
import ChipMui from "../../ui/Chip";
import DialogMUI from "../../components/Dialogs";
import UpdateStatus from "./components/UpdateStatus";
import HideJob from "./components/HideJob";
import SkipReport from "./components/SkipReport";

const ReportManagementPage = () => {
  const [userId, setUserId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [reportId, setReportId] = useState(null);
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 20,
  });
  const { data, isLoading } = useGetAllReports();
  const { dataConvert } = useConvertData(data);
  const {
    open: openUpdateStatus,
    toggle: toggleUpdateStatus,
    shouldRender: shouldRenderUpdateStatus,
  } = useToggleDialog();
  const {
    open: openJob,
    toggle: toggleJob,
    shouldRender: shouldRenderJob,
  } = useToggleDialog();
  const {
    open: openSkip,
    toggle: toggleSkip,
    shouldRender: shouldRenderSkip,
  } = useToggleDialog();
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
            to={`${RouteBase.Job}/${value?.report_job_target_id?._id}`}
            target="_blank"
          >
            {value?.report_job_target_id?.title}
          </Link>
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
      field: "reason",
      headerName: "Trạng thái",
      renderCell: (value) => {
        return (
          <ChipMui
            label={
              value?.status === "pending"
                ? "Chưa giải quyết"
                : value?.status === "resolved"
                ? "Đã giải quyết"
                : "Từ chối"
            }
            color={
              value?.status === "pending"
                ? "warning"
                : value?.status === "resolved"
                ? "success"
                : "error"
            }
          />
        );
      },
    },
    {
      field: "_id",
      headerName: "Hành động",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-1">
            <TooltipMui content={"Ẩn bài đăng"}>
              <IconButton
                disabled={
                  value.status === "rejected" || value.status === "resolved"
                    ? true
                    : false
                }
                onClick={() => {
                  setJobId(value?.report_job_target_id?._id);
                  setReportId(value?._id);
                  toggleJob();
                }}
              >
                <CommonIcon.VisibilityOff
                  className={`${
                    value.status === "rejected" || value.status === "resolved"
                      ? "opacity-45"
                      : ""
                  } !text-primary`}
                />
              </IconButton>
            </TooltipMui>
            <TooltipMui content={"Khóa tài khoản đăng bài này"}>
              <IconButton
                disabled={
                  value.status === "rejected" || value.status === "resolved"
                    ? true
                    : false
                }
                onClick={() => {
                  setUserId(value?.report_job_target_id?.posted_by);
                  setReportId(value?._id);
                  toggleUpdateStatus();
                }}
              >
                <CommonIcon.LockPerson
                  className={`${
                    value.status === "rejected" || value.status === "resolved"
                      ? "opacity-45"
                      : ""
                  } !text-accent-red`}
                />
              </IconButton>
            </TooltipMui>
            <TooltipMui content={"Bỏ qua báo cáo này"}>
              <IconButton
                disabled={
                  value.status === "rejected" || value.status === "resolved"
                    ? true
                    : false
                }
                onClick={() => {
                  setReportId(value?._id);
                  toggleSkip();
                }}
              >
                <CommonIcon.ThumbDownAlt
                  className={`${
                    value.status === "rejected" || value.status === "resolved"
                      ? "opacity-45"
                      : ""
                  } !text-accent-yellow`}
                />
              </IconButton>
            </TooltipMui>
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    if (!openUpdateStatus) {
      setUserId(null);
      setReportId(null);
    }
  }, [openUpdateStatus]);
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
          toolbarTitle="Danh sách các báo cáo"
          filters={filters}
        />
      </Box>
      {/* HideJob */}
      {shouldRenderUpdateStatus && (
        <DialogMUI
          toggle={toggleUpdateStatus}
          open={openUpdateStatus}
          title={"Khóa tài khoản"}
          body={<UpdateStatus id={userId} reportId={reportId} />}
        />
      )}
      {shouldRenderJob && (
        <DialogMUI
          toggle={toggleJob}
          open={openJob}
          title={"Ẩn tin tuyển dụng"}
          body={<HideJob id={jobId} reportId={reportId} />}
        />
      )}
      {shouldRenderSkip && (
        <DialogMUI
          toggle={toggleSkip}
          open={openSkip}
          title={"Bỏ qua báo cáo"}
          body={<SkipReport reportId={reportId} />}
        />
      )}
    </div>
  );
};

export default ReportManagementPage;
