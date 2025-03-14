import React, { useEffect, useMemo, useState } from "react";
import { CommonIcon } from "../../ui";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import useToggleDialog from "../../hooks/useToggleDialog";
import DialogMUI from "../../components/Dialogs";
import useFilters from "../../hooks/useFilters";
import { useGetAllPosts } from "../../hooks/modules/post/useGetAllPosts";
import { useDeletePost } from "../../hooks/modules/post/useDeletePost";
import { useNotifications } from "../../utils/notifications";
import { useSelector } from "react-redux";
import moment from "moment";
import { ConfirmDelete } from "../../components";
import ChipMui from "../../ui/Chip";
import TooltipMui from "../../ui/TooltipMui";
import PostDetail from "./components/PostDetail";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import TableMui from "../../ui/TableMui";

const PostManageMentPage = () => {
  const [idJob, setIdJob] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const { open, toggle, shouldRender } = useToggleDialog();
  const {
    open: openDelete,
    shouldRender: shouldRenderDelete,
    toggle: toggleDelete,
  } = useToggleDialog();
  const { showSuccess, showError } = useNotifications();
  const { isLoading, mutateAsync: deletePost } = useDeletePost();

  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
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
    {
      field: "title",
      headerName: "Tiêu đề",
      renderCell: (value) => {
        return value?.title;
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      renderCell: (value) => (
        <ChipMui
          variant={"outlined"}
          color={value?.status ? "success" : "warning"}
          label={value?.status ? "Đã duyệt" : "Đang chờ"}
        />
      ),
    },
    {
      field: "company",
      headerName: "Công ty",
      renderCell: (value) => (
        <Link
          className="hover:underline"
          target="_blank"
          to={`${RouteBase.Company}/${value?.company?._id}`}
        >
          {value?.company?.name}
        </Link>
      ),
    },
    {
      field: "location",
      headerName: "Địa chỉ",
      renderCell: (value) =>
        `${value?.location.district.name}, ${value?.location.province.name}`,
    },
    {
      field: "end_date",
      headerName: "Ngày hết hạn",
      renderCell: (value) => moment(value?.end_date).format("DD/MM/YYYY"),
    },
    {
      field: "_id",
      headerName: "",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2 items-center">
            <TooltipMui content={"Duyệt bài đăng"}>
              <IconButton
                disabled={value?.status}
                onClick={() => {
                  handleSetId(value?._id);
                }}
                className={`${value?.status ? "opacity-45" : ""}`}
              >
                <CommonIcon.EditAttributes className="text-primary" />
              </IconButton>
            </TooltipMui>
            <TooltipMui content={"Xóa bài đăng"}>
              <IconButton
                onClick={() => {
                  toggleDelete(), setIdDelete(value?._id);
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
  const toolbarActions = [];
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
  const rows = useMemo(() => {
    if (data) {
      return data?.data?.data;
    }
    return undefined;
  }, [data]);
  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography fontWeight={500} className="text-neutrals-100 !text-sm">
      Tuyển dụng
    </Typography>,
  ];
  return (
    <Box className="flex flex-col gap-y-5">
      <BreadcrumbMui title={"Tuyển dụng"} breadcrumbs={breadcrumbs} />
      <Box className="bg-white rounded-md">
        <TableMui
          columns={columns}
          rows={rows}
          total={data?.data?.pagination.totalPages}
          page={filters.page}
          rowsPerPage={filters.limit || 20}
          onPageChange={handleChangePage}
          loading={loadingPost}
          toolbarTitle="Danh sách tin tuyển dụng"
          toolbarActions={toolbarActions}
          filters={filters}
        />
      </Box>
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
      {shouldRender && (
        <DialogMUI
          className="w-fit"
          title={"Duyệt bài đăng"}
          open={open}
          isPadding={false}
          toggle={toggle}
          body={<PostDetail id={idJob} />}
        />
      )}
    </Box>
  );
};

export default PostManageMentPage;
