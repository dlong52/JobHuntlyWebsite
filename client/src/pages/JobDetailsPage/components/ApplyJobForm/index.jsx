import { Form, Formik } from "formik";
import React, { useState } from "react";
import {
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import * as Yup from "yup";
import { Button, CommonIcon } from "../../../../ui";
import { Typography } from "@mui/material";
import UploadCV from "./components/UploadCv";
import { useSelector } from "react-redux";
import { useNotifications } from "../../../../utils/notifications";
import { ROLE } from "../../../../constants/enum";
import { NotificationService } from "../../../../services/NotificationServices";
import { ApplicantService } from "../../../../services/ApplicationServices";

const ApplyJobForm = ({ onClose, jobId, name, posted_by, companyId }) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const { showSuccess, showError, showInfo } = useNotifications();

  const validationSchema = Yup.object().shape({
    cover_letter: Yup.string()
      .trim()
      .max(1000, "Thư xin việc không được vượt quá 1000 ký tự.")
      .required("Thư xin việc là bắt buộc."),

    cv_url: Yup.string()
      .trim()
      .url("CV phải là một URL hợp lệ.")
      .required("Vui lòng cung cấp CV của bạn."),
  });

  const handleSubmit = async (values) => {
    const payload = {
      candidate: user?.user_id,
      job: jobId,
      cv_url: values?.cv_url,
      company: companyId,
      cover_letter: values?.cover_letter,
    };
    setLoading(true);
    try {
      if (user?.user_id && user?.role === ROLE.CANDIDATE) {
        const res = await ApplicantService.createApplicant(payload);
        if (res?.data?.status === "success") {
          await NotificationService.sendToUser({
            userId: posted_by?._id,
            title: `đã ứng tuyển vào ${name}`,
            body: "vndslk",
          });
        }
        showSuccess("Ứng tuyển thành công!");
        setLoading(false);
      } else {
        showInfo("Bạn cần đăng nhập để ứng tuyển");
      }
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };
  // Render
  return (
    <>
      <Formik
        initialValues={{
          cover_letter: "",
          cv_url: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form className="">
              <div className="flex flex-col gap-5 w-[700px] p-5 overflow-y-auto">
                <Typography
                  className="flex items-center gap-2"
                  fontSize={"16px"}
                  fontWeight={500}
                >
                  <CommonIcon.ContactPage className="text-primary" /> Chọn CV để
                  ứng tuyển:{" "}
                </Typography>

                <FormikField name="cv_url" required component={UploadCV} />
                <FormikField
                  name="cover_letter"
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
                  onClick={onClose}
                >
                  Hủy
                </Button>
                <Button
                  isLoading={loading}
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
