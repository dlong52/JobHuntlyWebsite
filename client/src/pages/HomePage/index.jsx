import React, { useMemo, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { Form, Formik } from "formik";

// Assets and constants
import {
  cpLogo, lineBanner, Location, Search,
  banner, bannerChild, flash
} from "@/assets/images";
import { RouteBase } from "../../constants/routeUrl";
import { PACKAGE_CODE } from "../../constants/enum";

// Components
import { CategoryItem } from "../../components";
import { Button, CommonIcon } from "../../ui";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import SelectProvinceField from "../../components/SelectField/SelectProvinceField";
import CategoryLoading from "../../ui/CategoryLoading";
import JobItemCard from "../../components/JobItemCard";
import FadeInComponent from "../../components/FadeInComponent";

// Hooks
import useFilters from "../../hooks/useFilters";
import { useGetAllCategories } from "../../hooks/modules/category/useGetAllCategories";
import { useGetAllPosts } from "../../hooks/modules/post/useGetAllPosts";
import { useConvertData } from "../../hooks";
import helpers from "../../utils/helpers";

// Lazy loaded components
const LazyJobTrending = lazy(() => import("../../components/JobTrending"));

// Reusable components for better organization
const SectionHeader = ({ title, highlightedText, linkTo }) => (
  <Box className="flex items-center justify-between pb-4 md:pb-8">
    <h1 className="font-ClashDisplay font-semibold text-xl md:text-3xl text-neutrals-100">
      {title} <span className="text-accent-blue">{highlightedText}</span>
    </h1>

    {linkTo && (
      <Link
        to={linkTo}
        className="font-semibold text-sm md:text-base text-primary flex items-center gap-1"
      >
        Hiển thị tất cả{" "}
        <CommonIcon.ArrowForwardRounded className="w-4 md:w-5 font-semibold" />
      </Link>
    )}
  </Box>
);

const LoadingGrid = ({ count, columns }) => (
  <Box className={`grid ${columns} gap-4 md:gap-6`}>
    {Array(count)
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
);

const FeaturedJobCard = ({ item }) => (
  <Box className="p-3 md:p-5 flex flex-col gap-3 md:gap-5 border rounded-sm hover:shadow-lg hover:border-primary bg-slate-100 transition-all duration-200 overflow-hidden h-full">
    <Box className="flex justify-between items-center">
      <img src={cpLogo} alt="" className="w-6 md:w-8" />
      <span className="px-2 md:px-4 py-1 rounded-full text-xs md:text-sm border font-medium bg-[#4540de11] text-primary whitespace-nowrap">
        {helpers.convertSalary(item?.salary?.min, item?.salary?.max)}
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
);

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  // Consolidated state and data fetching
  const { filters: categoryFilters } = useFilters({
    page: 1,
    limit: 8,
    sortBy: "job_count",
    sort: "desc",
  });

  const { filters: jobFilters } = useFilters({
    page: 1,
    limit: isTablet ? 4 : 8,
    status: "approve",
    package_code: PACKAGE_CODE.MAX_PLUS,
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategories(categoryFilters);
  const { data: jobsData, isLoading: jobsLoading } = useGetAllPosts(jobFilters);
  const { dataConvert: jobs } = useConvertData(jobsData);

  // Memoize data to prevent unnecessary re-renders
  const categories = useMemo(() => categoriesData?.data || [], [categoriesData]);

  const handleSearchSubmit = (values) => {
    const queryParams = new URLSearchParams();
    if (values.province?.label) queryParams.append('location', values.province.label);
    if (values.searchName) queryParams.append('searchName', values.searchName);

    window.location.href = (`${RouteBase.Job}?${queryParams.toString()}`);
  };

  // Responsive grid column configurations
  const jobGridColumns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  const categoryGridColumns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  // Loading count by viewport
  const loadingCount = isMobile ? 4 : isTablet ? 6 : 8;

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: isMobile ? 'center' : 'right',
          backgroundSize: isMobile ? 'cover' : 'contain',
          height: isMobile ? '500px' : '700px'
        }}
        className="bg-no-repeat bg-neutrals-0 flex items-end"
      >
        <Container
          className="relative flex flex-col gap-4 md:gap-6 justify-center bg-no-repeat bg-contain"
          sx={{
            backgroundImage: `url(${bannerChild})`,
            height: "calc(100% - 75px)",
            backgroundPosition: isMobile ? 'center' : 'right',
            backgroundSize: isMobile ? '200%' : 'contain',
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
            initialValues={{ searchName: "", province: { label: "" } }}
            onSubmit={handleSearchSubmit}
          >
            {() => (
              <Form className={`flex ${isMobile ? 'flex-col' : 'items-center'} bg-white rounded-sm shadow-lg ${isMobile ? 'w-full' : 'w-fit'} p-3 md:p-4 gap-3 md:gap-6`}>
                <Box className="flex items-center min-w-[150px] md:min-w-[300px] gap-2">
                  <img src={Search} alt="" className="w-5 md:w-auto" />
                  <FormikField
                    name="searchName"
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
        <SectionHeader
          title="Tin tuyển dụng, việc làm"
          highlightedText="tốt nhất"
          linkTo={RouteBase.Job}
        />

        {!jobsLoading ? (
          <Box className={`grid ${jobGridColumns} gap-4 md:gap-6`}>
            {jobs?.map((item, index) => (
              <Box key={item?._id || `job-${index}`}>
                <JobItemCard data={item} />
              </Box>
            ))}
          </Box>
        ) : (
          <LoadingGrid count={loadingCount} columns={jobGridColumns} />
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
        <SectionHeader
          title="Khám phá theo"
          highlightedText="ngành nghề"
          linkTo={RouteBase.Job}
        />

        {!categoriesLoading ? (
          <Box className={`grid ${categoryGridColumns} gap-4 md:gap-6`}>
            {categories?.map((category, index) => (
              <a
                key={category._id || `category-${index}`}
                href={`${RouteBase.Job}?category=${category._id}`}
                className=""
              >
                <CategoryItem loading={false} data={category} />
              </a>
            ))}
          </Box>
        ) : (
          <LoadingGrid count={isMobile ? 4 : 8} columns={categoryGridColumns} />
        )}
      </Container>

      {/* Featured Jobs Section */}
      <Box className="bg-white rounded-t-3xl bg-no-repeat bg-contain bg-right pb-10">
        <Container className="py-6 md:py-10 mt-4">
          <SectionHeader
            title="Các việc làm"
            highlightedText="nổi bật"
            linkTo={RouteBase.Job}
          />

          <Box className={`grid ${jobGridColumns} gap-4 md:gap-6`}>
            {jobs?.map((item, index) => (
              <Link
                key={item?._id || `featured-${index}`}
                to={`${RouteBase.Job}/${item?._id}`}
              >
                <FeaturedJobCard item={item} />
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;