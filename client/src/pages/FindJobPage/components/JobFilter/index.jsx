import { Box, Typography } from "@mui/material";
import React from "react";
import SelectCategoryField from "../../../../components/SelectField/SelectCategoryField";
import { Form, Formik } from "formik";
import {
  FormikField,
  RadioField,
} from "../../../../components/CustomFieldsFormik";
import { experienceOptions } from "../../../../constants/enum";
import RadioLevelField from "../../../../components/RadioField/RadioLevelField";
import RadioSalaryField from "../../../../components/RadioField/RadioSalaryField";
import RadioEmploymentTypeField from "../../../../components/RadioField/RadioEmploymentTypeField";
import { Button, CommonIcon } from "../../../../ui";

const JobFilter = ({ setFilters }) => {
  const initialValues = {
    experience: "all", 
    level: "all",
    salary: {
      min: null,
      max: null,
    },
    employment_type: "all",
  };
  return (
    <Formik initialValues={initialValues}>
      {({ values }) => {
        // setFilters();
        return (
          <Form className="flex flex-col gap-4 font-Epilogue">
            <div className="flex flex-col">
              <Box className="flex justify-between items-center border-b py-4">
                <Typography className="flex items-center gap-1 !text-xl !text-primary !font-semibold">
                  {/* <CommonIcon.FilterAltTwoTone /> */}
                  Lọc nâng cao
                </Typography>
                <Button
                  disabled
                  className="!bg-primary !text-white !capitalize !rounded-full !px-3"
                >
                  Xóa lọc
                </Button>
              </Box>
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
                <SelectCategoryField
                  size={"small"}
                  sx={{
                    fieldset: {
                      borderRadius: "10px",
                      backGroundColor: "#fff",
                    },
                  }}
                  className={"mt-2"}
                />
              </Box>
              <Box className="border-b py-4 border-dashed">
                <Typography fontSize={"14px"} fontWeight={600}>
                  Hình thức việc làm
                </Typography>
                <RadioEmploymentTypeField />
              </Box>
              {/* <FormikField
              name="experience"
              component={}
            /> */}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default JobFilter;
