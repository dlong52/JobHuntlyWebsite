import React, { Fragment } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Box, Button, Container, Pagination } from "@mui/material";
import { lineBanner } from "../../assets/images";

import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import JobFilter from "./components/JobFilter";
import JobListItem from "./components/JobListItem";
import { useGetAllPosts } from "../../hooks/modules/post/useGetAllPosts";
import useFilters from "../../hooks/useFilters";
import { RouteBase } from "../../constants/routeUrl";
import SelectProvinceField from "../../components/SelectField/SelectProvinceField";
import { makeStyles } from "@mui/styles";
const FindJobPage = () => {
  const useStyles = makeStyles((theme) => ({
    Pagination: {
      padding: 15,
      display: "flex",
      justifyContent: "center",
      width: "fit-content",
      "& ul": {
        "& li": {
          "& .MuiPaginationItem-root": {},
          "& .Mui-selected": {
            backgroundColor: "var(--primary)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "var(--primary-light)",
            },
          },
        },
      },
    },
  }));
  const classes = useStyles();
  const { filters, handleChangePage, setFilters } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const { data } = useGetAllPosts(filters);
  const jobData = data?.data?.data;

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
            initialValues={{ name: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex bg-white rounded-sm shadow-md w-full p-5 gap-6">
                <FormikField
                  name="name"
                  component={InputField}
                  variant={"standard"}
                  placeholder="Vị trí tuyển dụng, tên công ty"
                />
                <SelectProvinceField variant={"standard"} />
                <Button
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
      <Box className=" bg-white">
        <Container className="grid grid-cols-12 py-6 gap-5">
          <Box className="col-span-3">
            <JobFilter setFilters={setFilters} />
          </Box>
          <Box className="col-span-9 flex flex-col gap-6">
            {jobData?.map((job) => (
              <JobListItem
                key={job._id}
                id={job._id}
                title={job?.title}
                salary={job?.salary}
                company={job?.company}
                logo={job?.company?.logo}
                posted_by={job?.posted_by}
              />
            ))}
            <Box className="w-full flex justify-end py-4">
              <Pagination
                className={classes.Pagination}
                color="secondary"
                count={data?.data?.pagination.totalPages}
                onChange={handleChangePage}
                page={filters.page}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

export default FindJobPage;
