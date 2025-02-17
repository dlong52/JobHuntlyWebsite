import React, { useEffect, useMemo, useState } from "react";
import { Button, CommonIcon } from "../../ui";
import { Box, Breadcrumbs, IconButton, Typography } from "@mui/material";
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
  const { showSuccess, showError } = useNotifications();
  const { isLoading, mutateAsync: deletePost } = useDeletePost();
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
    posted_by: user?.user_id,
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
    { field: "experience", headerName: "Kinh nghiệm" },
    { field: "status", headerName: "Trạng thái" },
    {
      field: "salary",
      headerName: "Lương",
      renderCell: (value) =>
        `${helpers.numberFormat(value.min)} - ${helpers.numberFormat(
          value.max
        )}`,
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
            <IconButton
              onClick={() => {
                navigate(`${RouteBase.HRJobs}/${value}`);
              }}
            >
              <CommonIcon.RemoveRedEyeTwoTone className="text-primary" />
            </IconButton>
            <IconButton
              onClick={() => {
                handleSetId(value);
              }}
            >
              <CommonIcon.DriveFileRenameOutline className="text-primary-dark" />
            </IconButton>
            <IconButton
              onClick={() => {
                toggleDelete(), setIdDelete(value);
              }}
            >
              <CommonIcon.DeleteSweep className="text-red-700" />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  const toolbarActions = [
    {
      label: <CommonIcon.Add />,
      className: "!bg-primary !shadow-none",
      onClick: toggle,
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
      to={RouteBase.AdminOverview}
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
      <Box className="bg-white rounded-md">
        <CustomTable
          columns={columns}
          labelRowsPerPage={"Số việc làm trên trang"}
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
          loading={loadingPost}
          toolbarTitle="Danh sách tin tuyển dụng"
          toolbarActions={toolbarActions}
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
