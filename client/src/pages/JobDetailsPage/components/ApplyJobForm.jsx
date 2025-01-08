import { Form, Formik } from "formik";
import React from "react";
import {
  FormikField,
  InputField,
  RadioField,
} from "../../../components/CustomFieldsFormik";
import { Button, CommonIcon } from "../../../ui";
import { Typography } from "@mui/material";
import RadioCVField from "./RadioCVField";

const ApplyJobForm = () => {
  const cvOptions = [
    {
      label: (
        <div className="flex flex-col gap-3">
            <Typography>CV online</Typography>
          <div className="border w-full">
            <Typography>CV-SoftwareDeveloper-NguyenDucLong</Typography>
          </div>
        </div>
      ),
      value: "Job11",
    },
    {
      label: <div>

      </div>,
      value: "Job22",
    },
  ];
  return (
    <>
      <Formik initialValues={{}} validationSchema={{}} onSubmit={() => {}}>
        {() => {
          return (
            <Form className="">
              <div className="flex items-center justify-between sticky top-0 bg-white p-5 z-50 shadow">
                <Typography fontSize={"22px"} fontWeight={600}>
                  Ứng tuyển{" "}
                  <span className="text-primary">Thực tập sinh Font-End</span>
                </Typography>
                <CommonIcon.Close />
              </div>
              <div className="flex flex-col gap-5 w-[700px] p-5 overflow-y-auto">
                <FormikField
                  classNameLabel="text-neutrals-100 font-medium text-sm"
                  classNameContainer="col-span-6"
                  name="cv"
                  options={cvOptions}
                  row
                  component={RadioCVField}
                  activeColor="#4640DE"
                  size="small"
                  labelTop={
                    <Typography
                      className="flex items-center gap-2"
                      fontSize={"16px"}
                      fontWeight={500}
                    >
                      <CommonIcon.ContactPage className="text-primary" /> Chọn
                      CV để ứng tuyển:{" "}
                    </Typography>
                  }
                />
                <FormikField
                  name="letter"
                  component={InputField}
                  rows={8}
                  multiline
                  labelTop={
                    <Typography
                      className="flex items-center gap-2"
                      fontSize={"16px"}
                      fontWeight={500}
                    >
                      <CommonIcon.HistoryEduOutlined className="text-primary" />{" "}
                      Thư giới thiệu:{" "}
                    </Typography>
                  }
                  placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này."
                />
              </div>
              <div className=" flex gap-5 w-full p-5 sticky bottom-0 shadow bg-white">
                <Button
                  className="!bg-gray-200 !text-neutrals-100"
                  size="large"
                  type="submit"
                >
                  Hủy
                </Button>
                <Button
                  className="!bg-primary !text-white flex-1 "
                  size="large"
                  type="submit"
                >
                  Nộp hồ sơ ứng tuyển
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ApplyJobForm;
