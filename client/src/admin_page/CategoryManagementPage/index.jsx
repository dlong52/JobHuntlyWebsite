import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Box, IconButton, Typography } from "@mui/material";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { useGetAllCategories } from "../../hooks/modules/category/useGetAllCategories";
import useFilters from "../../hooks/useFilters";
import useConvertData from "../../hooks/useConvertData";
import { CommonIcon } from "../../ui";
import CustomTable from "../../ui/Table";
import useGetAllLevels from "../../hooks/modules/level/useGetAllLevels";
import { AntTab, AntTabs } from "../../hr_pages/ProfileHrPage";
import { useQueryParams, useToggleDialog } from "../../hooks";
import ChipMui from "../../ui/Chip";
import DialogMUI from "../../components/Dialogs";
import CreateEditCategory from "./components/CreateEditCategory";
import CreateEditLevel from "./components/CreateEditLevel";
import TooltipMui from "../../ui/TooltipMui";

const CategoryManagementPage = () => {
  const [categoryId, setCategoryId] = React.useState(null);
  const [levelId, setLevelId] = React.useState(null);
  const query = useQueryParams();
  const navigate = useNavigate();
  const {
    open: openCategory,
    shouldRender: shouldRenderCategory,
    toggle: toggleCategory,
  } = useToggleDialog();
  const {
    open: openLevel,
    shouldRender: shouldRenderLevel,
    toggle: toggleLevel,
  } = useToggleDialog();
  const type = parseInt(query.type) || 0;
  const handleChange = (event, newValue) => {
    navigate(`${RouteBase.AdminCategory}?type=${newValue}`);
  };
  const { filters, handleChangePage } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const { filters: filtersLevel, handleChangePage: handleChangePageLevel } =
    useFilters({
      page: 1,
      limit: 10,
      sort: "desc",
    });
  const { data, isLoading } = useGetAllCategories(filters);
  const { levels } = useGetAllLevels();
  const handleSetIdCategory = (id) => {
    toggleCategory();
    setCategoryId(id);
  };
  const handleSetIdLevel = (id) => {
    toggleLevel();
    setLevelId(id);
  };
  const toolbarActionCategory = [
    {
      label: (
        <TooltipMui content={"Thêm danh mục mới"}>
          <CommonIcon.Add />
        </TooltipMui>
      ),
      className: "!bg-primary !shadow-none",
      onClick: () => {
        toggleCategory();
      },
    },
  ];
  const toolbarActionLevel = [
    {
      label: (
        <TooltipMui content={"Thêm cấp bậc mới"}>
          <CommonIcon.Add />
        </TooltipMui>
      ),
      className: "!bg-primary !shadow-none",
      onClick: () => {
        toggleLevel();
      },
    },
  ];
  const columnCategory = [
    {
      field: "name",
      headerName: "Tên danh mục",
      renderCell: (value) => {
        return <Typography>{value}</Typography>;
      },
    },
    {
      field: "sort_name",
      headerName: "Tên ngắn",
      renderCell: (value) => {
        return <Typography>{value}</Typography>;
      },
    },
    {
      field: "job_count",
      headerName: "Việc làm có sẵn",
      renderCell: (value) => {
        return <Typography>{value} việc làm</Typography>;
      },
    },
    {
      field: "active",
      headerName: "Trạng thái",
      renderCell: (value) => {
        return (
          <ChipMui
            color={value ? "primary" : "error"}
            label={value ? "Đang hoạt động" : "Không hoạt động"}
          />
        );
      },
    },
    {
      field: "_id",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2 items-center">
            <TooltipMui content={"Cập nhật danh mục"}>
              <IconButton
                onClick={() => {
                  handleSetIdCategory(value);
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
  const columns = [
    {
      field: "name",
      headerName: "Cấp bậc",
      renderCell: (value) => {
        return <Typography>{value}</Typography>;
      },
    },
    {
      field: "active",
      headerName: "Trạng thái",
      renderCell: (value) => {
        return (
          <ChipMui
            color={value ? "primary" : "error"}
            label={value ? "Đang hoạt động" : "Không hoạt động"}
          />
        );
      },
    },
    {
      field: "_id",
      renderCell: (value) => {
        return (
          <Box className="flex gap-2 items-center">
            <TooltipMui content={"Cập nhật cấp bậc"}>
              <IconButton
                onClick={() => {
                  handleSetIdLevel(value);
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
  useEffect(() => {
    if (!openCategory) {
      setCategoryId(null);
    }
  }, [openCategory]);
  useEffect(() => {
    if (!openLevel) {
      setLevelId(null);
    }
  }, [openLevel]);
  return (
    <div>
      <BreadcrumbMui title={"Danh mục"} breadcrumbs={breadcrumbs} />
      <Box className="p-5 bg-white rounded-md transition-all duration-500 mt-5">
        <AntTabs value={type} onChange={handleChange} aria-label="ant example">
          <AntTab
            label={
              <Box className="flex items-center gap-1">
                <CommonIcon.Category />
                Danh mục nghề nghiệp
              </Box>
            }
          />
          <AntTab
            label={
              <Box className="flex items-center gap-1">
                <CommonIcon.Stairs />
                Cấp bậc ứng viên
              </Box>
            }
          />
        </AntTabs>
        <Box className="mt-5">
          {type === 0 && (
            <CustomTable
              columns={columnCategory}
              rows={data?.data || []}
              total={data?.pagination.totalPages}
              page={filters.page}
              rowsPerPage={filters.limit || 20}
              onPageChange={handleChangePage}
              loading={isLoading}
              toolbarActions={toolbarActionCategory}
              toolbarTitle="Danh sách dịch vụ"
              filters={filters}
            />
          )}
          {type === 1 && (
            <CustomTable
              columns={columns}
              rows={levels?.data || []}
              loading={isLoading}
              toolbarActions={toolbarActionLevel}
              toolbarTitle="Danh sách các cấp bậc"
              filters={filtersLevel}
            />
          )}
        </Box>
      </Box>
      {shouldRenderCategory && (
        <DialogMUI
          open={openCategory}
          toggle={toggleCategory}
          title={categoryId ? "Cập nhật danh mục" : "Tạo danh mục mới"}
          body={<CreateEditCategory id={categoryId} />}
        />
      )}
      {shouldRenderLevel && (
        <DialogMUI
          open={openLevel}
          toggle={toggleLevel}
          title={levelId ? "Cập nhật cấp bậc" : "Tạo danh mục mới"}
          body={<CreateEditLevel id={levelId} />}
        />
      )}
    </div>
  );
};

export default CategoryManagementPage;
