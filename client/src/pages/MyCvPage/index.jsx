import React from "react";
import { useConvertData, useFilters } from "../../hooks";
import { useSelector } from "react-redux";
import { useGetAllCvs } from "../../hooks/modules/cv/useGetAllCv";
import { Box, Container, Typography } from "@mui/material";
import { Button, CommonIcon } from "../../ui";
import CvItem from "./components/CvItem";
import CvItemSkeleton from "../../ui/CvItemSkeleton";
import { empty } from "../../assets/images";

const MyCvPage = () => {
  const { user_id } = useSelector((state) => state.user);
  const { filters } = useFilters({ user: user_id });
  const { data, isLoading } = useGetAllCvs(filters, { enabled: !!user_id });
  const { dataConvert } = useConvertData(data);

  return (
    <Container className="pt-5">
      <Box className="py-4 px-6 rounded-md bg-white shadow">
        <div className="flex justify-between items-center">
          <Typography fontSize={"20px"} fontWeight={500}>
            CV đã tạo trên JobHuntly
          </Typography>
          <Button
            startIcon={<CommonIcon.Add />}
            className={"!bg-primary !text-white !px-5"}
            sx={{ textTransform: "none" }}
          >
            Tạo CV
          </Button>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-12 gap-5 mt-2">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="col-span-4">
                  <CvItemSkeleton />
                </div>
              ))}
          </div>
        ) : dataConvert?.length > 0 ? (
          <div className="grid grid-cols-12 gap-5 mt-2">
            {dataConvert.map((item) => (
              <div key={item._id} className="col-span-4">
                <CvItem data={item} />
              </div>
            ))}
          </div>
        ) : (
          <Box className="flex justify-center items-center flex-col">
            <img src={empty} alt="" className="w-[200px]" />
            <Box className="flex flex-col items-center gap-2">
              <Typography>
                Bạn chưa có CV nào
              </Typography>
              {/* <Button
                onClick={() => {}}
                className={"!bg-primary !capitalize !text-white"}
              >
                Tìm việc làm
              </Button> */}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MyCvPage;
