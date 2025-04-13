import {
  Box,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { Link } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { Button, CommonIcon } from "../../ui";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { Form, Formik } from "formik";
import CVChart from "../OverViewPage/Chart";
import { useSelector } from "react-redux";
import { useGetOverviewHr } from "../../hooks/modules/overview/useGetOverviewHr";
import { useConvertData, useFilters } from "../../hooks";
import BarChartSkeleton from "../../ui/BarChartSkeleton";
import { chart } from "../../assets/images";
import BarChartEmpty from "../../components/BarChartEmpty";
import ProgressChartItem from "./components/ProgressChartItem";
import { useGetApplicationReport } from "../../hooks/modules/application/useGetApplicationReport";
import { useGetJobByPackage } from "../../hooks/modules/overview/useGetJobByPackage";

const RecruitmentReportPage = () => {
  const user = useSelector((state) => state.user);
  const { filters, setFilters } = useFilters({
    days: 30,
  });
  const { data, isLoading } = useGetOverviewHr(user?.company_id, {
    enabled: !!user?.company_id,
  });
  // const { data: jobData, isLoading: isLoadingData } = useGetJobByPackage(user?.company_id, {
  //   enabled: !!user?.company_id,
  // });
  // const { jobByPackage } = useConvertData(jobData);
  // console.log(jobByPackage);
  
  const { dataConvert } = useConvertData(data);

  const { data: reportData, isLoading: isLoadingReport } =
    useGetApplicationReport(user?.company_id, filters);
  const { dataConvert: report } = useConvertData(reportData);

  const handleSubmit = (values) => {
    setFilters({
      ...filters,
      days: values?.days,
    });
  };

  const breadcrumbs = [
    <Link
      key={1}
      to={RouteBase.HROverview}
      className="hover:underline text-sm font-[500]"
    >
      Trang chủ
    </Link>,
    <Typography key={2} fontWeight={500} className="text-neutrals-100 !text-sm">
      Báo cáo tuyển dụng
    </Typography>,
  ];
  return (
    <Box className="flex flex-col gap-y-5">
      <BreadcrumbMui
        breadcrumbs={breadcrumbs}
        title={"Báo cáo hoạt động tuyển dụng"}
      />
      <div className="flex gap-5">
        <Box className="bg-primary rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Hồ sơ tiếp nhận
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              {report?.total || 0}
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.PaidTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-blue rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Ứng viên
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              {report?.total || 0}
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.AccountCircleTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-red rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Từ chối
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              {report?.rejected || 0}
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.LocalMallTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
        <Box className="bg-accent-green rounded-md p-4 flex-1 flex justify-between items-center">
          <div className="text-white">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Hẹn phỏng vấn
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "900" }}>
              {report?.interview || 0}
            </Typography>
            <Typography variant="caption">Tăng 20%</Typography>
          </div>
          <CommonIcon.LocalMallTwoTone className="!text-[#ffffff82] !size-20" />
        </Box>
      </div>
      <div className="bg-white p-5 rounded-md flex flex-col gap-10">
        <Formik
          initialValues={{ days: 30 }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => {
            return (
              <Form className="flex items-center gap-3 w-fit">
                <Typography fontWeight={500} className="text-nowrap">
                  Thời gian:{" "}
                </Typography>
                <FormikField
                  classNameContainer="col-span-12"
                  type="number"
                  sx={{
                    fieldset: {
                      borderRadius: "999px",
                    },
                  }}
                  name="days"
                  size="small"
                  component={InputField}
                  placeholder="Dữ liệu theo ngày"
                />
                <Button
                  type={"submit"}
                  className={
                    "!px-5 !rounded-full !bg-primary !text-white !normal-case"
                  }
                >
                  Lưu
                </Button>
              </Form>
            );
          }}
        </Formik>
        <div className="grid grid-cols-12 gap-10">
          <div className=" col-span-5 gap-3 flex flex-col">
            <Typography fontWeight={600} fontSize={"25px"}>
              Tổng quan dữ liệu tuyển dụng
            </Typography>
            <Typography fontSize={"14px"}>
              Tại đây bạn có thể xem được thông tin tổng quan tuyển dụng của
              công ty trong những ngày qua.
            </Typography>
            <img src={chart} alt="" className="h-[250px]" />
          </div>
          <div className="col-span-7">
            {isLoading ? (
              <BarChartSkeleton />
            ) : (
              <>
                {!!dataConvert?.applications_per_day?.length ? (
                  <CVChart data={dataConvert?.applications_per_day} />
                ) : (
                  <BarChartEmpty />
                )}
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-12 border-t py-5">
          <div className="col-span-6">
            <Typography fontWeight={500} fontSize={"20px"}>
              Trạng thái hồ sơ
            </Typography>
            <div className="w-full flex flex-col gap-3 mt-5">
              <ProgressChartItem
                text={"Tổng số hồ sơ"}
                color={"var(--primary)"}
                value={100}
                quantity={report?.total}
              />
              <ProgressChartItem
                text={"Hồ sơ nhận việc"}
                color={"#00c853"}
                value={(report?.accept/report?.total) * 100}
                quantity={report?.accept}
              />
              <ProgressChartItem
                text={"Hẹn phỏng vấn"}
                color={"#26A4FF"}
                value={(report?.interview/report?.total) * 100}
                quantity={report?.interview}
              />
              <ProgressChartItem
                text={"Từ chối"}
                color={"#d84315"}
                value={(report?.rejected/report?.total) * 100}
                quantity={report?.rejected}
              />
            </div>
          </div>
          <div className="col-span-6">
            <Typography fontWeight={500} fontSize={"20px"}>
              Hiệu quả tuyển dụng qua dịch vụ
            </Typography>
            <div className="w-full flex flex-col gap-3 mt-5">
              <ProgressChartItem
                text={"HUNTLY MAX PLUS"}
                color={"var(--primary)"}
                value={50}
                quantity={3}
              />
              <ProgressChartItem
                text={"HUNTLY MAX"}
                color={"#00c853"}
                value={(1/6)*100}
                quantity={1}
              />
              <ProgressChartItem
                text={"HUNTLY PRO"}
                color={"#26A4FF"}
                value={(2/6)*100}
                quantity={2}
              />
              <ProgressChartItem
                text={"HUNTLY ECO"}
                color={"#d84315"}
                value={(1/6)*100}
                quantity={1}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default RecruitmentReportPage;
