import React, { useMemo } from "react";
import { useGetApplicant } from "../../../../../../hooks/modules/application/useGetApplicant";
import { Form, Formik } from "formik";
import {
  FormikField,
  RadioField,
} from "../../../../../../components/CustomFieldsFormik";
import { applicantStatusOptions } from "../../../../../../constants/enum";
import { Button } from "../../../../../../ui";

const ApplicantDetail = ({ id }) => {
  const { data, isLoading } = useGetApplicant(id, { enable: !!id });
  const detailData = useMemo(() => {
    if (data) {
      return data?.data?.data;
    }
    return undefined;
  }, [data]);
  const handleSubmit = async (values) => {
    console.log(values?.status);
  };
  return (  
    <Formik
      initialValues={{
        status: detailData?.status | "under_review",
      }}
      onSubmit={handleSubmit}
    >
      {(values) => {
        return (
          <Form className="flex flex-col gap-4 w-full">
            <FormikField
              classNameLabel="text-neutrals-100 font-medium text-sm"
              name="status"
              options={applicantStatusOptions}
              row
              component={RadioField}
              activeColor="#4640DE"
              size="small"
              labelTop="Trạng thái"
            />
            <Button type={"submit"}>Cập nhật</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ApplicantDetail;
