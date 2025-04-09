import React, { Fragment, useEffect, useMemo } from "react";
import { Form, Formik } from "formik";
import { Box, Button, Container, Typography } from "@mui/material";
import { lineBanner, mascot_empty } from "../../assets/images";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import JobFilter from "./components/JobFilter";
import JobListItem from "./components/JobListItem";
import { useGetAllPosts } from "../../hooks/modules/post/useGetAllPosts";
import useFilters from "../../hooks/useFilters";
import SelectProvinceField from "../../components/SelectField/SelectProvinceField";
import PaginationMui from "../../ui/Pagination";
import useConvertData from "../../hooks/useConvertData";
import useQueryParams from "../../hooks/useQueryParams";
import helpers from "../../utils/helpers";
import LoadingJob from "../../ui/LoadingJob";
import { useSearchParams } from "react-router-dom";
import { useGetAllWishlistByUser } from "../../hooks/modules/wishlist/useGetWishlistByUser";
import { useSelector } from "react-redux";
import { useGetAppliedJobs } from "../../hooks/modules/application/useGetAppliedJobs";
import { PACKAGE_CODE } from "../../constants/enum";

const FindJobPage = () => {
  const { user_id } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useQueryParams();
  
  // Initialize filters with default values
  const { filters, handleChangePage, setFilters } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
    status: "approve",
  });

  // Fetch data with hooks
  const { data: appliedJobData } = useGetAppliedJobs(user_id);
  const { dataConvert: appliedJobs } = useConvertData(appliedJobData);
  
  const { data: wishlistData } = useGetAllWishlistByUser(user_id);
  const { dataConvert: wishlist } = useConvertData(wishlistData);
  
  const { data, isLoading } = useGetAllPosts(filters);
  const { dataConvert } = useConvertData(data);

  // Derive derived state from raw data
  const wishlistJob = useMemo(() => wishlist?.jobs || [], [wishlist]);
  
  const jobData = useMemo(() => dataConvert || [], [dataConvert]);
  
  const filterData = useMemo(() => {
    if (searchParams.size === 0) return {};
    
    return {
      searchName: query?.searchName,
      location: query?.location,
      employment_type: query?.employment_type,
      min_salary: query?.salaryMin && Number(query?.salaryMin),
      max_salary: query?.salaryMax && Number(query?.salaryMax),
      level: query?.level,
      company: query?.company,
      category: query?.category,
      ...helpers.checkExp(query?.experience),
    };
  }, [query, searchParams]);

  // Update filters when URL params change
  useEffect(() => {
    const defaultFilters = {
      page: 1,
      limit: 10,
      sort: "desc",
      status: "approve",
    };
    
    const newFilters = searchParams.size === 0
      ? defaultFilters
      : { ...filters, ...filterData, page: 1 };

    if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
      setFilters(newFilters);
    }
  }, [filterData, searchParams]);

  // Handle search form submission
  const handleSearchSubmit = (values) => {
    const params = new URLSearchParams();
    if (values?.searchName) params.set("searchName", values?.searchName);
    if (values?.province?.label) params.set("location", values?.province?.label);

    if (searchParams.toString() !== params.toString()) {
      setSearchParams(params);
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchParams("");
    setFilters({ page: 1, limit: 10, sort: "desc", status: "approve" });
  };
  
  // Render empty state
  const renderEmptyState = () => {
    if (!jobData?.length && Object.keys(query).length !== 0) {
      return (
        <Box className="flex flex-col gap-2 items-center justify-center">
          <img src={mascot_empty} className="w-40" alt="" />
          <Typography fontSize={"14px"} className="text-neutrals-60">
            Chưa tìm thấy việc làm phù hợp với yêu cầu của bạn. Bạn thử
            xóa bộ lọc và tìm lại nhé.
          </Typography>
          <Button onClick={handleClearFilters}>Xóa lọc</Button>
        </Box>
      );
    }
    
    if (!jobData?.length) {
      return (
        <Box className="flex flex-col gap-2 items-center justify-center">
          <img src={mascot_empty} className="w-40" alt="" />
          <Typography fontSize={"14px"} className="text-neutrals-60">
            Không có việc làm nào đang tuyển dụng.
          </Typography>
        </Box>
      );
    }
    
    return null;
  };

  // Render job list
  const renderJobList = () => {
    if (!jobData?.length) return null;
    
    return (
      <>
        <Box className="flex flex-col gap-6">
          {jobData.map((job) => {
            const isWishlisted = wishlistJob.some(item => item._id === job._id);
            const isApplied = appliedJobs?.some(item => item._id === job._id);
            
            return (
              <JobListItem
                key={job._id}
                end_date={job.end_date}
                id={job._id}
                title={job?.title}
                salary={job?.salary}
                company={job?.company}
                logo={job?.company?.logo}
                posted_by={job?.posted_by}
                status={isWishlisted}
                employment_type={job?.employment_type}
                isApplied={isApplied}
                isHot={job?.subscription_id?.package_id?.package_code === PACKAGE_CODE.MAX_PLUS}
              />
            );
          })}
        </Box>
        <Box className="w-full flex justify-end py-4">
          <PaginationMui
            handleChangePage={handleChangePage}
            page={filters.page}
            totalPages={data?.data?.pagination?.totalPages}
          />
        </Box>
      </>
    );
  };

  return (
    <Fragment>
      {/* Hero Banner */}
      <Box className="bg-banner bg-no-repeat bg-contain bg-right h-[500px] bg-neutrals-0 flex items-end">
        <Container
          className="flex flex-col justify-center items-center gap-8"
          style={{ height: "calc(100% - 75px)" }}
        >
          <Box className="flex gap-3 font-ClashDisplay font-semibold text-[72px] text-neutrals-100 leading-tight">
            <h1>Find your</h1>
            <Box className="">
              <h1 className="text-accent-blue">dreamjobs</h1>
              <img src={lineBanner} alt="" />
            </Box>
          </Box>
          
          {/* Search Form */}
          <Formik
            initialValues={{ searchName: query?.searchName, province: query?.location }}
            onSubmit={handleSearchSubmit}
          >
            {() => (
              <Form className="flex bg-white rounded-sm shadow-md w-full p-5 gap-6">
                <FormikField
                  name="searchName"
                  component={InputField}
                  variant="standard"
                  placeholder="Vị trí tuyển dụng, tên công ty"
                />
                <SelectProvinceField variant="standard" />
                <Button
                  type="submit"
                  sx={{ paddingX: 5 }}
                  size="large"
                  className="!bg-primary !text-white !text-nowrap font-semibold px-8 rounded-sm hover:bg-blue-600 transition-all !normal-case"
                >
                  Tìm kiếm
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
      {/* Job Listings Section */}
      <Box className="bg-white relative">
        <Container className="grid grid-cols-12 py-6 gap-5">
          {/* Filter Sidebar */}
          <Box className="col-span-3">
            <JobFilter setFilters={handleClearFilters} />
          </Box>
          
          {/* Job Listings */}
          <Box className="col-span-9">
            {isLoading ? (
              <Box className="flex flex-col gap-5">
                {Array(3).fill(null).map((_, index) => (
                  <LoadingJob key={index} />
                ))}
              </Box>
            ) : (
              <>
                {renderEmptyState()}
                {renderJobList()}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

export default FindJobPage;