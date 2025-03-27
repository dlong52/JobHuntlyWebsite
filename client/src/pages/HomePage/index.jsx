import React, { useMemo } from "react";
import { cpLogo, lineBanner, Location, Search, banner, bannerChild, flash } from "@/assets/images";
import { Link, useNavigate } from "react-router-dom";
import { CategoryItem } from "../../components";
import JobTrending from "../../components/JobTrending";
import { Button, CommonIcon } from "../../ui";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import SelectProvinceField from "../../components/SelectField/SelectProvinceField";
import { RouteBase } from "../../constants/routeUrl";
import useFilters from "../../hooks/useFilters";
import CategoryLoading from "../../ui/CategoryLoading";
import { useGetAllCategories } from "../../hooks/modules/category/useGetAllCategories";
import { useGetAllPosts } from "../../hooks/modules/post/useGetAllPosts";
import JobItemCard from "../../components/JobItemCard";
import { PACKAGE_CODE } from "../../constants/enum";
import { useConvertData } from "../../hooks";
import helpers from "../../utils/helpers";
import FadeInComponent from "../../components/FadeInComponent";
import { lazy, Suspense } from "react";

// Lazy load components for better performance
const LazyJobTrending = lazy(() => import("../../components/JobTrending"));

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  // Filters for categories
  const { filters } = useFilters({
    page: 1,
    limit: 8,
    sortBy: "job_count",
    sort: "desc",
  });

  // Filters for jobs
  const { filters: filtersJob } = useFilters({
    page: 1,
    limit: isTablet ? 4 : 8,
    status: true,
    package_code: PACKAGE_CODE.MAX_PLUS,
  });

  // Fetch data
  const { data, isLoading } = useGetAllCategories(filters);
  const { data: jobs, isLoading: jobLoading } = useGetAllPosts(filtersJob);
  const { dataConvert } = useConvertData(jobs);

  // Memoize categories data
  const categories = useMemo(() => {
    return data?.data || [];
  }, [data]);

  // Handle search form submission
  const handleSearchSubmit = (values) => {
    navigate(
      `${RouteBase.Job}?location=${values.province?.label || ''}&title=${values.position || ''}`
    );
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: isMobile ? 'center' : 'right',
          backgroundSize: isMobile ? 'cover' : 'contain',
        }}
        className="bg-no-repeat bg-neutrals-0 flex items-end"
        style={{ height: isMobile ? '500px' : '700px' }}
      >
        <Container
          className="relative flex flex-col gap-4 md:gap-6 justify-center bg-no-repeat bg-contain"
          style={{ 
            height: "calc(100% - 75px)",
            backgroundPosition: isMobile ? 'center' : 'right',
            backgroundSize: isMobile ? '200%' : 'contain',  
          }}
          sx={{
            backgroundImage: `url(${bannerChild})`,
          }}
        >
          <FadeInComponent>
            <h1 className="font-ClashDisplay font-semibold text-3xl md:text-5xl lg:text-[72px] text-neutrals-100 leading-tight">
              Khám phá
              <br /> hơn <br />
              <span className="text-accent-blue">5000+ Việc làm</span>
              <img src={lineBanner} alt="" className="max-w-full" />
            </h1>
          </FadeInComponent>
          
          <span className="max-w-[521px] text-neutrals-60 font-Epilogue text-sm md:text-base leading-6 md:leading-7">
            Nền tảng tuyệt vời cho người tìm việc đang tìm kiếm những đỉnh cao
            mới trong sự nghiệp và đam mê khởi nghiệp.
          </span>
          
          <Formik
            initialValues={{ position: "", province: { label: "" } }}
            onSubmit={handleSearchSubmit}
          >
            {() => (
              <Form className={`flex ${isMobile ? 'flex-col' : 'items-center'} bg-white rounded-sm shadow-lg ${isMobile ? 'w-full' : 'w-fit'} p-3 md:p-4 gap-3 md:gap-6`}>
                <Box className="flex items-center min-w-[150px] md:min-w-[300px] gap-2">
                  <img src={Search} alt="" className="w-5 md:w-auto" />
                  <FormikField
                    name="position"
                    variant="standard"
                    component={InputField}
                    placeholder="Vị trí tuyển dụng, tên công ty"
                  />
                </Box>
                
                <Box className="flex items-center min-w-[150px] md:min-w-[300px] gap-2">
                  <img src={Location} alt="" className="w-5 md:w-auto" />
                  <SelectProvinceField variant="standard" />
                </Box>
                
                <Button
                  type="submit"
                  size={isMobile ? "medium" : "large"}
                  className={`!bg-primary !text-white !text-nowrap font-semibold ${isMobile ? 'w-full px-4' : 'px-8'} rounded-sm hover:bg-blue-600 transition-all`}
                >
                  Tìm kiếm
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>

      {/* Top Jobs Section */}
      <Container className="container mx-auto pt-8 md:pt-14">
        <Box className="flex items-center justify-between pb-4 md:pb-8">
          <h1 className="font-ClashDisplay font-semibold text-xl md:text-3xl flex gap-2 md:gap-3 items-center text-neutrals-100">
            <span>
              Tin tuyển dụng, việc làm{" "}
              <span className="text-accent-blue"> tốt nhất</span>
            </span>
          </h1>
          
          <Link
            to={RouteBase.Job}
            className="font-semibold text-sm md:text-base text-primary flex items-center gap-1"
          >
            Hiển thị tất cả{" "}
            <CommonIcon.ArrowForwardRounded className="w-4 md:w-5 font-semibold" />
          </Link>
        </Box>
        
        {!isLoading ? (
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {dataConvert?.map((item, index) => (
              <Box key={index}>
                <JobItemCard data={item} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array(isMobile ? 4 : isTablet ? 6 : 8)
              .fill(null)
              .map((_, index) => (
                <Box
                  key={index}
                  className="border rounded-sm overflow-hidden"
                >
                  <CategoryLoading />
                </Box>
              ))}
          </Box>
        )}
      </Container>

      {/* Job Trending Section */}
      <Container className="pt-10">
        <FadeInComponent>
          <Suspense fallback={<div className="h-40 flex items-center justify-center">Đang tải...</div>}>
            <LazyJobTrending />
          </Suspense>
        </FadeInComponent>
      </Container>

      {/* Categories Section */}
      <Container className="container mx-auto pt-8 md:pt-14">
        <Box className="flex items-center justify-between pb-4 md:pb-8">
          <h1 className="font-ClashDisplay font-semibold text-xl md:text-3xl text-neutrals-100">
            Khám phá theo <span className="text-accent-blue"> ngành nghề</span>
          </h1>
          
          <Link
            to={RouteBase.Job}
            className="font-semibold text-sm md:text-base text-primary flex items-center gap-1"
          >
            Hiển thị tất cả{" "}
            <CommonIcon.ArrowForwardRounded className="w-4 md:w-5 font-semibold" />
          </Link>
        </Box>
        
        {!isLoading ? (
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories?.map((category) => (
              <Link
                key={category._id || index}
                to={`${RouteBase.Job}?category=${category._id}`}
                className="border rounded-sm overflow-hidden"
              >
                <CategoryItem loading={isLoading} data={category} />
              </Link>
            ))}
          </Box>
        ) : (
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array(isMobile ? 4 : 8)
              .fill(null)
              .map((_, index) => (
                <Box
                  key={index}
                  className="border rounded-sm overflow-hidden"
                >
                  <CategoryLoading />
                </Box>
              ))}
          </Box>
        )}
      </Container>

      {/* Featured Jobs Section */}
      <Box className="bg-white rounded-t-3xl bg-no-repeat bg-contain bg-right">
        <Container className="py-6 md:py-10 mt-4">
          <Box className="flex items-center justify-between pb-4 md:pb-8">
            <h1 className="font-ClashDisplay font-semibold text-xl md:text-3xl text-neutrals-100">
              Các việc làm <span className="text-accent-blue"> nổi bật</span>
            </h1>
            
            <Link className="font-semibold text-sm md:text-base text-primary flex items-center gap-1">
              Hiển thị tất cả{" "}
              <CommonIcon.ArrowForwardRounded className="w-4 md:w-5 font-semibold" />
            </Link>
          </Box>
          
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {dataConvert?.map((item, index) => (
              <Link
                key={item?._id || index}
                to={`${RouteBase.Job}/${item?._id}`}
              >
                <Box className="p-3 md:p-5 flex flex-col gap-3 md:gap-5 border rounded-sm hover:shadow-lg hover:border-primary bg-slate-100 transition-all duration-200 overflow-hidden h-full">
                  <Box className="flex justify-between items-center">
                    <img src={cpLogo} alt="" className="w-6 md:w-8" />
                    <span className="px-2 md:px-4 py-1 rounded-full text-xs md:text-sm border font-medium bg-[#4540de11] text-primary whitespace-nowrap">
                      {helpers.convertSalary(
                        item?.salary?.min,
                        item?.salary?.max
                      )}
                    </span>
                  </Box>
                  
                  <Box className="flex flex-col">
                    <span className="font-semibold truncate text-sm md:text-base">
                      {item?.title}
                    </span>
                    <span className="text-neutrals-60 truncate text-xs md:text-sm">
                      {item?.company?.name}
                    </span>
                    <span className="font-medium text-neutrals-100 text-xs md:text-sm">
                      {item?.location?.province?.name}
                    </span>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;