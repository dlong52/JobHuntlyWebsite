import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RouteBase } from "../../../../constants/routeUrl";
import { CommonIcon } from "../../../../ui";
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

const Applicants = ({ jobId }) => {
  console.log({ jobId });

  const [applicantId, setApplicantId] = useState(null);
  const user = useSelector((state) => state.user);
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
  const handelUpdateViewState = async (candidate) => {
    toggle();
    try {
      // await NotificationService.sendToUser({
      //   userId: candidate?._id,
      //   title: "Nhà tuyển dụng vừa xem CV ứng tuyển của bạn",
      //   body: `${user?.company_name}, vừa xem CV của bạn`,
      // });
      // await SendEmailServices.cvViewed({
      //   recruiterName: user?.company_name,
      //   applicantEmail: candidate?.email,
      // });
    } catch (error) {
      console.log({ error });
    }
  };
  const columns = [
    {
      field: "candidate",
      headerName: "Ứng viên",
      renderCell: (value) => {
        return (
          <Box>
            <Typography>{value?.profile?.name}</Typography>
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
      field: "_id",
      headerName: "Chi tiết",
      renderCell: (value) => {
        return (
          <IconButton
            onClick={() => {
              setApplicantId(value);
              handelUpdateViewState(value);
            }}
          >
            <CommonIcon.RemoveRedEyeTwoTone />
          </IconButton>
        );
      },
    },
  ];
  // Render
  return (
    <div>
      <Box className="bg-white rounded-md">
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
          title={"Đánh giá CV ứng viên"}
          body={<ApplicantDetail id={applicantId} />}
        />
      )}
    </div>
  );
};

export default Applicants;
