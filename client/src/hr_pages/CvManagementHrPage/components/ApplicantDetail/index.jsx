import { useGetApplicant } from "../../../../hooks/modules/application/useGetApplicant";
import { Form, Formik } from "formik";
import {
  FormikField,
  RadioField,
} from "../../../../components/CustomFieldsFormik";
import { applicantStatusOptions } from "../../../../constants/enum";
import { Button, CommonAvatar, CommonIcon } from "../../../../ui";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteBase } from "../../../../constants/routeUrl";
import useConvertData from "../../../../hooks/useConvertData";
import { cvtmp } from "../../../../assets/images";
import TooltipMui from "../../../../ui/TooltipMui";
import { ApplicantService } from "../../../../services/ApplicationServices";
import { useNotifications } from "../../../../utils/notifications";
import { NotificationService } from "../../../../services/NotificationServices";
import { SendEmailServices } from "../../../../services/SendEmailServices";
import { useSelector } from "react-redux";

const ApplicantDetail = ({ id }) => {
  const user = useSelector((state) => state.user);
  const { data, refetch } = useGetApplicant(id, { enabled: !!id });
  const { dataConvert: detailData } = useConvertData(data);
  const { showSuccess, showError } = useNotifications();

  const handleSubmit = async (values) => {
    const payload = {
      id: id,
      status: values?.status,
    };
    try {
      await ApplicantService.updateApplicant(payload);
      showSuccess("Đã gửi đánh giá của bạn cho ứng viên");
    } catch (error) {
      showError(error);
    }
  };
  const handelUpdateViewState = async () => {
    try {
      if (detailData?.isViewed) {
        return;
      }
      const payload = {
        id: id,
        isViewed: true,
      };
      await NotificationService.sendToUser({
        userId: detailData?.candidate?._id,
        title: "Nhà tuyển dụng vừa xem CV ứng tuyển của bạn",
        body: `${user?.company_name}, vừa xem CV của bạn`,
      });
      await SendEmailServices.cvViewed({
        recruiterName: user?.username,
        companyName: user?.company_name,
        jobTitle: detailData?.job?.title,
        applicantName: detailData?.candidate?.profile?.name,
        applicantEmail: detailData?.candidate?.email,
      });
      await ApplicantService.updateApplicant(payload);
      refetch();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Formik
      initialValues={{
        status: detailData?.status ? detailData?.status : "under_review",
      }}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form className="flex flex-col gap-4 w-full text-neutrals-100 min-w-[800px] relative">
            <Box className="flex flex-col gap-4 w-full p-5">
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
              <Typography className="my-5" fontWeight={500} fontSize={"18px"}>
                Việc làm ứng tuyển:{" "}
                <Link
                  to={`${RouteBase.Job}/${detailData?.job?._id}`}
                  className="text-primary"
                >
                  {detailData?.job?.title}
                </Link>
              </Typography>
              <Box className="">
                <Box className="grid grid-cols-12 w-full gap-5">
                  <Box className="p-5 border col-span-6 rounded-md">
                    <Box className="flex items-center gap-5">
                      <CommonAvatar className={"!size-16"} />
                      <Box className="">
                        <Typography fontWeight={500} fontSize={"18px"}>
                          {detailData?.candidate?.profile?.name}
                        </Typography>
                        <Typography
                          className="text-neutrals-60"
                          fontSize={"14px"}
                        >
                          {detailData?.candidate?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="overflow-hidden relative border col-span-6 rounded-md">
                    <img
                      src={detailData?.cv?.theme?.preview_image || cvtmp}
                      className="w-[300px] blur-[0.8px]"
                      alt=""
                    />
                    <TooltipMui content={"Xem CV ứng viên"}>
                      <Link
                        target="_blank"
                        to={
                          detailData?.cv_url
                            ? detailData.cv_url
                            : `/view-cv/${detailData?.cv?._id}`
                        }
                        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        onClick={() => {
                          handelUpdateViewState();
                        }}
                      >
                        <CommonIcon.RemoveRedEye className="!text-[50px]" />
                      </Link>
                    </TooltipMui>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="sticky bg-white bottom-0 right-0 left-0 p-5 shadow-md">
              <Button
                type={"submit"}
                className={"!bg-primary w-full !text-white"}
              >
                Cập nhật
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ApplicantDetail;
