import { Box, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import BreadcrumbMui from "../../ui/BreadcrumbMui";
import { useNotifications } from "../../utils/notifications";
import { useConvertData, useFilters } from "../../hooks";
import { useGetAllPosts } from "../../hooks/modules/post/useGetAllPosts";
import { useGetCompany } from "../../hooks/modules/company/useGetCompany";
import { useSelector } from "react-redux";
import HtmlContent from "../../ui/HtmlContent";
import MascotEmpty from "../../components/MascotEmpty";
import { Button, CommonIcon } from "../../ui";
import Address from "../../components/Address";
import { companyLogoDefault } from "../../assets/images";
import CompanyLoadingSkeleton from "../../ui/CompanyLoadingSkeleton";
import helpers from "../../utils/helpers";

const MyCompanyPage = () => {
  const { company_id } = useSelector((state) => state.user);
  const currentUrl = window.location.href;
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotifications();
  const { data, isLoading, error } = useGetCompany(company_id, {
    enabled: !!company_id,
  });
  const { dataConvert: detailData } = useConvertData(data);
  if (error) {
    navigate(RouteBase.Home);
    showError("Bài đăng không tồn tại!");
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      showSuccess("Đã sao chép thành công!");
    });
  };
  const shareToSocial = (platform) => {
    const encodedUrl = encodeURIComponent(currentUrl);
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
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
      Thông tin công ty
    </Typography>,
  ];
  return (
    <Box className="flex flex-col gap-y-5">
      <BreadcrumbMui breadcrumbs={breadcrumbs} title={"Thông tin công ty"} />
      {isLoading ? (
        <CompanyLoadingSkeleton />
      ) : (
        <Box className="">
          <Box className="rounded-md overflow-hidden relative p-4 bg-white shadow">
            {detailData?.cover && (
              <img
                src={detailData?.cover}
                alt=""
                className="w-full h-[225px] object-cover object-center"
              />
            )}
            {!detailData?.cover && <Box className="bg-slate-200 h-[225px]" />}
            <Box className="relative">
              <img
                src={detailData?.logo ? detailData?.logo : companyLogoDefault}
                alt=""
                className="size-[180px] rounded-full absolute  object-cover -top-[90px] left-5"
              />
            </Box>
            <Box className=" flex pl-[250px] pr-10 py-10">
              <Box className="">
                <Typography
                  className="text-neutrals-100"
                  fontSize={"24px"}
                  fontWeight={500}
                >
                  {detailData?.name}
                </Typography>
                <div className="flex items-center gap-10 text-neutrals-80 text-sm mt-5">
                  <div className="flex items-center gap-2 ">
                    <CommonIcon.LanguageTwoTone className="!text-[18px]" />
                    <Typography fontSize={"14px"}>
                      {detailData?.website || "Chưa cập nhật"}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <CommonIcon.GroupsTwoTone className="!text-[18px]" />
                    <Typography fontSize={"14px"}>
                      {helpers.convertStaffQuantity(
                        detailData?.staff_quantity?.min,
                        detailData?.staff_quantity?.max
                      ) || ""}{" "}
                      {!!helpers.convertStaffQuantity(
                        detailData?.staff_quantity?.min,
                        detailData?.staff_quantity?.max
                      ) && "nhân viên"}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <CommonIcon.PhoneInTalkTwoTone className="!text-[18px]" />
                    <Typography fontSize={"14px"}>
                      {detailData?.phone || "Chưa cập nhật"}
                    </Typography>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
          <Box className="grid grid-cols-12 mt-5 gap-5">
            <Box className="col-span-8 h-auto flex flex-col gap-5">
              <Box className="rounded-md overflow-hidden shadow bg-white">
                <Box className="bg-gradient-to-r from-primary-dark to-primary px-6 py-2">
                  <Typography fontSize={"20px"} fontWeight={500} color="white">
                    Giới thiệu công ty
                  </Typography>
                </Box>
                {detailData?.introduce ? (
                  <Box className="p-5">
                    <HtmlContent string={detailData?.introduce} />
                  </Box>
                ) : (
                  <MascotEmpty message={"Chưa có thông tin công ty"} />
                )}
              </Box>
            </Box>
            <Box className="col-span-4 flex flex-col gap-5">
              <Box className="rounded-md overflow-hidden shadow bg-white">
                <Box className="bg-gradient-to-r from-primary-dark to-primary px-6 py-2">
                  <Typography fontSize={"20px"} fontWeight={500} color="white">
                    Thông tin liên hệ
                  </Typography>
                </Box>
                <div className="p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center">
                      <CommonIcon.LocationOn />
                      <Typography fontWeight={500}>Địa chỉ công ty</Typography>
                    </div>
                    <Address
                      className={"text-gray-600 !text-sm"}
                      address={detailData?.address}
                    />
                  </div>
                </div>
              </Box>
              <Box className="rounded-md overflow-hidden shadow bg-white">
                <Box className="bg-gradient-to-r from-primary-dark to-primary px-6 py-2">
                  <Typography fontSize={"20px"} fontWeight={500} color="white">
                    Chia sẻ công ty tới bạn bè
                  </Typography>
                </Box>
                <div className="p-5 flex flex-col gap-5">
                  <div className="overflow-hidden flex items-center gap-2 flex-nowrap border rounded px-3 py-2">
                    <Typography className="flex-1 truncate">
                      {currentUrl}
                    </Typography>
                    <Button
                      onClick={handleCopy}
                      className="!bg-primary-light !text-primary"
                    >
                      <CommonIcon.ContentCopy fontSize="small" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography fontWeight={500}>
                      Chia sẻ qua mạng xã hội
                    </Typography>
                    <div className="flex gap-2">
                      <Box
                        className="size-[48px] flex items-center justify-center rounded-full border cursor-pointer"
                        onClick={() => shareToSocial("facebook")}
                      >
                        <CommonIcon.Facebook />
                      </Box>
                      <Box
                        className="size-[48px] flex items-center justify-center rounded-full border cursor-pointer"
                        onClick={() => shareToSocial("twitter")}
                      >
                        <CommonIcon.Twitter />
                      </Box>
                      <Box
                        className="size-[48px] flex items-center justify-center rounded-full border cursor-pointer"
                        onClick={() => shareToSocial("linkedin")}
                      >
                        <CommonIcon.LinkedIn />
                      </Box>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MyCompanyPage;
