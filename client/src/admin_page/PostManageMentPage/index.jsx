import React, { useEffect, useMemo, useState } from "react";
import { Button, CommonIcon } from "../../ui";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import useToggleDialog from "../../hooks/useToggleDialog";
import DialogMUI from "../../components/Dialogs";
import useFilters from "../../hooks/useFilters";
import { useGetAllPosts } from "../../hooks/modules/post/useGetAllPosts";
import { useNotifications } from "../../utils/notifications";
import moment from "moment";
import { ConfirmDelete } from "../../components";
import ChipMui from "../../ui/Chip";
import TooltipMui from "../../ui/TooltipMui";
import PostDetail from "./components/PostDetail";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import TableMui from "../../ui/TableMui";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import SelectProvinceField from "../../components/SelectField/SelectProvinceField";
import { search } from "../../assets/images";
import { postService } from "../../services/PostServices";

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

  const { filters, handleChangePage, setFilters } = useFilters({
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
        await postService.updatePost({
          id: idDelete,
          active: "deny",
        });
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
          color={
            value?.status === "pending"
              ? "warning"
              : value?.status === "reject"
              ? "error"
              : value?.status === "deny"
              ? "default"
              : "success"
          }
          label={
            value?.status === "pending"
              ? "Đang chờ duyệt"
              : value?.status === "reject"
              ? "Từ chối"
              : value?.status === "deny"
              ? "Đã bị ẩn"
              : "Đã duyệt"
          }
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
                disabled={value?.status === "approve"}
                onClick={() => {
                  handleSetId(value?._id);
                }}
                className={`${value?.status === "approve" ? "opacity-45" : ""}`}
              >
                <CommonIcon.EditAttributes className="text-primary" />
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
      <Box className="p-3 bg-white rounded-md">
        <Formik
          initialValues={{ search: filters.search || "" }}
          enableReinitialize={true}
          onSubmit={(values) => {
            setFilters({
              ...filters,
              searchName: values.name,
              location: values?.province?.label,
            });
          }}
        >
          {({}) => (
            <Form className="grid grid-cols-12 gap-2">
              <FormikField
                classNameContainer="col-span-5"
                sx={{
                  fieldset: {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "14px",
                    fontStyle: "italic",
                  },
                }}
                name="name"
                placeholder="Tìm kiếm theo vị trí, lĩnh vực, tên công ty..."
                component={InputField}
              />
              <SelectProvinceField
                classNameContainer="col-span-5"
                sx={{
                  fieldset: {
                    borderRadius: "10px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "14px",
                    fontStyle: "italic",
                  },
                }}
              />
              <Button
                type={"submit"}
                className={
                  "!bg-primary !col-span-2  !text-white !normal-case !rounded-[10px]"
                }
              >
                <img src={search} className="size-6" alt="" />
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
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
            <ConfirmDelete onDelete={handleDelete} onClose={toggleDelete} />
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
