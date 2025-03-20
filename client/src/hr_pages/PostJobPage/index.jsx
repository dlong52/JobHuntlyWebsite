import React, { useEffect, useState } from "react";
import { CommonIcon } from "../../ui";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import useToggleDialog from "../../hooks/useToggleDialog";
import DialogMUI from "../../components/Dialogs";
import CreateEditPost from "./components/CreateEditPost";
import CustomTable from "../../ui/Table";
import useFilters from "../../hooks/useFilters";
import { useGetAllPosts } from "../../hooks/modules/post/useGetAllPosts";
import { useDeletePost } from "../../hooks/modules/post/useDeletePost";
import { useNotifications } from "../../utils/notifications";
import ConfirmDelete from "./components/ConfirmDelete";
import { useSelector } from "react-redux";
import moment from "moment";
import helpers from "../../utils/helpers";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import ChipMui from "../../ui/Chip";
import TooltipMui from "../../ui/TooltipMui";
import NotVerify from "./components/NotVerify";

const PostJobPage = () => {
  const user = useSelector((state) => state.user);
  const [idJob, setIdJob] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const { open, toggle, shouldRender } = useToggleDialog();
  const {
    open: openDelete,
    shouldRender: shouldRenderDelete,
    toggle: toggleDelete,
  } = useToggleDialog();
  const navigate = useNavigate();
  const { showSuccess, showError, showInfo } = useNotifications();
  const { isLoading, mutateAsync: deletePost } = useDeletePost();
  const { filters, handleChangePage, setFilters } = useFilters({
    page: 1,
    limit: 10,
    order: "desc",
    posted_by: user?.user_id,
    sortBy: "status"
  });
  const { data, refetch, isLoading: loadingPost } = useGetAllPosts(filters);
  const handleSetId = (id) => {
    setIdJob(id);
    toggle();
  };
  const handleDelete = async () => {
    try {
      if (idDelete) {
        await deletePost(idDelete);
        showSuccess("Đã xóa bài đăng thành công!");
        toggleDelete();
        refetch();
        return;
      }
      showError("Đã sảy ra lỗi vui lòng thử lại!");
    } catch (error) {
      showError("Error deleting post: " + error);
    }
  };

  const columns = [
    { field: "title", headerName: "Tiêu đề" },
    {
      field: "experience",
      headerName: "Kinh nghiệm",
      renderCell: (value) => helpers.convertTime(value),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      renderCell: (value) => (
        <ChipMui
          label={value ? "Đang hiển thị" : "Chưa duyệt"}
          variant={"outlined"}
          color={value ? "success" : "warning"}
        />
      ),
    },
    {
      field: "salary",
      headerName: "Lương",
      renderCell: (value) => helpers.convertSalary(value?.min, value?.max),
    },
    {
      field: "location",
      headerName: "Địa chỉ",
      renderCell: (value) => `${value.district.name}, ${value.province.name}`,
    },
    {
      field: "end_date",
      headerName: "Ngày hết hạn",
      renderCell: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      field: "_id",
      headerName: "",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2 items-center">
            <TooltipMui content={"Xem ứng viên"}>
              <IconButton
                onClick={() => {
                  navigate(`${RouteBase.HRJobs}/${value}`);
                }}
              >
                <CommonIcon.RemoveRedEyeTwoTone className="text-primary" />
              </IconButton>
            </TooltipMui>
            <TooltipMui content={"Cập nhật tin tuyển dụng"}>
              <IconButton
                onClick={() => {
                  handleSetId(value);
                }}
              >
                <CommonIcon.DriveFileRenameOutline className="text-primary-dark" />
              </IconButton>
            </TooltipMui>
            <TooltipMui content={"Xóa tin tuyển dụng"}>
              <IconButton
                onClick={() => {
                  toggleDelete(), setIdDelete(value);
                }}
              >
                <CommonIcon.DeleteSweep className="text-red-700" />
              </IconButton>
            </TooltipMui>
          </Box>
        );
      },
    },
  ];
  const toolbarActions = [
    {
      label: (
        <TooltipMui content={"Đăng tin tuyển dụng mới"}>
          <CommonIcon.PostAdd />
        </TooltipMui>
      ),
      className: "!bg-primary !shadow-none",
      onClick: () => {
        if (!user.is_verified) {
          showInfo(
            "Bạn cần hoàn thành các bước xác thực để bắt đầu đăng bài.",
            "Vui lòng xác thực",
            {
              vertical: "top",
              horizontal: "center",
            }
          );
          return;
        }
        toggle();
      },
    },
  ];
  useEffect(() => {
    if (!open) {
      setIdJob(null);
    }
  }, [open]);
  useEffect(() => {
    if (!openDelete) {
      setIdDelete(null);
    }
  }, [openDelete]);
  const breadcrumbs = [
    <Link
      key={1}
      to={RouteBase.HROverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography key={2} fontWeight={500} className="text-neutrals-100 !text-sm">
      Tuyển dụng
    </Typography>,
  ];
  return (
    <Box className="flex flex-col gap-y-5">
      <BreadcrumbMui breadcrumbs={breadcrumbs} title={"Tuyển dụng"} />
      <NotVerify user={user} />
      <Box className="bg-white rounded-md">
        <CustomTable
          columns={columns}
          rows={data?.data?.data || []}
          total={data?.data?.pagination.totalPages}
          page={filters.page}
          rowsPerPage={filters.limit || 20}
          onPageChange={handleChangePage}
          loading={loadingPost}
          toolbarTitle="Tin tuyển dụng"
          toolbarActions={toolbarActions}
        />
      </Box>
      {shouldRender && (
        <DialogMUI
          isPadding={false}
          title={idJob ? "Cập nhật bài đăng" : "Đăng tin tuyển dụng"}
          disableScrollLock={true}
          className="w-fit"
          open={open}
          toggle={toggle}
          body={<CreateEditPost id={idJob} toggle={toggle} refetch={refetch} />}
        />
      )}
      {shouldRenderDelete && (
        <DialogMUI
          className="w-fit"
          open={openDelete}
          toggle={toggleDelete}
          body={
            <ConfirmDelete
              onDelete={handleDelete}
              onClose={toggleDelete}
              isLoading={isLoading}
            />
          }
        />
      )}
    </Box>
  );
};

export default PostJobPage;
