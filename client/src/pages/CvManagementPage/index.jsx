import React from "react";
import { VNFlag } from "../../assets/images";
import { CVItem } from "../../components";
import { Box, Container } from "@mui/material";
import { useConvertData, useFilters } from "../../hooks";
import { useGetAllCvThemes } from "../../hooks/modules/cv_theme/useGetAllCvThemes";
import CvItemLoading from "../../ui/CvItemLoading";

const CvManagementPage = () => {
  const { filters } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
    sortBy: "createdAt",
  });
  const { data, isLoading } = useGetAllCvThemes(filters);
  const { dataConvert } = useConvertData(data);

  return (
    <>
      <Box className=" bg-white flex items-end">
        <Box className="flex flex-col gap-8 bg-gradient-to-tr from-blue-950 to-blue-800 text-white w-full">
          <Box className="w-full bg-banner bg-no-repeat bg-contain bg-right h-full">
            <Container className="h-full flex flex-col gap-2 py-5">
              <h1 className="text-[30px] font-semibold font-RedHatDisplay flex items-center gap-2">
                Danh sách mẫu CV xin việc tiếng Việt{" "}
                <img src={VNFlag} alt="" className="w-10" /> chuẩn 2024
              </h1>
              <span className="text-[17px] text-neutrals-20">
                Các mẫu CV được thiết kế chuẩn theo từng ngành nghề. <br />
                Phù hợp với cả sinh viên và người đi làm.
              </span>
            </Container>
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <Container className="grid grid-cols-12 gap-6 my-8">
          {Array(3)
            .fill(null)
            ?.map((_, index) => (
              <Box key={index} className="col-span-4">
                <CvItemLoading />
              </Box>
            ))}
        </Container>
      ) : (
        <Container className="grid grid-cols-12 gap-6 my-8">
          {dataConvert?.map((item) => (
            <Box key={item?._id} className="col-span-4">
              <CVItem data={item} />
            </Box>
          ))}
        </Container>
      )}
    </>
  );
};

export default CvManagementPage;
