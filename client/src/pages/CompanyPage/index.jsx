import React, { useMemo } from "react";
import { Button, CommonIcon } from "../../ui";
import { Box, Container, Typography } from "@mui/material";
import CompanyCardItem from "./components/CompanyCardItem";
import useFilters from "../../hooks/useFilters";
import { useGetAllCompanies } from "../../hooks/modules/company/useGetCompanies";
import { Form, Formik } from "formik";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { company } from "../../assets/images";
import { RouteBase } from "../../constants/routeUrl";
import { useNavigate } from "react-router-dom";
import CompanyCardItemSkeleton from "./components/CompanyCardItemSkeleton";

const CompanyPage = () => {
  const navigate = useNavigate();
  const { filters } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const { data, isLoading } = useGetAllCompanies(filters);
  const companies = useMemo(() => {
    if (data) {
      return data?.data?.data;
    }
    return [];
  }, [data]);

  return (
    <div className="bg-white pb-20">
      <Box className="h-[300px] bg-gradient-to-tr from-white to-primary-light">
        <Container className="flex justify-between h-full items-center">
          <Formik
            initialValues={{ keyword: "" }}
            onSubmit={(values) => {
              navigate(`${RouteBase.CompanySearch}?keyword=${values.keyword}`);
            }}
          >
            {({ values }) => (
              <Form className="flex flex-col gap-5">
                <Box>
                  <Typography
                    fontSize={"24px"}
                    fontWeight={500}
                    className="text-primary"
                  >
                    {" "}
                    Khám phá 100.000+ công ty nổi bật
                  </Typography>
                  <Typography>
                    Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất
                    dành cho bạn
                  </Typography>
                </Box>
                <Box className="flex items-center bg-white rounded-full pr-2 shadow">
                  <FormikField
                    name="keyword"
                    classNameContainer="bg-white rounded-full"
                    sx={{
                      fieldset: {
                        borderRadius: "9999px",
                        border: "none",
                      },
                    }}
                    component={InputField}
                    leftIcon={<CommonIcon.Search />}
                    placeholder="Nhập tên công ty mà bạn muốn tìm kiếm ..."
                  />
                  <Button
                    type={"submit"}
                    className="text-nowrap !bg-primary !text-white !rounded-full !px-5"
                  >
                    Tìm kiếm
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <img src={company} alt="" className="h-full" />
        </Container>
      </Box>
      <Box>
        <Typography
          className="text-center !my-5"
          fontSize={"24px"}
          fontWeight={500}
        >
          Danh sách các công ty nổi bật
        </Typography>
        <Container className="grid grid-cols-12 gap-5">
          {isLoading
            ? Array(4)
                .fill(null)
                .map((item) => {
                  return (
                    <Box
                      key={item?._id}
                      className="col-span-4 shadow rounded-md overflow-hidden"
                    >
                      <CompanyCardItemSkeleton />
                    </Box>
                  );
                })
            : companies?.map((item) => {
                return (
                  <Box
                    key={item?._id}
                    className="col-span-4 shadow rounded-md overflow-hidden bg-white"
                  >
                    <CompanyCardItem
                      id={item?._id}
                      cover={item?.cover}
                      avatar={item?.logo}
                      name={item?.name}
                      description={item?.description}
                    />
                  </Box>
                );
              })}
        </Container>
      </Box>
    </div>
  );
};

export default CompanyPage;
