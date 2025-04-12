import React from "react";
import { useConvertData, useFilters } from "../../hooks";
import { useSelector } from "react-redux";
import { useGetAllCvs } from "../../hooks/modules/cv/useGetAllCv";
import { Box, Container, Typography } from "@mui/material";
import { Button, CommonIcon } from "../../ui";
import CvItem from "./components/CvItem";
import CvItemSkeleton from "../../ui/CvItemSkeleton";
import { empty } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";

const MyCvPage = () => {
  const navigate = useNavigate();
  const { user_id } = useSelector((state) => state.user);
  const { filters } = useFilters({ user: user_id });
  const { data, isLoading } = useGetAllCvs(filters, { enabled: !!user_id });
  const { dataConvert } = useConvertData(data);

  return (
    <Container className="pt-5  pb-20">
      <Box className="py-4 px-6 rounded-md bg-white shadow">
        <Box className="flex justify-between items-center">
          <Typography fontSize={"20px"} fontWeight={500}>
            CV đã tạo trên JobHuntly
          </Typography>
          <Button
            startIcon={<CommonIcon.Add />}
            onClick={() => {
              navigate(RouteBase.CVTemplate);
            }}
            className={"!bg-primary !text-white !px-5"}
            sx={{ textTransform: "none" }}
          >
            Tạo CV
          </Button>
        </Box>
        {isLoading ? (
          <Box className="grid grid-cols-12 gap-5 mt-2">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <Box key={index} className="col-span-4">
                  <CvItemSkeleton />
                </Box>
              ))}
          </Box>
        ) : dataConvert?.length > 0 ? (
          <Box className="grid grid-cols-12 gap-5 mt-2">
            {dataConvert.map((item) => (
              <Box key={item._id} className="col-span-4">
                <CvItem data={item} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box className="flex justify-center items-center flex-col">
            <img src={empty} alt="" className="w-[200px]" />
            <Box className="flex flex-col items-center gap-2">
              <Typography>Bạn chưa có CV nào</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MyCvPage;
