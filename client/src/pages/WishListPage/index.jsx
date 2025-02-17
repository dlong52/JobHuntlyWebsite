import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetAllWishlistByUser } from "../../hooks/modules/wishlist/useGetWishlistByUser";
import useFilters from "../../hooks/useFilters";
import useConvertData from "../../hooks/useConvertData";
import { Box, Container, Typography } from "@mui/material";
import JobListItem from "../FindJobPage/components/JobListItem";
import { Button, CommonIcon } from "../../ui";
import LoadingJob from "../../ui/LoadingJob";
import { empty } from "../../assets/images";
import { RouteBase } from "../../constants/routeUrl";
import { useNavigate } from "react-router-dom";

const WishListPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { filters } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const { data, isLoading } = useGetAllWishlistByUser(user?.user_id, filters);
  const { dataConvert: wishlist } = useConvertData(data);
  const jobs = useMemo(() => {
    if (wishlist) {
      return wishlist?.jobs;
    }
    return [];
  }, [wishlist]);

  return (
    <Box>
      <Box className="flex flex-col gap-8 bg-gradient-to-tr from-blue-950 to-blue-800 text-white w-full">
        <Box className="w-full bg-banner bg-no-repeat bg-contain bg-right h-full">
          <Container className="container mx-auto h-full flex flex-col gap-2 py-5">
            <h1 className="text-[30px] font-semibold font-RedHatDisplay">
              Danh sách các việc làm đã lưu{" "}
              <CommonIcon.Favorite className="!text-red-700" />
            </h1>
            <span className="text-base text-neutrals-20 w-1/2">
              Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển
              ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
            </span>
          </Container>
        </Box>
      </Box>
      <Container className="flex flex-col gap-5 bg-white p-5 mt-5 rounded-md shadow">
        {isLoading ? (
          <Box>
            {Array(3)
              .fill(null)
              .map((_, index) => {
                return <LoadingJob key={index} />;
              })}
          </Box>
        ) : !jobs?.length ? (
          <Box className="flex justify-center items-center flex-col">
            <img src={empty} alt="" className="w-[200px]" />
            <Box className="flex flex-col items-center gap-2">
              <Typography>Bạn chưa lưu việc làm nào!</Typography>
              <Button
                onClick={() => {
                  navigate(RouteBase.Job);
                }}
                className={"!bg-primary !capitalize !text-white"}
              >
                Tìm việc làm
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            {jobs?.map((job) => {
              return (
                <JobListItem
                  key={job._id}
                  id={job._id}
                  title={job?.title}
                  salary={job?.salary}
                  company={job?.company}
                  logo={job?.company?.logo}
                  posted_by={job?.posted_by}
                  employment_type={job?.employment_type}
                />
              );
            })}
          </>
        )}
      </Container>
    </Box>
  );
};

export default WishListPage;
