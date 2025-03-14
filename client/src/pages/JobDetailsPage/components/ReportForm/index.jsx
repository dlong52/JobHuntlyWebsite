import { Form, Formik } from "formik";
import React from "react";
import {
  FormikField,
  InputField,
  RadioField,
} from "../../../../components/CustomFieldsFormik";
import { Button } from "../../../../ui";
import { useSelector } from "react-redux";
import { ReportService } from "../../../../services/ReportServices";
import { useNotifications } from "../../../../utils/notifications";
const options = [
  {
    value:
      "Mô tả không đúng sự thật, yêu cầu phí tuyển dụng hoặc có dấu hiệu lừa đảo.",
    label:
      "Mô tả không đúng sự thật, yêu cầu phí tuyển dụng hoặc có dấu hiệu lừa đảo.",
  },
  {
    value: "Mức lương, mô tả công việc, yêu cầu không đúng với thực tế.",
    label: "Mức lương, mô tả công việc, yêu cầu không đúng với thực tế.",
  },
  {
    value:
      "Nội dung công việc vi phạm điều khoản của website (vd: phân biệt đối xử, nội dung không phù hợp).",
    label:
      "Nội dung công việc vi phạm điều khoản của website (vd: phân biệt đối xử, nội dung không phù hợp).",
  },
  {
    value: "Công việc vi phạm pháp luật hoặc có dấu hiệu bóc lột lao động.",
    label: "Công việc vi phạm pháp luật hoặc có dấu hiệu bóc lột lao động.",
  },
  {
    value:
      "Nhà tuyển dụng yêu cầu thông tin không cần thiết như số tài khoản ngân hàng, CCCD…",
    label:
      "Nhà tuyển dụng yêu cầu thông tin không cần thiết như số tài khoản ngân hàng, CCCD…",
  },
  {
    value:
      "Nhà tuyển dụng đăng tin để quảng cáo dịch vụ, không phải tin tuyển dụng thật.",
    label:
      "Nhà tuyển dụng đăng tin để quảng cáo dịch vụ, không phải tin tuyển dụng thật.",
  },
  {
    value: "other",
    label: "Lí do khác",
  },
];
const ReportForm = ({ job }) => {
  const user = useSelector((state) => state.user);
  const { showError, showSuccess, showInfo } = useNotifications();
  const handleSubmit = async (values) => {
    const payload = {
      reported_by: user?.user_id,
      report_type: "job",
      report_job_target_id: job?._id,
      reason: values.reason,
      description: values.description,
    };
    try {
      if (!user.user_id) {
        showInfo("Bạn cần đăng nhập để báo cáo tin tuyển dụng!");
        return;
      }
      if (!job?._id) {
        showError("Đã xảy ra lỗi vui lòng thử lại.");
        return;
      }
      await ReportService.createReport(payload);
      showSuccess("Chúng tôi đã ghi nhận báo cáo của bạn!", null, {
        vertical: "top",
        horizontal: "center",
      });
      return;
    } catch (error) {
      showError(error?.response?.data?.message, null, {
        vertical: "top",
        horizontal: "center",
      });
    }
  };
  return (
    <Formik
      initialValues={{
        reason: "",
        description: "",
      }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => {
        return (
          <Form className="flex flex-col gap-5">
            <FormikField
              component={RadioField}
              options={options}
              name="reason"
              activeColor="var(--primary)"
            />
            <FormikField
              component={InputField}
              multiline
              rows={4}
              name="description"
              placeholder="Mô tả"
            />
            <Button type={"submit"} className={"!bg-primary !text-white"}>
              Gửi
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReportForm;
