import React, {
  useMemo,
  lazy,
  Suspense,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";

// Assets and constants
import {
  cpLogo,
  lineBanner,
  Location,
  Search,
  banner,
  bannerChild,
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
import { useGetSuggest } from "../../hooks/modules/search/useGetSuggest";
import JobSuggestItem from "../FindJobPage/components/JobSuggestItem";
import { recuiment } from "../../assets/images";

// Lazy loaded components
const LazyJobTrending = lazy(() => import("../../components/JobTrending"));

// Custom hooks
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
        <Box key={index} className="border rounded-sm overflow-hidden">
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  // Search suggestion state
  const [isShowSuggest, setIsShowSuggest] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const debouncedSearchValue = useDebounce(searchInputValue, 300);
  const suggestRef = useRef(null);

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

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllCategories(categoryFilters);
  const { data: jobsData, isLoading: jobsLoading } = useGetAllPosts(jobFilters);
  const { dataConvert: jobs } = useConvertData(jobsData);

  const { filters: querySuggest, setFilters: setFilterSuggest } = useFilters({
    query: "",
  });

  const { data: suggestData } = useGetSuggest(querySuggest);
  const { dataConvert: suggests } = useConvertData(suggestData);

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

  // Memoize data to prevent unnecessary re-renders
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );

  // Determine if suggestions should be shown
  const shouldShowSuggestions = useMemo(() => {
    return (
      isShowSuggest &&
      searchInputValue.length > 0 &&
      (suggests?.suggests?.length > 0 || suggests?.jobs?.length > 0)
    );
  }, [isShowSuggest, searchInputValue, suggests]);

  const handleSearchSubmit = (values) => {
    const queryParams = new URLSearchParams();
    if (values.province?.label)
      queryParams.append("location", values.province.label);
    if (values.searchName) queryParams.append("searchName", values.searchName);

    navigate(`${RouteBase.Job}?${queryParams.toString()}`);
    setIsShowSuggest(false);
  };

  // Handle suggestion item click
  const handleSuggestionClick = useCallback(
    (item) => {
      return (values) => {
        setSearchInputValue(item);
        const queryParams = new URLSearchParams();
        queryParams.append("searchName", item);
        if (values.province?.label) {
          queryParams.append("location", values.province.label);
        }

        navigate(`${RouteBase.Job}?${queryParams.toString()}`);
        setIsShowSuggest(false);
      };
    },
    [navigate]
  );

  // Responsive grid column configurations
  const jobGridColumns =
    "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  const categoryGridColumns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  // Loading count by viewport
  const loadingCount = isMobile ? 4 : isTablet ? 6 : 8;

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: isMobile ? "center" : "right",
          backgroundSize: isMobile ? "cover" : "contain",
          height: isMobile ? "500px" : "700px",
        }}
        className="bg-no-repeat bg-neutrals-0 flex items-end"
      >
        <Container
          className="relative flex flex-col gap-4 md:gap-6 justify-center bg-no-repeat bg-contain"
          sx={{
            backgroundImage: `url(${bannerChild})`,
            height: "calc(100% - 75px)",
            backgroundPosition: isMobile ? "center" : "right",
            backgroundSize: isMobile ? "200%" : "contain",
          }}
        >
          {/* <FadeInComponent> */}
          <h1
            data-aos="fade-down"
            className="font-ClashDisplay font-bold text-3xl md:text-5xl lg:text-[72px] text-neutrals-100 !leading-[80px]"
          >
            Khám phá
            <br /> hơn <br />
            <span className="text-accent-blue">5000+ Việc làm</span>
            <img src={lineBanner} alt="" className="max-w-full" />
          </h1>
          {/* </FadeInComponent> */}

          <span
            data-aos="fade-down"
            className="max-w-[521px] text-neutrals-60 font-Epilogue text-sm md:text-base leading-6 md:leading-7"
          >
            Nền tảng tuyệt vời cho người tìm việc đang tìm kiếm những đỉnh cao
            mới trong sự nghiệp và đam mê khởi nghiệp.
          </span>

          <Formik
            initialValues={{ searchName: "", province: "" }}
            onSubmit={handleSearchSubmit}
          >
            {({ values, setFieldValue }) => {
              // Memoize input change handler to avoid recreation on each render
              const handleInputChange = useCallback(
                (e) => {
                  const value = e.target.value;
                  setSearchInputValue(value);
                  setFieldValue("searchName", value);
                  setIsShowSuggest(true);
                },
                [setFieldValue]
              );

              return (
                <div data-aos="fade-up" className="w-fit relative z-20">
                  <Form
                    className={`flex ${
                      isMobile ? "flex-col" : "items-center"
                    } bg-white rounded-sm shadow-lg ${
                      isMobile ? "w-full" : "w-fit"
                    } p-3 md:p-4 gap-3 md:gap-6`}
                  >
                    <Box className="flex items-center min-w-[150px] md:min-w-[350px] gap-2">
                      <img src={Search} alt="" className="w-5 md:w-auto" />
                      <FormikField
                        name="searchName"
                        variant="standard"
                        component={InputField}
                        placeholder="Vị trí tuyển dụng, tên công ty"
                        value={values.searchName}
                        onChange={handleInputChange}
                        onFocus={() => setIsShowSuggest(true)}
                      />
                    </Box>

                    <Box className="flex items-center min-w-[150px] md:min-w-[350px] gap-2">
                      <img src={Location} alt="" className="w-5 md:w-auto" />
                      <SelectProvinceField variant="standard" />
                    </Box>

                    <Button
                      type="submit"
                      size={isMobile ? "medium" : "large"}
                      className={`!bg-primary !text-white !text-nowrap font-semibold ${
                        isMobile ? "w-full px-4" : "px-8"
                      } rounded-sm hover:bg-blue-600 transition-all`}
                    >
                      Tìm kiếm
                    </Button>
                  </Form>

                  {shouldShowSuggestions && (
                    <Box
                      ref={suggestRef}
                      className="absolute top-[100%] left-0 w-full bg-white shadow-xl rounded-md border flex flex-col gap-5 z-40 p-5"
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
                </div>
              );
            }}
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
          <Suspense
            fallback={
              <div className="h-40 flex items-center justify-center">
                Đang tải...
              </div>
            }
          >
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
      <Box className="bg-white rounded-t-3xl bg-no-repeat bg-contain bg-right">
        {/* <Container className="py-6 md:py-10 mt-4">
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
        </Container> */}
        <div className="bg-gradient-to-tr from-primary-dark to-primary rounded-t-3xl mt-20 py-20 text-white">
          <Container className=" grid grid-cols-12">
            <div className="col-span-6 flex flex-col justify-center">
              <div className="flex flex-col gap-2">
                <Typography fontSize={"40px"} fontWeight={700}>
                  Bạn là nhà tuyển dụng ?
                </Typography>
                <Typography fontSize={"14px"} className="text-[#ffffffc5]">
                  Trải nghiệm nền tảng tuyển dụng thông minh giúp kết nối với
                  ứng viên tiềm năng nhanh chóng và hiệu quả.
                </Typography>
                {/* <Typography fontSize={"14px"} className="text-[#ffffffc5]">
                  JobHuntly cung cấp công cụ toàn diện để đăng tuyển, sàng lọc
                  và quản lý ứng viên một cách chuyên nghiệp.
                </Typography> */}
                <div className="flex items-center gap-3 mt-5">
                  <Button
                    size={"large"}
                    className={
                      "!bg-white !normal-case !text-neutrals-100 !px-10"
                    }
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    size={"large"}
                    className={"!bg-primary !normal-case !text-white !px-10"}
                  >
                    Đăng kí
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-12 mt-5 gap-4">
                <Typography fontSize={"14px"} className="col-span-12">
                  Tại sao chọn JobHuntly?
                </Typography>
                <div className="flex items-start gap-3 col-span-6">
                  <CommonIcon.Addchart className="text-purple-300 h-6 w-6 mt-[2px]" />
                  <div>
                    <Typography
                      fontWeight={500}
                      fontSize={"14px"}
                      className="text-white"
                    >
                      Tiếp cận 10,000+ ứng viên
                    </Typography>
                    <Typography
                      fontWeight={400}
                      fontSize={"14px"}
                      className="text-purple-200 text-sm"
                    >
                      Kết nối với nhân tài từ mọi ngành nghề
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3 col-span-6">
                  <CommonIcon.Addchart className="text-purple-300 h-6 w-6 mt-[2px]" />
                  <div>
                    <Typography
                      fontWeight={500}
                      fontSize={"14px"}
                      className="text-white"
                    >
                      Công cụ tìm kiếm thông minh
                    </Typography>
                    <Typography
                      fontWeight={400}
                      fontSize={"14px"}
                      className="text-purple-200 text-sm"
                    >
                      Lọc ứng viên phù hợp với yêu cầu
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3 col-span-6">
                  <CommonIcon.Addchart className="text-purple-300 h-6 w-6 mt-[2px]" />
                  <div>
                    <Typography
                      fontWeight={500}
                      fontSize={"14px"}
                      className="text-white"
                    >
                      Quản lý ứng viên dễ dàng
                    </Typography>
                    <Typography
                      fontWeight={400}
                      fontSize={"14px"}
                      className="text-purple-200 text-sm"
                    >
                      Theo dõi và đánh giá quy trình tuyển dụng
                    </Typography>
                  </div>
                </div>
                <div className="flex items-start gap-3 col-span-6">
                  <CommonIcon.Addchart className="text-purple-300 h-6 w-6 mt-[2px]" />
                  <div>
                    <Typography
                      fontWeight={500}
                      fontSize={"14px"}
                      className="text-white"
                    >
                      Báo cáo chi tiết
                    </Typography>
                    <Typography
                      fontWeight={400}
                      fontSize={"14px"}
                      className="text-purple-200 text-sm"
                    >
                      Phân tích hiệu quả chiến dịch tuyển dụng
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6 overflow-hidden flex justify-center">
              <img
                src={recuiment}
                style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70% " }}
                className="w-3/5 aspect-square object-cover"
                alt=""
              />
            </div>
          </Container>
        </div>
      </Box>
    </>
  );
};

export default HomePage;
