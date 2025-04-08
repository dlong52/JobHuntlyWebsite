import { useGetPost } from "../../../../hooks/modules/post/useGetPost";
import { employmentTypeOptions, GENDER } from "../../../../constants/enum";
import moment from "moment";
import { Box, Container, Divider, Typography } from "@mui/material";
import { Button, CommonIcon } from "../../../../ui";
import HtmlContent from "../../../../ui/HtmlContent";
import { useConvertData } from "../../../../hooks";
import JobDetailLoading from "../../../../ui/JobDetailLoading";
import helpers from "../../../../utils/helpers";
import Address from "../../../../components/Address";
import { useNotifications } from "../../../../utils/notifications";
import { postService } from "../../../../services/PostServices";

const PostDetail = ({ id }) => {
  const { data, isLoading } = useGetPost(id, { enabled: !!id });
  const { dataConvert: detailData } = useConvertData(data);
  const { showError, showSuccess } = useNotifications();
  const handleApproveJob = async () => {
    const payload = {
      id: id,
      status: "approve",
    };
    try {
      await postService.updatePost(payload);
      showSuccess("Duyệt bài đăng thành công!");
    } catch (error) {
      showError(error);
    }
  };
  const handleRejectJob = async () => {
    const payload = {
      id: id,
      status: "reject",
    };
    try {
      await postService.updatePost(payload);
      showSuccess("Từ chối bài đăng thành công!");
    } catch (error) {
      showError(error);
    }
  };
  const handleDenyJob = async () => {
    const payload = {
      id: id,
      status: "deny",
    };
    try {
      await postService.updatePost(payload);
      showSuccess("Cấm bài đăng thành công!");
    } catch (error) {
      showError(error);
    }
  };
  return (
    <Box>
      {isLoading ? (
        <JobDetailLoading />
      ) : (
        <Box>
          <Container className="">
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
                    {moment(detailData?.end_date).format("DD/MM/YYYY")}
                  </Typography>
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
                          })[0]?.label
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
          <Box className="sticky flex gap-2 bottom-0 bg-white p-5 border-t">
            <Button
              onClick={handleRejectJob}
              className={"w-full !bg-accent-red !text-white"}
            >
              Từ chối
            </Button>
            <Button
              onClick={handleApproveJob}
              className={"w-full !bg-primary !text-white"}
            >
              Xác nhận duyệt bài
            </Button>
            <Button
              onClick={handleDenyJob}
              className={"w-full !bg-primary-dark !text-white"}
            >
              Cấm bài đăng
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PostDetail;
