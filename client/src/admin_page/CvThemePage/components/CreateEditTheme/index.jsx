import { Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import {
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import Button from "../../../../ui/Button";
import useConvertData from "../../../../hooks/useConvertData";
import { useNotifications } from "../../../../utils/notifications";
import { levelService } from "../../../../services/LevelServices";
import LoadingForm from "../../../../ui/LoadingForm";
import { useGetCvTheme } from "../../../../hooks/modules/cv_theme/userGetCvTheme";
import UploadImage from "./components/UploadImage";
import { CvThemeService } from "../../../../services/CvThemeServices";

const CreateEditTheme = ({ id, refetch, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useNotifications();
  const { data, isLoading } = useGetCvTheme(id, { enabled: !!id });
  const { dataConvert } = useConvertData(data);
  const initialValues = {
    name: "",
    theme_code: "",
    preview_image: "",
    description: "",
  };
  const initialValuesEdit = useMemo(() => {
    if (dataConvert) {
      return {
        name: dataConvert?.name || "",
        description: dataConvert?.description || "",
        theme_code: dataConvert?.theme_code || "",
        preview_image: dataConvert?.preview_image || "",
      };
    }
    return undefined;
  }, [dataConvert]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (id) {
        await CvThemeService.updateCvTheme({ id, ...values });
        showSuccess("Cập nhật chủ đề thành công");
        return;
      }
      await CvThemeService.createCvTheme(values);
      showSuccess("Tạo mới chủ đề thành công");
      setLoading(false);
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };
  const checkEdit = id ? !!data : true;
  return (
    <>
      {!checkEdit && isLoading ? (
        <LoadingForm />
      ) : (
        <Formik
          initialValues={initialValuesEdit ? initialValuesEdit : initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => {
            return (
              <Form className="grid grid-cols-12 gap-4 min-w-[600px]">
                <FormikField
                  classNameContainer="col-span-12"
                  className="bg-[#f8fafc]"
                  classNameLabel="font-medium text-neutrals-100"
                  name="preview_image"
                  component={UploadImage}
                  required
                />
                <FormikField
                  classNameContainer="col-span-12"
                  className="bg-[#f8fafc]"
                  classNameLabel="font-medium text-neutrals-100"
                  name="name"
                  component={InputField}
                  labelTop="Tên chủ đề"
                  required
                  placeholder="Nhập tên chủ đề"
                />
                <FormikField
                  classNameContainer="col-span-12"
                  className="bg-[#f8fafc]"
                  classNameLabel="font-medium text-neutrals-100"
                  name="theme_code"
                  component={InputField}
                  labelTop="Mã chủ đề"
                  required
                  placeholder="VD: MODERN-THEME"
                />
                <FormikField
                  classNameContainer="col-span-12"
                  className="bg-[#f8fafc]"
                  classNameLabel="font-medium text-neutrals-100"
                  name="description"
                  component={InputField}
                  labelTop="Mô tả"
                  rows={3}
                  multiline
                  placeholder="Nhập mô tả chủ đề"
                />
                <Button
                  type={"submit"}
                  className={"col-span-12 !bg-primary !text-white"}
                  disabled={loading}
                >
                  {loading
                    ? id
                      ? "Đang lưu..."
                      : "Đang tạo mới..."
                    : id
                    ? "Lưu"
                    : "Tạo mới"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default CreateEditTheme;
