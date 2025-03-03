import { Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import {
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import Button from "../../../../ui/Button";
import { useGetCategory } from "../../../../hooks/modules/category/useGetCategory";
import useConvertData from "../../../../hooks/useConvertData";
import { useNotifications } from "../../../../utils/notifications";
import {
  createCategory,
  updateCategory,
} from "../../../../services/CategorySevices";
import UploadIcon from "./components/UploadIcon";
import { Box } from "@mui/material";
import LoadingForm from "../../../../ui/LoadingForm";

const CreateEditCategory = ({ id, refetch, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useNotifications();
  const { data, isLoading } = useGetCategory(id, { enabled: !!id });
  const { dataConvert } = useConvertData(data);
  const initialValues = {
    icon: "",
    name: "",
    sort_name: "",
    description: "",
  };
  const initialValuesEdit = useMemo(() => {
    if (dataConvert) {
      return {
        name: dataConvert?.name || "",
        icon: dataConvert?.icon || "",
        sort_name: dataConvert?.sort_name || "",
        description: dataConvert?.description || "",
      };
    }
    return undefined;
  }, [dataConvert]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (id) {
        await updateCategory({ id, ...values });
        showSuccess("Cập nhật danh mục thành công");
        return;
      }
      await createCategory(values);
      showSuccess("Tạo mới danh mục thành công");
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
                  name="icon"
                  component={UploadIcon}
                  required
                />
                <FormikField
                  classNameContainer="col-span-6"
                  className="bg-[#f8fafc]"
                  classNameLabel="font-medium text-neutrals-100"
                  name="name"
                  component={InputField}
                  labelTop="Tên danh mục"
                  required
                  placeholder="Nhập tên danh mục"
                />
                <FormikField
                  classNameContainer="col-span-6"
                  className="bg-[#f8fafc]"
                  classNameLabel="font-medium text-neutrals-100"
                  name="sort_name"
                  component={InputField}
                  labelTop="Tên ngắn gọn"
                  required
                  placeholder="VD: Công nghệ thông tin -> IT"
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
                  placeholder="Nhập mô tả danh mục"
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

export default CreateEditCategory;
