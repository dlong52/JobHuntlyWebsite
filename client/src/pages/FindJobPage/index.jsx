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
const FindJobPage = () => {
  const query = useQueryParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterData = useMemo(() => {
    if (searchParams.size === 0) return {};
    return {
      title: query?.title,
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
  const { filters, handleChangePage, setFilters } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const { data, isLoading } = useGetAllPosts(filters);
  const { dataConvert: jobData } = useConvertData(data);
  useEffect(() => {
    const defaultFilters = {
      page: 1,
      limit: 10,
      sort: "desc",
    };
    const newFilters =
      searchParams.size === 0
        ? defaultFilters
        : { ...filters, ...filterData, page: 1 };

    if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
      setFilters(newFilters);
    }
  }, [filterData, searchParams, filters, setFilters]);

  return (
    <Fragment>
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
          <Formik
            initialValues={{ title: "", province: "" }}
            onSubmit={(values) => {
              const params = new URLSearchParams();
              if (values?.title) params.set("title", values?.title);
              if (values?.province?.label)
                params.set("location", values?.province?.label);

              if (searchParams.toString() !== params.toString()) {
                setSearchParams(params);
              }
            }}
          >
            {({}) => (
              <Form className="flex bg-white rounded-sm shadow-md w-full p-5 gap-6">
                <FormikField
                  name="title"
                  component={InputField}
                  variant={"standard"}
                  placeholder="Vị trí tuyển dụng, tên công ty"
                />
                <SelectProvinceField variant={"standard"} />
                <Button
                  type="submit"
                  sx={{
                    paddingX: 5,
                  }}
                  size="large"
                  className="!bg-primary !text-white !text-nowrap font-semibold px-8 rounded-sm hover:bg-blue-600 transition-all"
                >
                  Tìm kiếm
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
      <Box className=" bg-white relative">
        <Container className="grid grid-cols-12 py-6 gap-5">
          <Box className="col-span-3">
            <JobFilter
              setFilters={() => {
                setFilters({
                  page: 1,
                  limit: 10,
                  sort: "desc",
                });
              }}
            />
          </Box>
          <Box className="col-span-9">
            {isLoading ? (
              <Box>
                {Array(3)
                  .fill(null)
                  .map((_, index) => {
                    return <LoadingJob key={index} />;
                  })}
              </Box>
            ) : !jobData?.length && Object.keys(query).length !== 0 ? (
              <Box className="flex flex-col gap-2 items-center justify-center">
                <img src={mascot_empty} className="w-40" alt="" />
                <Typography fontSize={"14px"} className="text-neutrals-60">
                  Chưa tìm thấy việc làm phù hợp với yêu cầu của bạn. Bạn thử
                  xóa bộ lọc và tìm lại nhé.
                </Typography>
                <Button
                  onClick={() => {
                    setSearchParams("");
                    setFilters({ page: 1, limit: 10, sort: "desc" });
                  }}
                >
                  Xóa lọc
                </Button>
              </Box>
            ) : !jobData?.length ? (
              <Box className="flex flex-col gap-2 items-center justify-center">
                <img src={mascot_empty} className="w-40" alt="" />
                <Typography fontSize={"14px"} className="text-neutrals-60">
                  Không có việc làm nào đang tuyển dụng.
                </Typography>
              </Box>
            ) : (
              <Box className="flex flex-col gap-6">
                {jobData?.map((job) => (
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
                ))}
              </Box>
            )}
            {!!jobData?.length && (
              <Box className="w-full flex justify-end py-4">
                <PaginationMui
                  handleChangePage={handleChangePage}
                  page={filters.page}
                  totalPages={data?.data?.pagination?.totalPages}
                />
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

export default FindJobPage;
