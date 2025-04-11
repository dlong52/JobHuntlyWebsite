import React, { Fragment, useEffect, useMemo, useState, useRef, useCallback } from "react";
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
import { useGetSuggest } from "../../hooks/modules/search/useGetSuggest";
import JobSuggestItem from "./components/JobSuggestItem";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const FindJobPage = () => {
  const { user_id } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useQueryParams();

  const [isShowSuggest, setIsShowSuggest] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState(query?.searchName || "");
  const debouncedSearchValue = useDebounce(searchInputValue, 300);
  const suggestRef = useRef(null);

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

  const { filters: querySuggest, setFilters: setFilterSuggest } = useFilters({
    query: "",
  });
  
  const { data: suggestData } = useGetSuggest(querySuggest);
  const { dataConvert: suggests } = useConvertData(suggestData);

  // Derive derived state from raw data - memoize to prevent unnecessary recalculations
  const wishlistJob = useMemo(() => wishlist?.jobs || [], [wishlist]);
  const jobData = useMemo(() => dataConvert || [], [dataConvert]);

  // Memoize filter data derived from search params
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
  }, [query, searchParams.size]);

  // Update filters when URL params change - with proper dependency array
  useEffect(() => {
    if (searchParams.size === 0) {
      // Only reset if filters aren't already at default values
      const defaultFilters = {
        page: 1,
        limit: 10,
        sort: "desc",
        status: "approve",
      };
      
      if (JSON.stringify(filters) !== JSON.stringify(defaultFilters)) {
        setFilters(defaultFilters);
      }
    } else if (Object.keys(filterData).length) {
      // Only update if there's an actual change to prevent loops
      const newFilters = { ...filters, ...filterData, page: 1 };
      if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
        setFilters(newFilters);
      }
    }
  }, [filterData, searchParams.size]);

  // Memoize the search form submit handler
  const handleSearchSubmit = useCallback((values) => {
    const params = new URLSearchParams(searchParams);
    
    if (values?.searchName) {
      params.set("searchName", values?.searchName);
    } else {
      params.delete("searchName");
    }
    
    if (values?.province?.label) {
      params.set("location", values?.province?.label);
    } else {
      params.delete("location");
    }
  
    setSearchParams(params);
    setIsShowSuggest(false);
  }, [searchParams, setSearchParams]);

  // Memoize clear filters handler
  const handleClearFilters = useCallback(() => {
    setSearchParams("");
    setFilters({ page: 1, limit: 10, sort: "desc", status: "approve" });
  }, [setSearchParams, setFilters]);

  // Update search suggestions based on debounced value
  useEffect(() => {
    if (debouncedSearchValue) {
      setFilterSuggest({
        query: debouncedSearchValue,
      });
    } else {
      setFilterSuggest({});
    }
  }, [debouncedSearchValue, setFilterSuggest]);

  // Handle clicks outside the suggestion box to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestRef.current && !suggestRef.current.contains(event.target)) {
        setIsShowSuggest(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update search input when URL param changes
  useEffect(() => {
    if (query?.searchName && searchInputValue !== query.searchName) {
      setSearchInputValue(query.searchName);
    }
  }, [query?.searchName, searchInputValue]);

  // Load initial filters from URL on first render only
  useEffect(() => {
    if (searchParams.size > 0 && Object.keys(filterData).length > 0) {
      setFilters(prev => ({
        ...prev,
        ...filterData,
        page: 1
      }));
    }
  }, []); // Empty dependency array for first render only

  // Memoize the empty state render function
  const renderEmptyState = useCallback(() => {
    if (!jobData?.length && Object.keys(query).length !== 0) {
      return (
        <Box className="flex flex-col gap-2 items-center justify-center">
          <img src={mascot_empty} className="w-40" alt="" />
          <Typography fontSize={"14px"} className="text-neutrals-60">
            Chưa tìm thấy việc làm phù hợp với yêu cầu của bạn. Bạn thử xóa bộ
            lọc và tìm lại nhé.
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
  }, [jobData?.length, query, handleClearFilters]);

  // Memoize the job list render function
  const renderJobList = useMemo(() => {
    if (!jobData?.length) return null;

    return (
      <>
        <Box className="flex flex-col gap-6">
          {jobData.map((job) => {
            const isWishlisted = wishlistJob.some(
              (item) => item._id === job._id
            );
            const isApplied = appliedJobs?.some((item) => item._id === job._id);

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
                isHot={
                  job?.subscription_id?.package_id?.package_code ===
                  PACKAGE_CODE.MAX_PLUS
                }
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
  }, [jobData, wishlistJob, appliedJobs, handleChangePage, filters.page, data]);

  // Determine if suggestions should be shown
  const shouldShowSuggestions = useMemo(() => {
    return (
      isShowSuggest && 
      searchInputValue.length > 0 && 
      (suggests?.suggests?.length > 0 || suggests?.jobs?.length > 0)
    );
  }, [isShowSuggest, searchInputValue, suggests]);

  // Memoize the form initial values to prevent unnecessary form reinitializations
  const formInitialValues = useMemo(() => ({
    searchName: query?.searchName || "",
    province: query?.location ? { label: query?.location } : "",
  }), [query?.searchName, query?.location]);

  // Handle suggestion item click
  const handleSuggestionClick = useCallback((item) => {
    return (values) => {
      setSearchInputValue(item);
      setSearchParams({
        searchName: item,
        ...(values.province?.label ? { location: values.province.label } : {})
      });
      setIsShowSuggest(false);
    };
  }, [setSearchParams]);

  return (
    <Fragment>
      {/* Hero Banner */}
      <Box className="bg-banner bg-no-repeat bg-contain bg-right h-[500px] bg-neutrals-0 flex items-end">
        <Container
          className="flex flex-col justify-center items-center gap-8"
          style={{ height: "calc(100% - 75px)" }}
        >
          <div className="flex gap-3 font-ClashDisplay font-semibold text-[72px] text-neutrals-100 leading-tight">
            <h1>Find your</h1>
            <Box className="">
              <h1 className="text-accent-blue">dreamjobs</h1>
              <img src={lineBanner} alt="" />
            </Box>
          </div>

          {/* Search Form */}
          <Formik
            initialValues={formInitialValues}
            onSubmit={handleSearchSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue }) => {
              // Memoize input change handler to avoid recreation on each render
              const handleInputChange = useCallback((e) => {
                const value = e.target.value;
                setSearchInputValue(value);
                setFieldValue("searchName", value);
                setIsShowSuggest(true);
              }, [setFieldValue]);

              return (
                <Form className="w-full relative">
                  <Box className="flex bg-white rounded-sm shadow-md w-full py-5 px-8 gap-6">
                    <FormikField
                      name="searchName"
                      component={InputField}
                      variant="standard"
                      placeholder="Vị trí tuyển dụng, tên công ty"
                      value={values.searchName}
                      onChange={handleInputChange}
                      onFocus={() => setIsShowSuggest(true)}
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
                  </Box>
                  
                  {shouldShowSuggestions && (
                    <Box 
                      ref={suggestRef}
                      className="absolute top-[100%] left-0 w-full bg-white shadow-xl rounded-md border flex flex-col gap-5 z-10 p-5"
                    >
                      {suggests?.suggests?.length > 0 && (
                        <Box className="flex flex-col gap-2">
                          <Typography fontWeight={500} fontSize={"16px"}>
                            Gợi ý từ khóa
                          </Typography>
                          <Box>
                            {suggests?.suggests?.map((item) => (
                              <Box
                                key={item}
                                className="cursor-pointer hover:bg-[#F7F9FC] p-2 rounded-sm"
                                onClick={() => {
                                  handleSuggestionClick(item)(values);
                                }}
                              >
                                {item}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}
                      
                      {suggests?.jobs?.length > 0 && (
                        <Box className="flex flex-col gap-2">
                          <Typography fontWeight={500} fontSize={"16px"}>
                            Việc làm
                          </Typography>
                          <Box className="flex flex-col gap-3 mt-3">
                            {suggests?.jobs?.map((item) => (
                              <JobSuggestItem 
                                key={item?._id} 
                                data={item} 
                                onClick={() => setIsShowSuggest(false)}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}
                </Form>
              );
            }}
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
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <LoadingJob key={index} />
                  ))}
              </Box>
            ) : (
              <>
                {renderEmptyState()}
                {renderJobList}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

export default React.memo(FindJobPage);