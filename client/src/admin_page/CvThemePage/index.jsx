import React, { useEffect, useState } from "react";
import { useGetAllCvThemes } from "../../hooks/modules/cv_theme/useGetAllCvThemes";
import { useConvertData, useToggleDialog } from "../../hooks";
import CustomTable from "../../ui/Table";
import TooltipMui from "../../ui/TooltipMui";
import { CommonIcon } from "../../ui";
import { Box, IconButton, Typography } from "@mui/material";
import ChipMui from "../../ui/Chip";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import DialogMUI from "../../components/Dialogs";
import CreateEditTheme from "./components/CreateEditTheme";
import TableMui from "../../ui/TableMui";

const CvThemePage = () => {
  const [id, setId] = useState(null);
  const { data, isLoading } = useGetAllCvThemes();
  const { open, shouldRender, toggle } = useToggleDialog();
  const { dataConvert } = useConvertData(data);
  const columns = [
    {
      field: "name",
      headerName: "Hình ảnh",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-5">
            <img src={value?.preview_image} alt="" className="h-[150px] shadow" />
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Tên chủ đề",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-5">
            <Typography>{value?.name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Mã chủ đề",
      renderCell: (value) => {
        return (
          <Box className="flex items-center gap-5">
            <Typography>{value?.theme_code}</Typography>
          </Box>
        );
      },
    },
    {
      field: "active",
      headerName: "Trạng thái",
      renderCell: (value) => {
        return (
          <ChipMui
            color={value.active ? "primary" : "error"}
            label={value.active ? "Đang hoạt động" : "Không hoạt động"}
          />
        );
      },
    },
    {
      field: "_id",
      headerName: "Cập nhật",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2 items-center">
            <TooltipMui content={"Cập nhật chủ đề"}>
              <IconButton
                onClick={() => {
                  toggle(), setId(value._id);
                }}
              >
                <CommonIcon.DriveFileRenameOutline className="text-primary-dark" />
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
        <TooltipMui content={"Thêm chủ đề"}>
          <CommonIcon.Add />
        </TooltipMui>
      ),
      className: "!bg-primary !shadow-none",
      onClick: toggle,
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
      Chủ đề CV
    </Typography>,
  ];
  useEffect(() => {
    if (!open) {
      setId(null);
    }
  }, [open]);
  return (
    <>
      <BreadcrumbMui title={"Danh sách chủ đề"} breadcrumbs={breadcrumbs} />
      <Box className="mt-5">
        <TableMui
          columns={columns}
          rows={dataConvert || []}
          total={data?.data?.pagination.totalPages}
          loading={isLoading}
          toolbarActions={toolbarActions}
          toolbarTitle="Danh sách chủ đề CV"
        />
      </Box>
      {shouldRender && (
        <DialogMUI
          body={<CreateEditTheme id={id} />}
          open={open}
          toggle={toggle}
          title={id ? "Cập nhật chủ đề" : "Tạo chủ đề mới"}
        />
      )}
    </>
  );
};

export default CvThemePage;
