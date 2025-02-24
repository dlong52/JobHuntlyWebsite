import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useNotifications } from "../../utils/notifications";
import { useGetCompany } from "../../hooks/modules/company/useGetCompany";
import { RouteBase } from "../../constants/routeUrl";
import { Box, Button, Container, Typography } from "@mui/material";
import HtmlContent from "../../ui/HtmlContent";
import { CommonIcon } from "../../ui";
import Address from "../../components/Address";
import useFilters from "../../hooks/useFilters";
import { useGetAllPosts } from "../../hooks/modules/post/useGetAllPosts";
import JobListItem from "../FindJobPage/components/JobListItem";
import PaginationMui from "../../ui/Pagination";
import MascotEmpty from "../../components/MascotEmpty";
import useConvertData from "../../hooks/useConvertData";
import { company, companyLogoDefault } from "../../assets/images";

const CompanyDetailPage = () => {
  const { id } = useParams();
  const currentUrl = window.location.href;
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotifications();
  const { filters, handleChangePage, setFilters } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
    company: id,
  });

  const { data: postData } = useGetAllPosts(filters);
  const { dataConvert: jobData } = useConvertData(postData);
  const { data, isLoading, error } = useGetCompany(id, { enabled: !!id });
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

  return (
    <Container className="py-5">
      <Box className="rounded-md overflow-hidden relative">
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
        <Box className="bg-gradient-to-r from-primary-dark to-primary flex pl-[250px] pr-10 py-10">
          <Box className="">
            <Typography
              className="text-white"
              fontSize={"24px"}
              fontWeight={500}
            >
              {detailData?.name}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="grid grid-cols-12 mt-5 gap-5">
        <Box className="col-span-8 flex flex-col gap-5">
          <Box className="rounded-md overflow-hidden shadow">
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
          <Box className="rounded-md overflow-hidden shadow">
            <Box className="bg-gradient-to-r from-primary-dark to-primary px-6 py-2">
              <Typography fontSize={"20px"} fontWeight={500} color="white">
                Tuyển dụng
              </Typography>
            </Box>
            {!!jobData?.length ? (
              <div className="p-5 flex flex-col gap-6">
                {jobData?.map((job) => (
                  <JobListItem
                    key={job._id}
                    id={job._id}
                    title={job?.title}
                    salary={job?.salary}
                    company={job?.company}
                    logo={job?.company?.logo}
                    employment_type={job?.employment_type}
                  />
                ))}
              </div>
            ) : (
              <Box>
                <MascotEmpty message={"Chưa có việc làm nào"} />
              </Box>
            )}
            {!!jobData?.length && (
              <div className="flex justify-center">
                <PaginationMui
                  handleChangePage={handleChangePage}
                  page={filters.page}
                  totalPages={postData?.data?.pagination.totalPages}
                />
              </div>
            )}
          </Box>
        </Box>
        <Box className="col-span-4 flex flex-col gap-5">
          <Box className="rounded-md overflow-hidden shadow">
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
          <Box className="rounded-md overflow-hidden shadow">
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
    </Container>
  );
};

export default CompanyDetailPage;
