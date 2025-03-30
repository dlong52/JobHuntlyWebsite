import { Box, Divider, Grid2, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { Button, CommonIcon } from "../../ui";
import { package_detail_banner } from "../../assets/images";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPackage } from "../../hooks/modules/package/useGetPackage";
import { useConvertData, useFilters } from "../../hooks";
import HtmlContent from "../../ui/HtmlContent";
import { RouteBase } from "../../constants/routeUrl";
import { useSelector } from "react-redux";
import { useGetAllSubscriptions } from "../../hooks/modules/subscription/useGetAllSubscriptions";
import { useNotifications } from "../../utils/notifications";

const PackageDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user_id, is_verified } = useSelector((state) => state.user);
  const { filters: filtersSub } = useFilters({
    employer_id: user_id,
    status: "active",
    activeOnly: true,
  });
  const { data: subData, isLoading: isLoadingSub } = useGetAllSubscriptions(
    filtersSub,
    {
      enabled: !!user_id,
    }
  );
  const { dataConvert: subscriptions } = useConvertData(subData);
  const { data, isLoading } = useGetPackage(id, { enable: !!id });
  const { dataConvert: detailData } = useConvertData(data);
  const { showInfo } = useNotifications();
  const checkAlreadyPackage = subscriptions?.some(
    (item) => item.package_id._id === id
  );
  return (
    <Box className="w-full relative rounded-md overflow-hidden bg-white h-fit">
      <Box className="bg-gradient-to-tr max-h-60 text-neutrals-100 overflow-hidden from-[#b7a2fb42] via-white to-white p-5  w-full flex items-center justify-between">
        <Box className="w-full flex flex-col gap-4">
          <Typography fontSize={"20px"} fontWeight={600}>
            Đăng tin tuyển dụng
          </Typography>
          <Typography
            textTransform={"uppercase"}
            fontSize={"30px"}
            fontWeight={700}
          >
            {detailData?.name}
          </Typography>
          <Box className="flex w-4/5 gap-1 items-start">
            <CommonIcon.CheckRounded
              fontSize="10px"
              className="rounded-full bg-primary p-[2px] text-white"
            />
            <Typography fontSize={"15px"} marginTop={"-4px"}>
              {detailData?.introduce}
            </Typography>
          </Box>
        </Box>
        <Box className="bg-gradient-to-tr blur-[0.5px] from-primary to-primary-200 p-10 rounded-lg size-fit -rotate-12">
          <img src={package_detail_banner} className="rounded-md" alt="" />
        </Box>
      </Box>
      <Box className="p-5 relative grid grid-cols-12 gap-5">
        <Box className="col-span-8 flex flex-col gap-2">
          <Typography variant="h6">Thông tin chi tiết dịch vụ</Typography>
          <div className="flex gap-2">
            <Box className="p-3 rounded-md border size-fit flex items-center gap-3 flex-1">
              <CommonIcon.AccessTime
                fontSize="medium"
                className="p-1 rounded-full bg-primary text-white"
              />
              <Typography
                fontSize={"14px"}
                fontWeight={500}
                color="var(--neutrals-80)"
              >
                Thời gian hiệu lực:{" "}
                <span className="text-neutrals-100">
                  {detailData?.duration_in_days} ngày
                </span>
              </Typography>
            </Box>
            <Box className="p-3 rounded-md border size-fit flex items-center gap-3 flex-1">
              <CommonIcon.FlagRounded
                fontSize="medium"
                className="p-1 rounded-full bg-primary text-white"
              />
              <Typography
                fontSize={"14px"}
                fontWeight={500}
                color="var(--neutrals-80)"
              >
                Số lượng tin giới hạn:{" "}
                <span className="text-neutrals-100">
                  {detailData?.job_post_limit} tin
                </span>
              </Typography>
            </Box>
          </div>
          <Box className="bg-gradient-to-bl from-primary-light to-[#9dbefc6e] p-5 rounded-md">
            <img src={detailData?.image_description} alt="" />
          </Box>
          <Box className="flex gap-2 mt-4">
            <Divider
              orientation="vertical"
              className="bg-primary w-[3.5px]"
              flexItem
            />
            <Typography
              className="!text-neutrals-100"
              fontSize={"18px"}
              fontWeight={600}
            >
              Các tính năng nổi bật
            </Typography>
          </Box>
          <Box className="flex flex-col gap-3 ml-3">
            {detailData?.features?.map((item, index) => {
              return (
                <Box key={index} className="flex items-start gap-5">
                  <CommonIcon.CheckRounded className="rounded-full !text-[14px] bg-primary p-[2px] mt-[2px] text-white" />
                  <Typography fontSize={"16px"} color="var(--neutrals-100)">
                    {item}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box className="flex gap-2 mt-4">
            <Divider
              orientation="vertical"
              className="bg-primary w-[3.5px]"
              flexItem
            />
            <Typography
              className="!text-neutrals-100"
              fontSize={"18px"}
              fontWeight={600}
            >
              Mô tả chi tiết dịch vụ
            </Typography>
          </Box>
          <div className="mt-3 text-neutrals-100">
            <HtmlContent string={detailData?.description} />
          </div>
        </Box>
        <Box className="sticky top-header-hr col-span-4">
          <Box className="border border-primary rounded-md p-5 shadow-border flex flex-col gap-5">
            <Typography
              fontSize={"16px"}
              paddingBottom={2}
              borderBottom={1}
              borderColor={"var(--neutrals-40)"}
              fontWeight={500}
            >
              Đăng tin tuyển dụng (HUNTLY MAX PLUS)
            </Typography>
            <Typography variant="h5" fontWeight={600} color={"var(--primary)"}>
              9.000.000 VND
            </Typography>
            <Box className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  if (checkAlreadyPackage) {
                    showInfo(
                      "Bạn đang sử dụng gói dịch vụ này vui lòng chọn gói khác!"
                    );
                    return;
                  }
                  if (!is_verified) {
                    showInfo(
                      "Bạn cần xác thực tài khoản để sử dụng dịch vụ của JobHuntly!"
                    );
                    return;
                  }
                  navigate(`${RouteBase.HRCheckout}?package=${id}`);
                }}
                size="large"
                className="w-full !bg-primary !text-white"
              >
                Mua ngay
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PackageDetailPage;
