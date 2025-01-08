import { Box, Container } from "@mui/material";
import React from "react";
import CvTemplate2 from "../../components/CVModel/CvTemplate2";
import FormikField from "../../components/CustomFieldsFormik/FormikField";
import InputField from "../../components/CustomFieldsFormik/InputField";
import { Form, Formik } from "formik";
import { initialValues } from "./formik/initialvalues";
import { Button, CommonIcon } from "../../ui";

const CreateCVPage = () => {
  return (
    <Box>
      <Box className="flex flex-col gap-5">
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {({ values, errors, touched }) => {
            return (
              <>
                <Box className="bg-white border-t">
                  <Form className="container mx-auto flex justify-between items-center py-5">
                    <FormikField
                      name="nameCv"
                      component={InputField}
                      className="w-fit"
                      label="CV chưa đặt tên"
                    />
                    <Box className="flex flex-nowrap gap-5 w-fit">
                      <Button
                        startIcon={<CommonIcon.VisibilityOutlined />}
                        className="text-nowrap h-fit"
                        // variant="outlined"
                        sx={{
                          // border: "1px solid var(--primary)",
                          backgroundColor: "var(--primary-light)",
                          color: "var(--primary)",
                          textTransform: "capitalize",
                          paddingX: "20px",
                          paddingY: "10px",
                        }}
                      >
                        Xem trước
                      </Button>
                      <Button
                        startIcon={<CommonIcon.VerticalAlignBottomRounded />}
                        className="text-nowrap h-fit"
                        // variant="outlined"
                        sx={{
                          // border: "1px solid var(--primary)",
                          backgroundColor: "var(--primary-light)",
                          color: "var(--primary)",
                          textTransform: "capitalize",
                          paddingX: "20px",
                          paddingY: "10px",
                        }}
                      >
                        Lưu và tải xuống
                      </Button>
                      <Button
                        startIcon={<CommonIcon.Save />}
                        className="text-nowrap !text-white h-fit"
                        sx={{
                          backgroundColor: "var(--primary)",
                          textTransform: "capitalize",
                          paddingX: "20px",
                          paddingY: "10px",
                        }}
                      >
                        Lưu lại
                      </Button>
                    </Box>
                  </Form>
                </Box>
                <Box className="">
                  <CvTemplate2 />
                </Box>
              </>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateCVPage;
