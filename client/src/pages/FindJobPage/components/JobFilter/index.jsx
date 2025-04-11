import React, { memo, useEffect, useMemo, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useSearchParams } from "react-router-dom";
import {
  FormikField,
  RadioField,
} from "../../../../components/CustomFieldsFormik";
import RadioLevelField from "../../../../components/RadioField/RadioLevelField";
import RadioSalaryField from "../../../../components/RadioField/RadioSalaryField";
import RadioEmploymentTypeField from "../../../../components/RadioField/RadioEmploymentTypeField";
import { Button } from "../../../../ui";
import { experienceOptions } from "../../../../constants/enum";
import RadioCategoryField from "../../../../components/RadioField/RadioCategoryField";

const JobFilter = ({ setFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const filterBoxRef = useRef(null);

  const initialValues = useMemo(
    () => ({
      searchName: searchParams.get("searchName") || "",
      location: searchParams.get("location") || "",
      experience: searchParams.get("experience") || "",
      level: searchParams.get("level") || "",
      salary: JSON.stringify({ min: "", max: "" }),
      employment_type: searchParams.get("employment_type") || "",
      category: searchParams.get("category") || "",
    }),
    [searchParams]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (filterBoxRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = filterBoxRef.current;
        setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight - 20);
      }
    };

    const box = filterBoxRef.current;
    if (box) box.addEventListener("scroll", handleScroll);
    return () => box?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Formik initialValues={initialValues} enableReinitialize>
      {({ values, resetForm }) => {
        useEffect(() => {
          const params = new URLSearchParams(searchParams);
          
          const salary = values.salary ? JSON.parse(values.salary) : {};
          
          if (salary.min) {
            params.set("salaryMin", salary.min);
          } else {
            params.delete("salaryMin");
          }
          
          if (salary.max) {
            params.set("salaryMax", salary.max);
          } else {
            params.delete("salaryMax");
          }
          
          if (values?.experience) {
            params.set("experience", values.experience);
          } else {
            params.delete("experience");
          }
          
          if (values?.level) {
            params.set("level", values.level);
          } else {
            params.delete("level");
          }
          
          if (values?.category) {
            params.set("category", values.category);
          } else {
            params.delete("category");
          }
          
          if (values?.employment_type) {
            params.set("employment_type", values.employment_type);
          } else {
            params.delete("employment_type");
          }
          
          // Chỉ cập nhật URL nếu params thực sự thay đổi
          if (searchParams.toString() !== params.toString()) {
            setSearchParams(params);
          }
        }, [
          values.salary,
          values?.experience,
          values?.level,
          values?.category,
          values?.employment_type,
        ]);

        return (
          <Form className="flex flex-col gap-4 sticky top-header">
            <Box className="flex flex-col relative">
              <Box className="flex justify-between items-center border-b py-4">
                <Typography className="flex items-center gap-1 !text-xl !text-primary !font-semibold">
                  Lọc nâng cao
                </Typography>
                <Button
                  disabled={!searchParams.toString()}
                  className="!bg-primary !text-white !capitalize !rounded-full !px-3"
                  onClick={() => {
                    resetForm();
                    setSearchParams("");
                    setFilters();
                  }}
                >
                  Xóa lọc
                </Button>
              </Box>
              {/* Filter box */}
              <Box
                ref={filterBoxRef}
                className="flex flex-col max-h-[550px] overflow-auto relative"
                sx={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "transparent transparent",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                  },
                  "&:hover": {
                    scrollbarColor: "#c1c1c1 transparent",
                  },
                  "&:hover::-webkit-scrollbar-thumb": {
                    backgroundColor: "#c1c1c1",
                  },
                }}
              >
                <Box className="border-b py-4 border-dashed">
                  <Typography fontSize={"14px"} fontWeight={600}>
                    Kinh nghiệm
                  </Typography>
                  <FormikField
                    row
                    classNameLabel="text-neutrals-100 font-medium text-sm"
                    name="experience"
                    options={experienceOptions}
                    component={RadioField}
                  />
                </Box>
                <Box className="border-b py-4 border-dashed">
                  <Typography fontSize={"14px"} fontWeight={600}>
                    Cấp bậc
                  </Typography>
                  <RadioLevelField />
                </Box>
                <Box className="border-b py-4 border-dashed">
                  <Typography fontSize={"14px"} fontWeight={600}>
                    Mức lương
                  </Typography>
                  <RadioSalaryField />
                </Box>
                <Box className="border-b py-4 border-dashed">
                  <Typography fontSize={"14px"} fontWeight={600}>
                    Lĩnh vực công việc
                  </Typography>
                  <RadioCategoryField />
                </Box>
                <Box className="border-b py-4 border-dashed">
                  <Typography fontSize={"14px"} fontWeight={600}>
                    Hình thức việc làm
                  </Typography>
                  <RadioEmploymentTypeField />
                </Box>
              </Box>
              {/* Blur box - Ẩn khi cuộn gần hết */}
              {!isScrolledToBottom && (
                <div className="w-full absolute bottom-0 h-[100px] bg-gradient-to-t from-white to-transparent"></div>
              )}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default memo(JobFilter);
