import { Box, Container, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RouteBase } from "../../constants/routeUrl";
import { FormikField, InputField } from "../../components/CustomFieldsFormik";
import { Button, CommonIcon } from "../../ui";
import { company } from "../../assets/images";
import useFilters from "../../hooks/useFilters";
import { useGetAllCompanies } from "../../hooks/modules/company/useGetCompanies";
import CompanySearchItem from "./components/CompanySearchItem";
import PaginationMui from "../../ui/Pagination";

const CompanySearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");
  const { filters, setFilters, handleChangePage } = useFilters({
    page: 1,
    limit: 10,
    sort: "desc",
    name: keyword,
  });
  const { data, isLoading, refetch } = useGetAllCompanies(filters);
  const companies = useMemo(() => {
    if (data) {
      return data?.data?.data;
    }
    return [];
  }, [data]);
  return (
    <div>
      <Box className="h-[300px] bg-gradient-to-tr from-white to-primary-light">
        <Container className="flex justify-between h-full items-center">
          <Formik
            initialValues={{ keyword: keyword }}
            onSubmit={(values) => {
              navigate(`${RouteBase.CompanySearch}?keyword=${values.keyword}`);
              setFilters((prev) => ({
                ...prev,
                name: values.keyword,
              }));
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
                    Tìm kiếm thông tin công ty để JobHuntly kết nối bạn với
                    những cơ hội việc làm phù hợp nhất
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
      <Container className="p-5 bg-white rounded-md mt-5">
        <Typography fontSize={"16px"}>
          Tìm thấy{" "}
          <b className="text-primary">{data?.data?.pagination.total}</b> công ty
          phù hợp với yêu cầu của bạn
        </Typography>
        <div className="mt-5 flex flex-col gap-5">
          {companies?.map((item) => {
            return (
              <CompanySearchItem
                key={item?._id}
                logo={item?.logo}
                address={item?.address}
                name={item?.name}
                description={item?.description}
              />
            );
          })}
        </div>
        <Box className="flex justify-center mt-5">
          <PaginationMui
            handleChangePage={handleChangePage}
            page={filters.page}
            totalPages={data?.data?.pagination.totalPages}
          />
        </Box>
      </Container>
    </div>
  );
};

export default CompanySearchPage;
