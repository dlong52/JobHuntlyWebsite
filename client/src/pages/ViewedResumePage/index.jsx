import React from "react";
import useFilters from "../../hooks/useFilters";
import { useGetAllApplicants } from "../../hooks/modules/application/userGetApplicants";
import useConvertData from "../../hooks/useConvertData";
import { Box, Container, Typography } from "@mui/material";
import { Button, CommonIcon } from "../../ui";
import { empty } from "../../assets/images";
import { useSelector } from "react-redux";

const ViewedResumePage = () => {
  const user = useSelector((state) => state.user);
  const { filters } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
    sortBy: "createdAt",
  });
  const { data, isLoading } = useGetAllApplicants(filters);
  const { dataConvert } = useConvertData(data);
  return (
    <Box>
      <Box className="flex flex-col gap-8 bg-gradient-to-tr from-blue-950 to-blue-800 text-white w-full">
        <Box className="w-full bg-banner bg-no-repeat bg-contain bg-right h-full">
          <Container className="container mx-auto h-full flex flex-col gap-2 py-5">
            <h1 className="text-[30px] font-semibold font-RedHatDisplay">
              Danh sách các nhà tuyển dụng đã xem cv của bạn{" "}
              <CommonIcon.Favorite className="!text-red-700" />
            </h1>
            <span className="text-base text-neutrals-20 w-1/2">
              Xem lại danh sách các nhà tuyển dụng đã xem cv của bạn. Ứng tuyển
              ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
            </span>
          </Container>
        </Box>
      </Box>
      <Container className="flex flex-col gap-5 bg-white p-5 mt-5 rounded-md shadow">
        <Box className="flex justify-center items-center flex-col">
          <img src={empty} alt="" className="w-[200px]" />
          <Box className="flex flex-col items-center gap-2">
            <Typography>Tuần này chưa có nhà tuyển dụng nào đã xem CV của bạn!</Typography>
            <Button
              onClick={() => {}}
              className={"!bg-primary !capitalize !text-white"}
            >
              Tìm việc làm
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ViewedResumePage;
