import React, { useMemo } from "react";
import { cpLogo, lineBanner, Location, Search } from "@/assets/images";
import { Link, useNavigate } from "react-router-dom";
import { CategoryItem } from "../../components";
import JobTrending from "../../components/JobTrending";
import { Button, CommonIcon } from "../../ui";
import { Box, Container } from "@mui/material";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import SelectProvinceField from "../../components/SelectField/SelectProvinceField";
import { requestForToken } from "../../../firebaseConfig";
import { useGetAllCategories } from "../../hooks/modules/category/useGetAllCategories";
import { RouteBase } from "../../constants/routeUrl";
import useFilters from "../../hooks/useFilters";
import CategoryLoading from "../../ui/CategoryLoading";
import { banner, bannerChild } from "../../assets/images";
const HomePage = () => {
  const navigate = useNavigate();
  const { filters } = useFilters({
    page: 1,
    limit: 8,
    sort: "desc",
  });
  const { data, isLoading } = useGetAllCategories(filters);
  const categories = useMemo(() => {
    if (data) {
      return data?.data;
    }
    return [];
  }, [data]);
  return (
    <Box className="">
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
        }}
        className="bg-banner bg-no-repeat bg-contain bg-right h-[700px] bg-neutrals-0 flex items-end"
      >
        <Container
          className="relative flex flex-col gap-6 justify-center bg-no-repeat bg-contain bg-right"
          style={{ height: "calc(100% - 75px)" }}
          sx={{
            backgroundImage: `url(${bannerChild})`,
          }}
        >
          <Box className="">
            <h1 className="font-ClashDisplay font-semibold text-[72px] text-neutrals-100 leading-tight">
              Discover
              <br /> more than <br />
              <span className="text-accent-blue">5000+ Jobs</span>
              <img src={lineBanner} alt="" />
            </h1>
          </Box>
          <span
            onClick={requestForToken}
            className="max-w-[521px] text-neutrals-60 font-Epilogue text-[16px] leading-7"
          >
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </span>
          <Formik
            initialValues={{ name: "" }}
            onSubmit={(values) => {
              navigate(
                `${RouteBase.Job}?location=${values.province.label}&title=${values.position}`
              );
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex items-center bg-white rounded-sm shadow-lg w-fit p-4 gap-6">
                <Box className="flex items-center min-w-[300px] gap-2">
                  <img src={Search} alt="" />
                  <FormikField
                    name="position"
                    variant={"standard"}
                    component={InputField}
                    placeholder="Vị trí tuyển dụng, tên công ty"
                  />
                </Box>
                <Box className="flex items-center min-w-[300px] gap-2">
                  <img src={Location} alt="" />
                  <SelectProvinceField variant={"standard"} />
                </Box>
                <Button
                  type={"submit"}
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
      <Container className="container mx-auto pt-14">
        <Box className="flex items-center justify-between pb-8">
          <h1 className="font-ClashDisplay font-semibold text-3xl text-neutrals-100">
            Khám phá theo <span className="text-accent-blue"> ngành nghề</span>
          </h1>
          <Link
            to={RouteBase.Job}
            className="font-semibold text-[16px] text-primary flex items-center gap-1"
          >
            Hiển thị tất cả{" "}
            <CommonIcon.ArrowForwardRounded className="w-5 font-semibold" />
          </Link>
        </Box>
        {!isLoading ? (
          <Box className="grid grid-cols-12 gap-6">
            {categories?.map((category, index) => {
              return (
                <Link
                  key={categories?._id}
                  to={`${RouteBase.Job}?category=${category._id}`}
                  className="col-span-3 border rounded-sm overflow-hidden"
                >
                  <CategoryItem loading={isLoading} data={category} />
                </Link>
              );
            })}
          </Box>
        ) : (
          <Box className="grid grid-cols-12 gap-6">
            {Array(8)
              .fill(null)
              .map((_, index) => {
                return (
                  <Box
                    key={index}
                    className="col-span-3 border rounded-sm overflow-hidden"
                  >
                    <CategoryLoading />
                  </Box>
                );
              })}
          </Box>
        )}
      </Container>
      <Container className="pt-10">
        <JobTrending />
      </Container>
      <Container className="py-14">
        <Box className="flex items-center justify-between pb-8">
          <h1 className="font-ClashDisplay font-semibold text-3xl text-neutrals-100">
            Các việc làm <span className="text-accent-blue"> nổi bật</span>
          </h1>
          <Link className="font-semibold text-[16px] text-primary flex items-center gap-1">
            Hiển thị tất cả{" "}
            <CommonIcon.ArrowForwardRounded className="w-5 font-semibold" />
          </Link>
        </Box>
        <Box className="grid grid-cols-12 gap-6">
          {categories?.map((category, index) => (
            <Link
              key={index}
              to={"/"}
              className="col-span-3 border rounded-sm hover:shadow-lg hover:border-primary transition-all duration-200 overflow-hidden"
            >
              <Box className="p-5 flex flex-col gap-5">
                <Box className="flex justify-between items-center">
                  <img src={cpLogo} alt="" className="w-8" />
                  <span className="px-4 py-1 rounded-full text-sm border font-medium bg-[#4540de11] text-primary">
                    Thỏa thuận
                  </span>
                </Box>
                <Box className="flex flex-col">
                  <span className="font-semibold">Front End Developer</span>
                  <span className="text-neutrals-60">Next Level Solution</span>
                  <span className="font-medium text-neutrals-100">Hà Nội</span>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
