import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RouteBase } from "../../../../constants/routeUrl";
import { Button, CommonAvatar, CommonIcon } from "../../../../ui";
import { useGetAllApplicants } from "../../../../hooks/modules/application/userGetApplicants";
import CustomTable from "../../../../ui/Table";
import useFilters from "../../../../hooks/useFilters";
import { Link } from "react-router-dom";
import moment from "moment";
import Status from "./components/Status";
import { useToggleDialog } from "../../../../hooks";
import DialogMUI from "../../../../components/Dialogs";
import ApplicantDetail from "./components/AplicantDetail";
import { NotificationService } from "../../../../services/NotificationServices";
import { useSelector } from "react-redux";
import { SendEmailServices } from "../../../../services/SendEmailServices";
import { useNotifications } from "../../../../utils/notifications";
import BreadcrumbMui from "../../../../ui/BreadcrumbMui";
import TooltipMui from "../../../../ui/TooltipMui";
import ChipMui from "../../../../ui/Chip";

const Applicants = ({ jobId }) => {
  const [applicantId, setApplicantId] = useState(null);
  const { showError } = useNotifications();
  const { shouldRender, open, toggle } = useToggleDialog();
  const {
    filters,
    handleRequestSort,
    handleSearch,
    handleSelect,
    handleSelectAll,
    handleChangePage,
    rowsSelected,
    setFilters,
  } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
    job: jobId,
  });
  const { data, isLoading } = useGetAllApplicants(filters);
  useEffect(() => {
    if (!open) {
      setApplicantId(null);
    }
  }, [open]);
  
  const columns = [
    {
      field: "candidate",
      headerName: "Ứng viên",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2">
            <CommonAvatar
              char={!value?.avatar_url ? value?.profile?.name?.charAt(0) : null}
              className={"border-2 border-accent-blue !bg-primary"}
              src={value?.avatar_url}
            />
            <Box>
              <Typography>{value?.profile?.name}</Typography>
              <Typography fontSize={"14px"} className="text-neutrals-40">
                {value?.email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "applied_date",
      headerName: "Ngày ứng tuyển",
      renderCell: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      renderCell: (value) => <Status status={value} />,
    },
    {
      field: "isViewed",
      headerName: "Trạng thái xem",
      renderCell: (value) => <ChipMui label={value? "Đã xem" : "Chưa xem"} variant={"outlined"} color={value ? "info" : "warning"} />,
    },
    {
      field: "_id",
      headerName: "Chi tiết",
      renderCell: (value) => {
        return (
          <Button
            className={"!border !border-primary !text-primary"}
            sx={{ textTransform: "none", border: "1px solid var(--primary)" }}
            onClick={() => {
              setApplicantId(value);
              toggle();
            }}
          >
            Xem hồ sơ ứng viên
          </Button>
        );
      },
    },
  ];
  const breadcrumbs = [
    <Link
      key={1}
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography key={2} fontWeight={500} className="text-neutrals-100 !text-sm">
      Ứng viên
    </Typography>,
  ];
  // Render
  return (
    <div>
      <BreadcrumbMui
        title={`Tổng số ứng viên: ${data?.data?.pagination?.total}`}
        breadcrumbs={breadcrumbs}
      />
      <Box className="bg-white rounded-md mt-5">
        <CustomTable
          columns={columns}
          rows={data?.data?.data || []}
          total={data?.data?.pagination.totalPages}
          page={filters.page}
          rowsPerPage={filters.limit || 20}
          onPageChange={handleChangePage}
          onRowsPerPageChange={(newRowsPerPage) => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              rowsPerPage: newRowsPerPage,
            }));
          }}
          loading={isLoading}
          toolbarTitle="Danh sách ứng viên"
          filters={filters}
          handleRequestSort={handleRequestSort}
          handleSearch={handleSearch}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          rowsSelected={rowsSelected}
        />
      </Box>
      {shouldRender && (
        <DialogMUI
          open={open}
          toggle={toggle}
          isPadding={false}
          title={"Đánh giá CV ứng viên"}
          body={<ApplicantDetail id={applicantId} />}
        />
      )}
    </div>
  );
};

export default Applicants;
