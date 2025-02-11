import { Button, Container, Divider, Typography } from "@mui/material";
import React from "react";
import { CommonIcon } from "../../ui";
import DialogMUI from "../../components/Dialogs";
import { useToggleDialog } from "../../hooks";
import ApplyJobForm from "./components/ApplyJobForm";
import { useGetPost } from "../../hooks/modules/post/useGetPost";
import { useNavigate, useParams } from "react-router-dom";
import HtmlContent from "../../ui/HtmlContent";
import Loading from "../../ui/Loading";
import moment from "moment";
import { RouteBase } from "../../constants/routeUrl";
import { useNotifications } from "../../utils/notifications";
import { employmentTypeOptions } from "../../constants/enum";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError } = useNotifications();
  const { data, isLoading, error } = useGetPost(id, { enabled: !!id });
  const detailData = data?.data?.data;
  if (error) {
    navigate(RouteBase.Home);
    showError("Bài đăng không tồn tại!");
  }
  const { open, toggle, shouldRender } = useToggleDialog();
  const currentDate = moment().format("DD/MM/YYYY");
  const endDate = moment(detailData?.end_date).format("DD/MM/YYYY");
  const checkDate = moment(endDate, "DD/MM/YYYY").isBefore(
    moment(currentDate, "DD/MM/YYYY")
  );
  return (
    <>
      {!isLoading ? (
        <div>
          <Container className="py-10">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-8 flex flex-col gap-y-5">
                <div className="bg-white p-5 rounded-md flex flex-col gap-5">
                  <Typography fontSize={"20px"} fontWeight={700}>
                    {detailData?.title}
                  </Typography>
                  <div className="flex justify-between py-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 flex items-center justify-center rounded-full bg-gradient-to-bl from-primary to-primary-200 aspect-square">
                        <CommonIcon.Paid className="text-white" />
                      </div>
                      <div className="">
                        <Typography>Mức lương</Typography>
                        <Typography fontWeight={500}>Tới 3 triệu</Typography>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 flex items-center justify-center rounded-full bg-gradient-to-bl from-primary to-primary-200 aspect-square">
                        <CommonIcon.LocationOnRounded className="text-white" />
                      </div>
                      <div className="">
                        <Typography>Địa điểm</Typography>
                        <Typography fontWeight={500}>
                          {detailData?.location?.province.name}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 flex items-center justify-center rounded-full bg-gradient-to-bl from-primary to-primary-200 aspect-square">
                        <CommonIcon.HourglassBottom className="text-white" />
                      </div>
                      <div className="">
                        <Typography>Kinh nghiệm</Typography>
                        <Typography fontWeight={500}>
                          {detailData?.experience}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <Typography
                    fontSize={"14px"}
                    className="flex items-center gap-2 bg-gray-200 text-gray-500 px-3 py-1 rounded-md size-fit"
                  >
                    <CommonIcon.AccessTime />
                    Hạn nộp hồ sơ:{" "}
                    {moment(detailData.end_date).format("DD/MM/YYYY")}
                  </Typography>
                  <div className="flex gap-3">
                    <Button
                      size="large"
                      className={`flex-1 ${
                        checkDate ? "!bg-gray-500" : "!bg-primary"
                      } !text-white`}
                      startIcon={<CommonIcon.SendOutlined />}
                      onClick={toggle}
                      disabled={checkDate}
                    >
                      {checkDate ? "Đã quá hạn ứng tuyển" : "Ứng tuyển ngay"}
                    </Button>
                    <Button
                      size="large"
                      variant="outlined"
                      className="!text-primary !capitalize !border-primary"
                      startIcon={<CommonIcon.FavoriteBorder />}
                    >
                      Lưu tin
                    </Button>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-md flex flex-col gap-y-5">
                  <div className="flex gap-3">
                    <Divider
                      orientation="vertical"
                      className="bg-primary w-[6px]"
                      flexItem
                    />
                    <Typography fontSize={"20px"} fontWeight={700}>
                      Chi tiết tuyển dụng
                    </Typography>
                  </div>
                  {detailData?.description && (
                    <div className="flex flex-col gap-2">
                      <Typography fontWeight={500}>Mô tả công việc</Typography>
                      <div className="pl-7">
                        <HtmlContent string={detailData?.description} />
                      </div>
                    </div>
                  )}
                  {detailData?.requirements && (
                    <div className="flex flex-col gap-5">
                      <Typography fontWeight={500}>Yêu cầu ứng viên</Typography>
                      <div className="pl-7">
                        <HtmlContent string={detailData?.requirements} />
                      </div>
                    </div>
                  )}
                  {detailData?.job_benefit && (
                    <div className="flex flex-col gap-5">
                      <Typography fontWeight={500}>Quyền lợi</Typography>
                      <div className="pl-7">
                        <HtmlContent string={detailData?.job_benefit} />
                      </div>
                    </div>
                  )}
                  {detailData?.work_time && (
                    <div className="flex flex-col gap-5">
                      <Typography fontWeight={500}>
                        Thời gian làm việc
                      </Typography>
                      <div className="pl-7">
                        <HtmlContent string={detailData?.work_time} />
                      </div>
                    </div>
                  )}
                  {detailData?.location && (
                    <div className="flex flex-col gap-5">
                      <Typography fontWeight={500}>
                        Địa điểm làm việc
                      </Typography>
                      <div className="pl-7">
                        <ul>
                          <li>{`${detailData?.location?.additional_info}, ${detailData?.location?.ward.name}, ${detailData?.location?.district.name}, ${detailData?.location?.province.name}`}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-5">
                    <Typography fontWeight={500}>
                      Cách thức ứng tuyển
                    </Typography>
                    <div className="">
                      <Typography>
                        Ứng viên nộp hồ sơ trực tuyến bằng cách bấm{" "}
                        <b>Ứng tuyển</b> ngay dưới đây.
                      </Typography>
                      <Typography className="!mt-4" fontSize={"16px"}>
                        Hạn nộp hồ sơ:{" "}
                        {moment(detailData.end_date).format("DD/MM/YYYY")}
                      </Typography>
                      <div className="flex gap-3 mt-4">
                        <Button
                          size="large"
                          className={`${
                            checkDate ? "!bg-gray-500" : "!bg-primary"
                          } !text-white`}
                          onClick={toggle}
                          disabled={checkDate}
                        >
                          {checkDate
                            ? "Đã quá hạn ứng tuyển"
                            : "Ứng tuyển ngay"}
                        </Button>
                        <Button
                          size="large"
                          variant="outlined"
                          className="!text-primary !capitalize !border-primary"
                          // startIcon={<CommonIcon.FavoriteBorder />}
                        >
                          Lưu tin
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4 flex flex-col gap-y-5">
                <div className="bg-white p-5 rounded-md flex flex-col gap-5">
                  <div className="flex gap-5">
                    <img
                      src={detailData?.posted_by?.company?.logo}
                      alt=""
                      className="rounded-md size-20 border"
                    />
                    <Typography fontWeight={500} fontSize={"16px"}>
                      {detailData?.posted_by?.company?.name}
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <div className="flex gap-2 items-start">
                      <Typography
                        className="flex items-center gap-1 !text-gray-500 text-nowrap w-24"
                        fontSize={"14px"}
                      >
                        <CommonIcon.PeopleAltOutlined />
                        Quy mô:{" "}
                      </Typography>
                      <Typography
                        className="text-wrap flex-1"
                        fontWeight={500}
                        fontSize={"15px"}
                      >
                        25 - 99 nhân viên
                      </Typography>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Typography
                        className="flex items-center gap-1 !text-gray-500 text-nowrap w-24"
                        fontSize={"14px"}
                      >
                        <CommonIcon.BusinessCenter />
                        Lĩnh vực:{" "}
                      </Typography>
                      <Typography
                        className="text-wrap flex-1"
                        fontWeight={500}
                        fontSize={"15px"}
                      >
                        {detailData?.categories[0]?.name}
                      </Typography>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Typography
                        className="flex items-center gap-1 !text-gray-500 text-nowrap w-24"
                        fontSize={"14px"}
                      >
                        <CommonIcon.Map />
                        Địa điểm:{" "}
                      </Typography>
                      <Typography
                        className="text-wrap flex-1"
                        fontWeight={500}
                        fontSize={"15px"}
                      >
                        Số 29 Galaxy 4, 69 Tố Hữu, Hà Đông, Hà Nội
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-md flex flex-col gap-5">
                  <Typography fontSize={"20px"} fontWeight={700}>
                    Thông tin chung
                  </Typography>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                      <CommonIcon.WorkspacePremium className="text-white" />
                    </div>
                    <div className="">
                      <Typography fontSize={"14px"} className="text-gray-500">
                        Cấp bậc
                      </Typography>
                      <Typography fontWeight={500}>
                        {detailData?.level?.name}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                      <CommonIcon.HourglassBottom className="text-white" />
                    </div>
                    <div className="">
                      <Typography fontSize={"14px"} className="text-gray-500">
                        Kinh nghiệm
                      </Typography>
                      <Typography fontWeight={500}>
                        {detailData?.experience}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                      <CommonIcon.PeopleAltOutlined className="text-white" />
                    </div>
                    <div className="">
                      <Typography fontSize={"14px"} className="text-gray-500">
                        Số lượng tuyển
                      </Typography>
                      <Typography fontWeight={500}>
                        {detailData?.quantity} người
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                      <CommonIcon.BusinessCenterRounded className="text-white" />
                    </div>
                    <div className="">
                      <Typography fontSize={"14px"} className="text-gray-500">
                        Hình thức làm việc
                      </Typography>
                      <Typography fontWeight={500}>
                        {
                          employmentTypeOptions.filter((item) => {
                            return item.value === detailData?.employment_type;
                          })[0].label
                        }
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                      <CommonIcon.PersonRounded className="text-white" />
                    </div>
                    <div className="">
                      <Typography fontSize={"14px"} className="text-gray-500">
                        Giới tính
                      </Typography>
                      <Typography fontWeight={500}>Không yêu cầu</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          {shouldRender && (
            <DialogMUI
              disableScrollLock={false}
              isPadding={false}
              open={open}
              title={
                <Typography fontSize={"22px"} fontWeight={600}>
                  Ứng tuyển{" "}
                  <span className="text-primary">{detailData?.title}</span>
                </Typography>
              }
              toggle={toggle}
              body={
                <ApplyJobForm
                  onClose={toggle}
                  name={detailData?.title}
                  jobId={detailData?._id}
                  posted_by={detailData?.posted_by}
                />
              }
            />
          )}
        </div>
      ) : (
        <div className=" relative w-full h-screen flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default JobDetailsPage;
