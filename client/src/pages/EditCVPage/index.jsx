import { Box, Container, Skeleton } from "@mui/material";
import * as Yup from "yup";
import React, { useRef, useState } from "react";
import FormikField from "../../components/CustomFieldsFormik/FormikField";
import InputField from "../../components/CustomFieldsFormik/InputField";
import { Form, Formik } from "formik";
import { Button, CommonIcon } from "../../ui";
import useToggleDialog from "../../hooks/useToggleDialog";
import { useParams } from "react-router-dom";
import { useGetCvTheme } from "../../hooks/modules/cv_theme/userGetCvTheme";
import { useConvertData } from "../../hooks";
import DialogMUI from "../../components/Dialogs";
import CVTemplate from "./components/CvTemplate";
import EditCvForm from "./components/EditCvForm";
import { useSelector } from "react-redux";
import { useNotifications } from "../../utils/notifications";
import { CVService } from "../../services/CvServices";
import { useGetCv } from "../../hooks/modules/cv/useGetCv";
import helpers from "../../utils/helpers";
const EditCVPage = () => {
  const targetRef = useRef();
  const user = useSelector((state) => state.user);
  const { showError, showInfo, showSuccess } = useNotifications();
  const { id, cv_id } = useParams();

  const { data, isLoading } = useGetCvTheme(id, { enabled: !!id });
  const { data: detailData, isLoadingDetailData } = useGetCv(cv_id, {
    enabled: !!cv_id,
  });
  const { dataConvert } = useConvertData(data);
  const { dataConvert: cvDetail } = useConvertData(detailData);
  const [cvData, setCvData] = useState(null);
  const { open, shouldRender, toggle } = useToggleDialog();

  const onChange = (values) => {
    setCvData(values);
  };
  const handleSave = async (values) => {
    const payload = {
      id: cv_id,
      cv_name: values?.cv_name,
      profile: cvData?.profile,
      position: cvData?.position,
      objective: cvData?.objective,
      work_experiences: cvData?.work_experiences,
      projects: cvData?.projects,
      education: cvData?.education,
      skills: cvData?.skills,
      interests: cvData?.interests,
      certifications: cvData?.certifications,
      honors_awards: cvData?.honors_awards,
    };
    try {
      if (!user?.user_id) {
        showInfo("Bạn cần đăng nhập để sử dụng chức năng này!");
        return;
      }
      await CVService.updateCV(payload);
      showSuccess("CV của bạn đã được cập nhật");
    } catch (error) {
      showError(error);
    }
  };
  const handleSubmit = async (values) => {
    const payload = {
      id: cv_id,
      cv_name: values?.cv_name,
      profile: cvData?.profile,
      position: cvData?.position,
      objective: cvData?.objective,
      work_experiences: cvData?.work_experiences,
      projects: cvData?.projects,
      education: cvData?.education,
      skills: cvData?.skills,
      interests: cvData?.interests,
      certifications: cvData?.certifications,
      honors_awards: cvData?.honors_awards,
    };
    try {
      if (!user?.user_id) {
        showInfo("Bạn cần đăng nhập để sử dụng chức năng này!");
        return;
      }
      if (targetRef) {
        helpers.exportPdf(targetRef);
      }
      await CVService.updateCV(payload);
      showSuccess("CV của bạn đã được cập nhật");
    } catch (error) {
      showError(error);
    }
  };
  return (
    <Box>
      <Box className="flex flex-col gap-5  pb-20">
        <Formik
          initialValues={{
            cv_name: cvDetail?.cv_name,
          }}
          validationSchema={Yup.object().shape({
            cv_name: Yup.string().required("Tên CV không được để trống"),
          })}
          onSubmit={handleSubmit}
        >
          {({ values }) => {
            return (
              <>
                <Box className="bg-white border-t sticky top-header z-10 shadow-sm">
                  <Form className="container mx-auto flex justify-between items-center py-5">
                    <FormikField
                      name="cv_name"
                      component={InputField}
                      className="w-fit"
                      label="CV chưa đặt tên"
                    />
                    <Box className="flex flex-nowrap gap-5 w-fit">
                      <Button
                        startIcon={<CommonIcon.VisibilityOutlined />}
                        className="text-nowrap h-fit"
                        onClick={toggle}
                        sx={{
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
                        type={"submit"}
                        onClick={() => {
                          if (!values.cv_name) {
                            showError("Tên CV không được để trống!");
                            return;
                          }
                          handleSubmit(cvData);
                        }}
                        startIcon={<CommonIcon.VerticalAlignBottomRounded />}
                        className="text-nowrap h-fit"
                        sx={{
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
                        type={"button"}
                        startIcon={<CommonIcon.Save />}
                        onClick={() => {
                          if (!values.cv_name) {
                            showError("Tên CV không được để trống!");
                            return;
                          }
                          handleSave(values);
                        }}
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
                <Container className="p-5 grid grid-cols-12 gap-4 relative">
                  <Box className="col-span-4 p-4 bg-white rounded h-fit sticky top-[172px]">
                    {isLoading ? (
                      <Skeleton
                        variant="rectangular"
                        className="w-full"
                        height={"480px"}
                      />
                    ) : (
                      <img src={dataConvert?.preview_image} alt="" />
                    )}
                  </Box>
                  <Box className="col-span-8 bg-white p-4 rounded">
                    <EditCvForm
                      handleSubmit={handleSubmit}
                      onChange={onChange}
                    />
                  </Box>
                </Container>
              </>
            );
          }}
        </Formik>
      </Box>
      {shouldRender && (
        <DialogMUI
          toggle={toggle}
          open={open}
          body={
            <CVTemplate
              code={dataConvert?.theme_code}
              values={cvData}
              ref={targetRef}
            />
          }
        />
      )}
      <CVTemplate
        show={false}
        code={dataConvert?.theme_code}
        values={cvData}
        ref={targetRef}
      />
    </Box>
  );
};

export default EditCVPage;
