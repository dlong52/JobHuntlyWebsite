import { Container, Divider, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { Button, CommonIcon } from "../../ui";
import DialogMUI from "../../components/Dialogs";
import { useToggleDialog } from "../../hooks";
import ApplyJobForm from "./components/ApplyJobForm";
import { useGetPost } from "../../hooks/modules/post/useGetPost";
import { useNavigate, useParams } from "react-router-dom";
import HtmlContent from "../../ui/HtmlContent";
import { RouteBase } from "../../constants/routeUrl";
import { useNotifications } from "../../utils/notifications";
import { employmentTypeOptions, GENDER, ROLE } from "../../constants/enum";
import useConvertData from "../../hooks/useConvertData";
import helpers from "../../utils/helpers";
import { WishListService } from "../../services/WishListServices";
import { useSelector } from "react-redux";
import { useGetStatusWishlist } from "../../hooks/modules/wishlist/useGetStatusWishlist";
import Address from "../../components/Address";
import JobDetailLoading from "../../ui/JobDetailLoading";
import moment from "moment";

const JobDetailsPage = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError, showSuccess, showInfo } = useNotifications();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, error } = useGetPost(id, { enabled: !!id });
  const { data: statusData, isLoading: loadingStatus } = useGetStatusWishlist(
    user?.user_id,
    id
  );
  const { dataConvert: detailData } = useConvertData(data);
  const { dataConvert: status } = useConvertData(statusData);

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
  const handleAddToWishlist = async () => {
    if (!user?.user_id || user.role !== ROLE.CANDIDATE) {
      showInfo("Bạn cần đăng nhập để thực hiện hành động này!");
      return;
    }
    setLoading(true);
    try {
      const payload = { userId: user?.user_id, jobId: id };
      await WishListService.addToWishList(payload);
      showSuccess("Lưu tin thành công!");
    } catch (error) {
      showError("Đã xảy ra lỗi khi lưu tin");
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveToWishlist = async () => {
    if (!user?.user_id || user.role !== ROLE.CANDIDATE) {
      showInfo("Bạn cần đăng nhập để thực hiện hành động này!");
      return;
    }
    setLoading(true);
    try {
      await WishListService.removeFromWishList(user?.user_id, id);
      showSuccess("Bỏ lưu tin thành công!");
    } catch (error) {
      showError("Đã xảy ra lỗi khi lưu tin");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {!isLoading ? (
        <Box>
          <Container className="py-10">
            <Box className="grid grid-cols-12 gap-5">
              <Box className="col-span-8 flex flex-col gap-y-5">
                <Box className="bg-white p-5 rounded-md flex flex-col gap-5">
                  <Typography fontSize={"20px"} fontWeight={700}>
                    {detailData?.title}
                  </Typography>
                  <Box className="flex justify-between py-2">
                    <Box className="flex items-center gap-3 flex-1">
                      <Box className="w-10 flex items-center justify-center rounded-full bg-gradient-to-bl from-primary to-primary-200 aspect-square">
                        <CommonIcon.Paid className="text-white" />
                      </Box>
                      <Box className="">
                        <Typography>Mức lương</Typography>
                        <Typography fontWeight={500}>
                          {helpers.convertSalary(
                            detailData?.salary?.min,
                            detailData?.salary?.max
                          )}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-center gap-3 flex-1">
                      <Box className="w-10 flex items-center justify-center rounded-full bg-gradient-to-bl from-primary to-primary-200 aspect-square">
                        <CommonIcon.LocationOnRounded className="text-white" />
                      </Box>
                      <Box className="">
                        <Typography>Địa điểm</Typography>
                        <Typography fontWeight={500}>
                          {detailData?.location?.province.name}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-center gap-3 flex-1">
                      <Box className="w-10 flex items-center justify-center rounded-full bg-gradient-to-bl from-primary to-primary-200 aspect-square">
                        <CommonIcon.HourglassBottom className="text-white" />
                      </Box>
                      <Box className="">
                        <Typography>Kinh nghiệm</Typography>
                        <Typography fontWeight={500}>
                          {helpers.convertTime(detailData?.experience)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    fontSize={"14px"}
                    className="flex items-center gap-2 bg-gray-200 text-gray-500 px-3 py-1 rounded-md size-fit"
                  >
                    <CommonIcon.AccessTime />
                    Hạn nộp hồ sơ:{" "}
                    {moment(detailData.end_date).format("DD/MM/YYYY")}
                  </Typography>
                  <Box className="flex gap-3">
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
                    {status ? (
                      <Button
                        size="large"
                        loading={loading}
                        variant="filled"
                        className="!bg-primary !capitalize !text-white"
                        startIcon={<CommonIcon.BookmarkAdded />}
                        onClick={handleRemoveToWishlist}
                        disabled={loading}
                      >
                        Đã lưu
                      </Button>
                    ) : (
                      <Button
                        loading={loading}
                        disabled={loading}
                        size="large"
                        variant="outlined"
                        className="!text-primary !capitalize !border-primary"
                        startIcon={<CommonIcon.FavoriteBorder />}
                        onClick={handleAddToWishlist}
                      >
                        Lưu tin
                      </Button>
                    )}
                  </Box>
                </Box>
                <Box className="bg-white p-5 rounded-md flex flex-col gap-y-5">
                  <Box className="flex gap-3">
                    <Divider
                      orientation="vertical"
                      className="bg-primary w-[6px]"
                      flexItem
                    />
                    <Typography fontSize={"20px"} fontWeight={700}>
                      Chi tiết tuyển dụng
                    </Typography>
                  </Box>
                  {detailData?.description && (
                    <Box className="flex flex-col gap-2">
                      <Typography fontWeight={500}>Mô tả công việc</Typography>
                      <Box className="pl-7">
                        <HtmlContent string={detailData?.description} />
                      </Box>
                    </Box>
                  )}
                  {detailData?.requirements && (
                    <Box className="flex flex-col gap-5">
                      <Typography fontWeight={500}>Yêu cầu ứng viên</Typography>
                      <Box className="pl-7">
                        <HtmlContent string={detailData?.requirements} />
                      </Box>
                    </Box>
                  )}
                  {detailData?.job_benefit && (
                    <Box className="flex flex-col gap-5">
                      <Typography fontWeight={500}>Quyền lợi</Typography>
                      <Box className="pl-7">
                        <HtmlContent string={detailData?.job_benefit} />
                      </Box>
                    </Box>
                  )}
                  {detailData?.work_time && (
                    <Box className="flex flex-col gap-5">
                      <Typography fontWeight={500}>
                        Thời gian làm việc
                      </Typography>
                      <Box className="pl-7">
                        <HtmlContent string={detailData?.work_time} />
                      </Box>
                    </Box>
                  )}
                  {detailData?.location && (
                    <Box className="flex flex-col gap-5">
                      <Typography fontWeight={500}>
                        Địa điểm làm việc
                      </Typography>
                      <Box className="pl-7">
                        <ul>
                          <li>{`${detailData?.location?.additional_info}, ${detailData?.location?.ward.name}, ${detailData?.location?.district.name}, ${detailData?.location?.province.name}`}</li>
                        </ul>
                      </Box>
                    </Box>
                  )}
                  <Box className="flex flex-col gap-5">
                    <Typography fontWeight={500}>
                      Cách thức ứng tuyển
                    </Typography>
                    <Box className="">
                      <Typography>
                        Ứng viên nộp hồ sơ trực tuyến bằng cách bấm{" "}
                        <b>Ứng tuyển</b> ngay dưới đây.
                      </Typography>
                      <Typography className="!mt-4" fontSize={"16px"}>
                        Hạn nộp hồ sơ:{" "}
                        {moment(detailData.end_date).format("DD/MM/YYYY")}
                      </Typography>
                      <Box className="flex gap-3 mt-4">
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
                          loading={loading}
                          disabled={loading}
                          variant="outlined"
                          className="!text-primary !capitalize !border-primary"
                          onClick={handleAddToWishlist}
                        >
                          Lưu tin
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className="col-span-4 flex flex-col gap-y-5">
                <Box className="bg-white p-5 rounded-md flex flex-col gap-5">
                  <Box className="flex gap-5">
                    <img
                      src={detailData?.posted_by?.company?.logo}
                      alt=""
                      className="rounded-md size-20 border"
                    />
                    <Typography fontWeight={500} fontSize={"16px"}>
                      {detailData?.posted_by?.company?.name}
                    </Typography>
                  </Box>
                  <Box className="flex flex-col gap-y-3">
                    <Box className="flex gap-2 items-start">
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
                        {helpers.convertStaffQuantity(
                          detailData?.posted_by?.company?.staff_quantity?.min,
                          detailData?.posted_by?.company?.staff_quantity?.max
                        )}{" "}
                        nhân viên
                      </Typography>
                    </Box>
                    <Box className="flex gap-2 items-start">
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
                    </Box>
                    <Box className="flex gap-2 items-start">
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
                        <Address
                          className={"!font-[500] !text-[15px]"}
                          address={detailData?.location}
                        />
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box className="bg-white p-5 rounded-md flex flex-col gap-5">
                  <Typography fontSize={"20px"} fontWeight={700}>
                    Thông tin chung
                  </Typography>
                  <Box className="flex items-center gap-3 flex-1">
                    <Box className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                      <CommonIcon.WorkspacePremium className="text-white" />
                    </Box>
                    <Box className="">
                      <Typography fontSize={"14px"} className="text-gray-500">
                        Cấp bậc
                      </Typography>
                      <Typography fontWeight={500}>
                        {detailData?.level?.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex items-center gap-3 flex-1">
                    <Box className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                      <CommonIcon.HourglassBottom className="text-white" />
                    </Box>
                    <Box className="">
                      <Typography fontSize={"14px"} className="text-gray-500">
                        Kinh nghiệm
                      </Typography>
                      <Typography fontWeight={500}>
                        {helpers.convertTime(detailData?.experience)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex items-center gap-3 flex-1">
                    <Box className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                      <CommonIcon.PeopleAltOutlined className="text-white" />
                    </Box>
                    <Box className="">
                      <Typography fontSize={"14px"} className="text-gray-500">
                        Số lượng tuyển
                      </Typography>
                      <Typography fontWeight={500}>
                        {detailData?.quantity} người
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex items-center gap-3 flex-1">
                    <Box className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                      <CommonIcon.BusinessCenterRounded className="text-white" />
                    </Box>
                    <Box className="">
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
                    </Box>
                  </Box>
                  <Box className="flex items-center gap-3 flex-1">
                    <Box className="w-10 flex items-center justify-center rounded-full bg-primary aspect-square">
                      <CommonIcon.PersonRounded className="text-white" />
                    </Box>
                    <Box className="">
                      <Typography fontSize={"14px"} className="text-gray-500">
                        Giới tính
                      </Typography>
                      <Typography fontWeight={500}>
                        {detailData?.gender === GENDER.MALE
                          ? "Nam"
                          : detailData?.gender === GENDER.FEMALE
                          ? "Nữ"
                          : "Không yêu cầu"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
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
                  companyId={detailData?.company?._id}
                  posted_by={detailData?.posted_by}
                />
              }
            />
          )}
        </Box>
      ) : (
        <Box >
          <JobDetailLoading  />
        </Box>
      )}
    </>
  );
};

export default JobDetailsPage;
