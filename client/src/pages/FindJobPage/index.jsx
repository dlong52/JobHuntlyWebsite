import React, { Fragment } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";
import { lineBanner, Location, Search } from "../../assets/images";

import { FormikField, InputField, SelectField } from "../../components/CustomFieldsFormik";
import JobFilter from "./components/JobFilter";
import JobListItem from "./components/JobListItem";

const FindJobPage = () => {
  const jobs = [null, null, null, null, null, null, null, null, null];
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
              <Form className="flex bg-white rounded-sm shadow-md w-full p-4 gap-6">
                <FormikField
                  name="name"
                  component={InputField}
                  placeholder="Enter your name"
                  isFastField={false} 
                />
                <FormikField
                  name="name"
                  component={SelectField}
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                  ]}
                  placeholder="Enter your name"
                  isFastField={false} 
                />
                <Button
                sx={{
                  paddingX: 5,
                }}
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
            <JobFilter />
          </Box>
          <Box className="col-span-9 flex flex-col gap-6">
            {jobs?.map((job, index) => (
              <Link to={"/job/2"}>
                <JobListItem />
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

export default FindJobPage;
