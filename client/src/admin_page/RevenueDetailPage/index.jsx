import React, { useMemo } from "react";
import { useGetAllPayments } from "../../hooks/modules/payment/useGetAllPayments";
import { useConvertData, useFilters } from "../../hooks";
import { Box, IconButton, Typography } from "@mui/material";
import { Button, CommonIcon } from "../../ui";
import TooltipMui from "../../ui/TooltipMui";
import { excel, search } from "../../assets/images";
import helpers from "../../utils/helpers";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import TableMui from "../../ui/TableMui";
import moment from "moment";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import DateRangePicker from "../../components/CustomFieldsFormik/DatePickerRageField";
import SelectPackageField from "../../components/SelectField/SelectPackageField";

const RevenueDetailPage = () => {
  const { filters, handleChangePage, setFilters } = useFilters({
    page: 1,
    limit: 10,
    order: "desc",
  });
  const { data, isLoading } = useGetAllPayments(filters);
  const { dataConvert } = useConvertData(data);
  const navigate = useNavigate();

  const columns = [
    {
      field: "user_id",
      headerName: "Khách hàng",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <Box>
            <Typography className="text-neutrals-100">
              {value?.user_id?.profile?.name}
            </Typography>
            <Typography fontSize={"14px"} className="text-neutrals-60">
              {value?.user_id?.company?.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "amount",
      headerName: "Số tiền phải trả",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <Typography>
            {Number(value?.amount).toLocaleString("vi-vn")}đ
          </Typography>
        );
      },
    },
    {
      field: "subscription_id",
      headerName: "Gói dịch vụ",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <Typography>{value?.subscription_id?.package_id?.name}</Typography>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Ngày thanh toán",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <Typography>
            {moment(value?.created_at).format("HH:mm DD/MM/YYYY")}
          </Typography>
        );
      },
    },
    {
      field: "_id",
      headerName: "Xem chi tiết",
      classNameHeader: "!text-neutrals-60 !text-sm !py-3 !font-normal",
      renderCell: (value) => {
        return (
          <TooltipMui content="Tải xuống hóa đơn">
            <IconButton
              onClick={() =>
                navigate(
                  `${RouteBase.AdminRevenueManagement}/details/${value?._id}`
                )
              }
            >
              <CommonIcon.Info className="!text-primary" />
            </IconButton>
          </TooltipMui>
        );
      },
    },
  ];

  const excelData = useMemo(() => {
    if (dataConvert) {
      return dataConvert?.map((item) => {
        return {
          ID: item?._id,
          "Tên khách hàng": item?.user_id?.profile?.name,
          Email: item?.user_id?.email,
          "Công ty": item?.user_id?.company?.name,
          "Dịch vụ đã mua": item?.subscription_id?.package_id?.name,
          "Số tiền đã trả": Number(item?.amount).toLocaleString("vi-vn"),
          "Phương thức thanh toán": item?.payment_method,
          "Ngày thanh toán": moment(item?.created_at).format(
            "HH:mm DD/MM/YYYY"
          ),
          "Mã giao dịch": item?.transaction_id,
        };
      });
    }
  }, [dataConvert]);

  const toolbarAction = [
    {
      label: (
        <TooltipMui content={"Xuất file Excel"}>
          <Box>
            <img src={excel} alt="" className="size-8" />
          </Box>
        </TooltipMui>
      ),
      className: "!bg-transparent !shadow-none !normal-case !p-0",
      onClick: () => {
        helpers.exportToExcel(excelData, "Invoice.xlsx");
      },
    },
  ];

  const breadcrumbs = [
    <Link
      to={RouteBase.AdminOverview}
      className="hover:underline text-sm font-[500]"
      key={1}
    >
      Trang chủ
    </Link>,
    <Link
      to={RouteBase.AdminRevenueManagement}
      className="hover:underline text-sm font-[500]"
      key={2}
    >
      Doanh thu
    </Link>,
    <Typography key={2} fontWeight={500} className="text-neutrals-100 !text-sm">
      Thống kê chi tiết
    </Typography>,
  ];

  return (
    <div>
      <BreadcrumbMui title={"Thống kê doanh thu"} breadcrumbs={breadcrumbs} />
      <Box className="flex items-center justify-between mt-5 p-5 bg-white rounded-md">
        <Formik
          initialValues={{
            searchName: filters.name || "",
            date: {
              from: filters.from_date || null,
              to: filters.to_date || null,
            },
            package_id: filters.packageId ? { value: filters.packageId } : null,
          }}
          enableReinitialize={true}
          onSubmit={(values) => {
            setFilters({
              ...filters,
              page: 1,
              searchName: values.searchName,
              from_date: values.date.from,
              to_date: values.date.to,
              package_id: values?.package_id?.value || "",
            });
          }}
        >
          {({ values }) => {
            console.log(values.date);
            return (
              <Form>
                <Box className="grid grid-cols-12 gap-3">
                  {/* Search field - larger on desktop, full width on mobile */}
                  <Box className="col-span-12 md:col-span-5 lg:col-span-4">
                    <FormikField
                      name="name"
                      fullWidth
                      sx={{
                        fieldset: { borderRadius: "10px" },
                        "& .MuiInputBase-input::placeholder": {
                          fontSize: "14px",
                          fontStyle: "italic",
                        },
                      }}
                      placeholder="Tìm kiếm theo tên khách hàng, email, mã giao dịch"
                      component={InputField}
                    />
                  </Box>

                  {/* Date range picker - adjusts width based on screen size */}
                  <Box className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4">
                    <FormikField
                      name="date"
                      fullWidth
                      sx={{
                        fieldset: { borderRadius: "10px" },
                        "& .MuiInputBase-input::placeholder": {
                          fontSize: "14px",
                          fontStyle: "italic",
                        },
                      }}
                      component={DateRangePicker}
                    />
                  </Box>

                  {/* Package selector - adjusts width based on screen size */}
                  <Box className="col-span-12 sm:col-span-6 md:col-span-3 lg:col-span-3">
                    <SelectPackageField
                      fullWidth
                      sx={{
                        fieldset: { borderRadius: "10px" },
                        "& .MuiInputBase-input::placeholder": {
                          fontSize: "14px",
                          fontStyle: "italic",
                        },
                      }}
                    />
                  </Box>

                  {/* Search button - at the end of the row on larger screens, centered on mobile */}
                  <Box className="col-span-12 md:col-span-12 lg:col-span-1 flex justify-center md:justify-end items-center">
                    <Button
                      type="submit"
                      className="!bg-primary !h-full !text-white !normal-case !rounded-[10px] !px-6 !py-2 min-w-16"
                      aria-label="Tìm kiếm"
                    >
                      <img src={search} className="size-6" alt="Tìm kiếm" />
                    </Button>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
      <Box className="mt-5 bg-white rounded-md">
        <TableMui
          classNameTitle="!text-base !font-medium"
          columns={columns}
          rows={dataConvert || []}
          loading={isLoading}
          handleChangePage={handleChangePage}
          toolbarActions={toolbarAction}
          toolbarTitle="Hoá đơn"
          filters={filters}
        />
      </Box>
    </div>
  );
};

export default RevenueDetailPage;
