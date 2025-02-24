import { Form, Formik } from "formik";
import React, { useMemo } from "react";
import {
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import Button from "../../../../ui/Button";
import useConvertData from "../../../../hooks/useConvertData";
import { useNotifications } from "../../../../utils/notifications";
import { useGetLevel } from "../../../../hooks/modules/level/useGetLevel";
import { levelService } from "../../../../services/LevelServices";

const CreateEditLevel = ({ id, refetch, onClose }) => {
  const { showError, showSuccess } = useNotifications();
  const { data, isLoading } = useGetLevel(id, { enabled: !!id });
  const { dataConvert } = useConvertData(data);
  const initialValues = {
    name: "",
    description: "",
  };
  const initialValuesEdit = useMemo(() => {
    if (dataConvert) {
      return {
        name: dataConvert?.name || "",
        description: dataConvert?.description || "",
      };
    }
    return undefined;
  }, [dataConvert]);

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await levelService.updateLevel({ id, ...values });
        showSuccess("Cập nhật cấp bậc thành công");
        return;
      }
      await levelService.createLevel(values);
      showSuccess("Tạo mới cấp bậc thành công");
    } catch (error) {
      showError(error);
    }
  };
  return (
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
              name="name"
              component={InputField}
              labelTop="Tên danh mục"
              required
              placeholder="Nhập tên danh mục"
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
            >
              {id ? "Lưu" : "Tạo mới"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateEditLevel;
