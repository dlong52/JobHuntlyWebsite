import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Box, IconButton, Typography } from "@mui/material";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { useGetAllApplicants } from "../../hooks/modules/application/userGetApplicants";
import { useConvertData, useFilters, useToggleDialog } from "../../hooks";
import { useSelector } from "react-redux";
import TableMui from "../../ui/TableMui";
import moment from "moment";
import { CommonAvatar, CommonIcon } from "../../ui";
import TooltipMui from "../../ui/TooltipMui";
import DialogMUI from "../../components/Dialogs";
import ApplicantDetail from "./components/ApplicantDetail";
import ChipMui from "../../ui/Chip";
import Status from "./components/Status";
import { NotificationService } from "../../services/NotificationServices";
import { SendEmailServices } from "../../services/SendEmailServices";
import { ApplicantService } from "../../services/ApplicationServices";
import { useNotifications } from "../../utils/notifications";

const CvManagementHrPage = () => {
  const [applicantId, setApplicantId] = useState(null);
  const { showError, showSuccess } = useNotifications();
  const { company_id, company_name, username } = useSelector((state) => state.user);
  const { shouldRender, open, toggle } = useToggleDialog();
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 15,
    company: company_id,
  });
  const { data, isLoading, refetch } = useGetAllApplicants(filters, {
    enabled: !!company_id,
  });
  const { dataConvert } = useConvertData(data);
  const handelUpdateViewState = async (data) => {
    try {
      if (data?.isViewed) {
        return;
      }
      const payload = {
        id: data?._id,
        isViewed: true,
      };
      await NotificationService.sendToUser({
        userId: data?.candidate?._id,
        title: "Nhà tuyển dụng vừa xem CV ứng tuyển của bạn",
        body: `${company_name}, vừa xem CV của bạn`,
      });
      await SendEmailServices.cvViewed({
        recruiterName: username,
        companyName: company_name,
        jobTitle: data?.job?.title,
        applicantName: data?.candidate?.profile?.name,
        applicantEmail: data?.candidate?.email,
      });
      await ApplicantService.updateApplicant(payload);
      refetch();
    } catch (error) {
      showError(error);
    }
  };
  const columns = [
    {
      field: "",
      headerName: "Ứng viên",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-2">
            <CommonAvatar
              char={
                !value?.candidate?.profile?.avatar_url
                  ? value?.candidate?.profile?.name?.charAt(0)
                  : null
              }
              // className={"border-2 border-accent-blue !bg-primary"}
              src={value?.candidate?.profile?.avatar_url}
            />
            <Box>
              <Typography
                className="!text-neutrals-100"
                fontSize={"16px"}
                fontWeight={400}
              >
                {value?.candidate?.profile?.name}
              </Typography>
              <Typography fontSize={"14px"} className="text-neutrals-60">
                {value?.candidate?.email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "",
      headerName: "Việc làm",
      renderCell: (value) => {
        return <Box>{value?.job?.title}</Box>;
      },
    },
    {
      field: "",
      headerName: "Ngày ứng tuyển",
      renderCell: (value) => {
        return <Box>{moment(value?.applied_date).format("DD/MM/YYYY")}</Box>;
      },
    },
    {
      field: "",
      headerName: "CV Online",
      renderCell: (value) => {
        return (
          <Box>
            <TooltipMui content={"Xem CV"}>
              <Link
                target="_blank"
                onClick={()=>{handelUpdateViewState(value)}}
                to={value?.cv_url ? value.cv_url : `/view-cv/${value?.cv}`}
              >
                <CommonIcon.AccountBoxTwoTone className="!text-primary" />
              </Link>
            </TooltipMui>
          </Box>
        );
      },
    },
    {
      field: "isViewed",
      headerName: "Trạng thái xem",
      renderCell: (value) => (
        <ChipMui
          label={value?.isViewed ? "Đã xem" : "Chưa xem"}
          variant={"outlined"}
          color={value?.isViewed ? "info" : "warning"}
        />
      ),
    },
    {
      field: "isViewed",
      headerName: "Trạng thái ứng viên",
      renderCell: (value) => <Status status={value?.status} />,
    },
    {
      field: "_id",
      headerName: "Đánh giá CV ứng viên",
      renderCell: (value) => {
        return (
          <Box>
            <TooltipMui content={"Đánh giá ứng viên"}>
              <IconButton
                onClick={() => {
                  setApplicantId(value?._id);
                  toggle();
                }}
              >
                <CommonIcon.FeedbackTwoTone className="text-accent-blue" />
              </IconButton>
            </TooltipMui>
          </Box>
        );
      },
    },
  ];
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
      <BreadcrumbMui breadcrumbs={breadcrumbs} title={"Quản lí CV ứng viên"} />
      <Box className="">
        <TableMui
          columns={columns}
          filters={filters}
          loading={isLoading}
          rows={dataConvert || []}
          total={data?.data?.pagination.totalPages}
          page={filters.page}
          rowsPerPage={filters.limit || 20}
          onPageChange={handleChangePage}
          toolbarTitle={"Danh sách CV ứng viên"}
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
    </Box>
  );
};

export default CvManagementHrPage;
