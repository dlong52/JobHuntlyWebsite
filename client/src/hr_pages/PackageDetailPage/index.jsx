import { Box, Grid2, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { Button, CommonIcon } from "../../ui";
import { package_detail_banner } from "../../assets/images";
import { useParams } from "react-router-dom";
import { useGetPackage } from "../../hooks/modules/package/useGetPackage";

const PackageDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPackage(id, { enable: !!id });
  const detailData = useMemo(() => {
    if (data) {
      return data?.data?.data;
    }
  }, [data]);
  return (
    <Box className="w-full rounded-md overflow-hidden bg-white relative">
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
      <Grid2 container spacing={5} className="p-5 relative">
        <Grid2
          size={8}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          minHeight={"1000px"}
        >
          <Typography variant="h6">Thông tin chi tiết dịch vụ</Typography>
          <Box className="p-3 rounded-md border size-fit flex items-center gap-3">
            <CommonIcon.AccessTime
              fontSize="medium"
              className="p-1 rounded-full bg-primary text-white"
            />
            <Typography fontWeight={500} color="var(--neutrals-80)">
              Thời gian hiệu lực:{" "}
              <span className="text-neutrals-100">1 tuần</span>
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={4} position={"sticky"} top={0}>
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
            <Box className="flex justify-between items-center">
              <Typography>Số lượng</Typography>
              <Box className="flex items-center border size-fit rounded">
                <Box className="p-4 border-r">
                  <CommonIcon.Remove />
                </Box>
                <Box className="px-8">1</Box>
                <Box className="p-4 border-l">
                  <CommonIcon.Add />
                </Box>
              </Box>
            </Box>
            <Box className="flex flex-col gap-2">
              {/* <Button variant="outlined" size="large" className="w-full !border-primary !text-primary">Thêm vào giỏ hàng</Button> */}
              <Button size="large" className="w-full !bg-primary !text-white">
                Mua ngay
              </Button>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PackageDetailPage;
