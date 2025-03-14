import { Box, Container, Skeleton } from "@mui/material";
import * as Yup from "yup";
import React, { useMemo, useRef, useState } from "react";
import FormikField from "../../components/CustomFieldsFormik/FormikField";
import InputField from "../../components/CustomFieldsFormik/InputField";
import { Form, Formik } from "formik";
import { Button, CommonIcon } from "../../ui";
import useToggleDialog from "../../hooks/useToggleDialog";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCvTheme } from "../../hooks/modules/cv_theme/userGetCvTheme";
import { useConvertData } from "../../hooks";
import DialogMUI from "../../components/Dialogs";
import CVTemplate from "./components/CvTemplate";
import CreateCvForm from "./components/CreateCvForm";
import { useSelector } from "react-redux";
import { useNotifications } from "../../utils/notifications";
import { CVService } from "../../services/CvServices";
import { usePDF } from "react-to-pdf";
import helpers from "../../utils/helpers";
import { RouteBase } from "../../constants/routeUrl";
const CreateCVPage = () => {
  const navigate = useNavigate();
  const targetRef = useRef();

  const user = useSelector((state) => state.user);
  const { showError, showInfo, showSuccess } = useNotifications();
  const { id } = useParams();
  const { data, isLoading } = useGetCvTheme(id, { enabled: !!id });
  const { dataConvert } = useConvertData(data);
  const [cvData, setCvData] = useState(null);
  const { open, shouldRender, toggle } = useToggleDialog();

  const onChange = (values) => {
    setCvData(values);
  };
  const componentRef = useMemo(() => {
    if (targetRef?.current) {
      return targetRef;
    }
  }, [targetRef.current]);
  const handleSave = async (values) => {
    const payload = {
      cv_name: values?.cv_name,
      user: user?.user_id,
      theme: id,
      profile: cvData?.profile,
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
      await CVService.createCV(payload);
      showSuccess("CV của bạn đã được lưu");
    } catch (error) {
      showError(error);
    }
  };
  const handleSubmit = async (values) => {
    const payload = {
      cv_name: values?.cv_name,
      user: user?.user_id,
      theme: id,
      profile: cvData?.profile,
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
      await CVService.createCV(payload);
      if (componentRef) {
        helpers.exportPdf(componentRef);
      }
      navigate(RouteBase.MyCv);
      showSuccess("CV của bạn đã được lưu");
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Box>
      <Box className="flex flex-col gap-5">
        <Formik
          initialValues={{
            cv_name: "",
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
                        type={"button"}
                        onClick={() => {
                          if (!values.cv_name) {
                            showError("Tên CV không được để trống!");
                            return;
                          } else {
                            handleSubmit(cvData);
                          }
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
                          handleSave(cvData);
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
                    {/* <CVModel1 values={cvData} /> */}
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
                    <CreateCvForm
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
          body={<CVTemplate code={dataConvert?.theme_code} values={cvData} />}
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

export default CreateCVPage;
