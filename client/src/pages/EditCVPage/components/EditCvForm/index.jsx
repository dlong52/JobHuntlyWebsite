import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  CkEditerField,
  FormikField,
  InputField,
} from "../../../../components/CustomFieldsFormik";
import { CommonIcon } from "../../../../ui";
import { Box, Typography } from "@mui/material";
import { initialValues } from "./form";
import UploadAvatar from "./components/UploadAvatar";
import { useParams } from "react-router-dom";
import { useGetCv } from "../../../../hooks/modules/cv/useGetCv";
import { useConvertData } from "../../../../hooks";
const validationSchema = Yup.object({
  profile: Yup.object({
    name: Yup.string().required("Tên không được để trống"),
  }),
});

const EditCvForm = ({ handleSubmit, onChange }) => {
  const { cv_id } = useParams();

  const { data, isLoading } = useGetCv(cv_id, {
    enabled: !!cv_id,
  });
  const { dataConvert } = useConvertData(data);
  const handleChange = (values) => {
    onChange(values);
  };
  return (
    <Formik
      initialValues={dataConvert || {}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => {
        handleChange(values);
        return (
          <Form className="grid grid-cols-12 gap-4">
            {/* Thông tin ứng viên */}
            <Box className="col-span-12">
              <Typography
                fontWeight={500}
                fontSize={"18px"}
                marginBottom={"5px"}
              >
                Thông tin ứng viên
              </Typography>
              <Box className="grid grid-cols-12 gap-4">
                <FormikField
                  size="small"
                  name="profile.avatar"
                  component={UploadAvatar}
                  required
                  classNameContainer="col-span-12"
                />
                <FormikField
                  size="small"
                  name="profile.name"
                  component={InputField}
                  label="Tên của bạn"
                  required
                  classNameContainer="col-span-6"
                />
                <FormikField
                  size="small"
                  name="profile.email"
                  component={InputField}
                  label="Email"
                  required
                  classNameContainer="col-span-6"
                />
                <FormikField
                  size="small"
                  name="profile.phone_number"
                  component={InputField}
                  label="Số điện thoại"
                  required
                  classNameContainer="col-span-6"
                />
                <FormikField
                  size="small"
                  name="position"
                  component={InputField}
                  label="Vị trí ứng tuyển"
                  required
                  classNameContainer="col-span-6"
                />
                <FormikField
                  size="small"
                  name="profile.address"
                  component={InputField}
                  label="Địa chỉ"
                  required
                  classNameContainer="col-span-12"
                />
                <FormikField
                  size="small"
                  name="profile.birthday"
                  component={InputField}
                  label="Ngày sinh"
                  required
                  classNameContainer="col-span-6"
                />
                <FormikField
                  size="small"
                  name="profile.website"
                  component={InputField}
                  label="Website"
                  required
                  classNameContainer="col-span-6"
                />
              </Box>
            </Box>
            {/* Mục tiêu */}
            <FormikField
              size="small"
              name="objective"
              component={InputField}
              label="Mục tiêu"
              multiline
              rows={3}
              classNameContainer="col-span-12"
            />
            {/* Kinh nghiệm */}
            <Box className="col-span-12">
              <Typography
                fontWeight={500}
                fontSize={"18px"}
                marginBottom={"5px"}
              >
                Kinh nghiệm làm việc
              </Typography>
              <FieldArray name="work_experiences">
                {({ remove, push }) => (
                  <>
                    {values?.work_experiences?.map((_, index) => (
                      <Box
                        key={index}
                        className="border p-4 rounded-md shadow-sm bg-white relative group grid grid-cols-12 gap-4"
                      >
                        <FormikField
                          size="small"
                          name={`work_experiences.${index}.company`}
                          component={InputField}
                          classNameContainer="col-span-6"
                          label="Tên công ty"
                        />
                        <Box className="text-gray-600 flex items-center gap-4 col-span-6 ">
                          <FormikField
                            size="small"
                            className="w-fit"
                            name={`work_experiences.${index}.from_date`}
                            component={InputField}
                            classNameContainer="col-span-3"
                            label="Bắt đầu"
                          />
                          <FormikField
                            size="small"
                            className="w-fit"
                            name={`work_experiences.${index}.to_date`}
                            component={InputField}
                            classNameContainer="col-span-3"
                            label="Kết thúc"
                          />
                        </Box>
                        <FormikField
                          size="small"
                          name={`work_experiences.${index}.position`}
                          component={InputField}
                          classNameContainer="col-span-12"
                          label="Vị trí"
                        />
                        <FormikField
                          size="small"
                          name={`work_experiences.${index}.experience_des`}
                          component={CkEditerField}
                          classNameContainer="col-span-12"
                          label="Mô tả"
                        />
                        <Box className=" hidden group-hover:flex items-center gap-2 absolute top-0 right-0 -translate-y-full p-2 rounded-t-md bg-white border">
                          <button
                            type="button"
                            className="bg-primary text-white py-1 px-2 rounded-md text-sm flex items-center justify-center"
                            onClick={() =>
                              push({
                                company: "",
                                from_date: "",
                                to_date: "",
                                position: "",
                                experience_des: "",
                              })
                            }
                          >
                            <CommonIcon.Add className="!text-[16px]" />
                          </button>
                          <button
                            className="bg-red-600 p-1 flex items-center justify-center text-white rounded-md"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <CommonIcon.DeleteOutline className="!text-[16px]" />
                          </button>
                        </Box>
                      </Box>
                    ))}
                  </>
                )}
              </FieldArray>
            </Box>
            {/* Dự án */}
            <Box className="col-span-12">
              <Typography
                fontWeight={500}
                fontSize={"18px"}
                marginBottom={"5px"}
              >
                Dự án
              </Typography>
              <FieldArray name="projects">
                {({ remove, push }) => (
                  <>
                    {values?.projects?.map((_, index) => (
                      <Box
                        key={index}
                        className="border p-4 rounded-md shadow-sm bg-white relative group grid grid-cols-12 gap-4"
                      >
                        <FormikField
                          size="small"
                          name={`projects.${index}.project_name`}
                          component={InputField}
                          classNameContainer="col-span-6"
                          label="Tên dự án"
                        />
                        <Box className="text-gray-600 flex items-center gap-4 col-span-6 ">
                          <FormikField
                            size="small"
                            className="w-fit"
                            name={`projects.${index}.from_date`}
                            component={InputField}
                            classNameContainer="col-span-3"
                            label="Bắt đầu"
                          />
                          <FormikField
                            size="small"
                            className="w-fit"
                            name={`projects.${index}.to_date`}
                            component={InputField}
                            classNameContainer="col-span-3"
                            label="Kết thúc"
                          />
                        </Box>
                        <FormikField
                          size="small"
                          name={`projects.${index}.customer_name`}
                          component={InputField}
                          classNameContainer="col-span-4"
                          label="Tên khách hàng"
                        />
                        <FormikField
                          size="small"
                          name={`projects.${index}.position_project`}
                          component={InputField}
                          classNameContainer="col-span-4"
                          label="Vị trí"
                        />
                        <FormikField
                          size="small"
                          name={`projects.${index}.team_size`}
                          component={InputField}
                          classNameContainer="col-span-4"
                          label="Số thành viên"
                        />
                        <FormikField
                          size="small"
                          name={`projects.${index}.technology_des`}
                          component={InputField}
                          classNameContainer="col-span-12"
                          label="Mô tả công nghệ"
                        />
                        <Box className=" hidden group-hover:flex items-center gap-2 absolute top-0 right-0 -translate-y-full p-2 rounded-t-md bg-white border">
                          <button
                            type="button"
                            className="bg-primary text-white py-1 px-2 rounded-md text-sm flex items-center justify-center"
                            onClick={() =>
                              push({
                                project_name: "",
                                from_date: "",
                                to_date: "",
                                customer_name: "",
                                team_size: "",
                                technology_des: "",
                              })
                            }
                          >
                            <CommonIcon.Add className="!text-[16px]" />
                          </button>
                          <button
                            className="bg-red-600 p-1 flex items-center justify-center text-white rounded-md"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <CommonIcon.DeleteOutline className="!text-[16px]" />
                          </button>
                        </Box>
                      </Box>
                    ))}
                  </>
                )}
              </FieldArray>
            </Box>
            {/* Học vấn */}
            <Box className="col-span-12">
              <Typography
                fontWeight={500}
                fontSize={"18px"}
                marginBottom={"5px"}
              >
                Học vấn
              </Typography>
              <FieldArray name="education">
                {({ remove, push }) => (
                  <>
                    {values?.education?.map((_, index) => (
                      <Box
                        key={index}
                        className="border p-4 rounded-md shadow-sm bg-white relative group grid grid-cols-12 gap-4"
                      >
                        <FormikField
                          size="small"
                          name={`education.${index}.school_name`}
                          component={InputField}
                          classNameContainer="col-span-6"
                          label="Tên trường học"
                        />
                        <Box className="text-gray-600 flex items-center gap-4 col-span-6 ">
                          <FormikField
                            size="small"
                            className="w-fit"
                            name={`education.${index}.from_date`}
                            component={InputField}
                            classNameContainer="col-span-3"
                            label="Bắt đầu"
                          />
                          <FormikField
                            size="small"
                            className="w-fit"
                            name={`education.${index}.to_date`}
                            component={InputField}
                            classNameContainer="col-span-3"
                            label="Kết thúc"
                          />
                        </Box>
                        <FormikField
                          size="small"
                          name={`education.${index}.courses`}
                          component={InputField}
                          classNameContainer="col-span-4"
                          label="Chuyên ngành"
                        />
                        <FormikField
                          size="small"
                          name={`education.${index}.education_des`}
                          component={InputField}
                          classNameContainer="col-span-8"
                          label="Mô tả"
                        />
                        <Box className=" hidden group-hover:flex items-center gap-2 absolute top-0 right-0 -translate-y-full p-2 rounded-t-md bg-white border">
                          <button
                            type="button"
                            className="bg-primary text-white py-1 px-2 rounded-md text-sm flex items-center justify-center"
                            onClick={() =>
                              push({
                                school_name: "",
                                from_date: "",
                                to_date: "",
                                courses: "",
                                education_des: "",
                              })
                            }
                          >
                            <CommonIcon.Add className="!text-[16px]" />
                          </button>
                          <button
                            className="bg-red-600 p-1 flex items-center justify-center text-white rounded-md"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <CommonIcon.DeleteOutline className="!text-[16px]" />
                          </button>
                        </Box>
                      </Box>
                    ))}
                  </>
                )}
              </FieldArray>
            </Box>
            {/* Kĩ năng */}
            <Box className="col-span-12">
              <Typography
                fontWeight={500}
                fontSize={"18px"}
                marginBottom={"5px"}
              >
                Kĩ năng
              </Typography>
              <FieldArray name="skills">
                {({ remove, push }) => (
                  <>
                    {values?.skills?.map((_, index) => (
                      <Box
                        key={index}
                        className="border p-4 rounded-md shadow-sm bg-white relative group grid grid-cols-12 gap-4"
                      >
                        <FormikField
                          size="small"
                          name={`skills.${index}.skill_name`}
                          component={InputField}
                          classNameContainer="col-span-4"
                          label="Kĩ năng"
                        />
                        <FormikField
                          size="small"
                          name={`skills.${index}.skill_des`}
                          component={InputField}
                          classNameContainer="col-span-8"
                          label="Mô tả"
                        />
                        <Box className=" hidden group-hover:flex items-center gap-2 absolute top-0 right-0 -translate-y-full p-2 rounded-t-md bg-white border">
                          <button
                            type="button"
                            className="bg-primary text-white py-1 px-2 rounded-md text-sm flex items-center justify-center"
                            onClick={() =>
                              push({
                                skill_name: "",
                                skill_des: "",
                              })
                            }
                          >
                            <CommonIcon.Add className="!text-[16px]" />
                          </button>
                          <button
                            className="bg-red-600 p-1 flex items-center justify-center text-white rounded-md"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <CommonIcon.DeleteOutline className="!text-[16px]" />
                          </button>
                        </Box>
                      </Box>
                    ))}
                  </>
                )}
              </FieldArray>
            </Box>
            {/* Danh hiệu */}
            <Box className="col-span-12">
              <Typography
                fontWeight={500}
                fontSize={"18px"}
                marginBottom={"5px"}
              >
                Giải thưởng
              </Typography>
              <FieldArray name="honors_awards">
                {({ remove, push }) => (
                  <>
                    {values?.honors_awards?.map((_, index) => (
                      <Box
                        key={index}
                        className="border p-4 rounded-md shadow-sm bg-white relative group grid grid-cols-12 gap-4"
                      >
                        <FormikField
                          size="small"
                          name={`honors_awards.${index}.time`}
                          component={InputField}
                          classNameContainer="col-span-4"
                          label="Thời gian"
                        />
                        <FormikField
                          size="small"
                          name={`honors_awards.${index}.award_name`}
                          component={InputField}
                          classNameContainer="col-span-8"
                          label="Tên giải thưởng"
                        />
                        <Box className=" hidden group-hover:flex items-center gap-2 absolute top-0 right-0 -translate-y-full p-2 rounded-t-md bg-white border">
                          <button
                            type="button"
                            className="bg-primary text-white py-1 px-2 rounded-md text-sm flex items-center justify-center"
                            onClick={() =>
                              push({
                                time: "",
                                award_name: "",
                              })
                            }
                          >
                            <CommonIcon.Add className="!text-[16px]" />
                          </button>
                          <button
                            className="bg-red-600 p-1 flex items-center justify-center text-white rounded-md"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <CommonIcon.DeleteOutline className="!text-[16px]" />
                          </button>
                        </Box>
                      </Box>
                    ))}
                  </>
                )}
              </FieldArray>
            </Box>
            {/* Chứng chỉ */}
            <Box className="col-span-12">
              <Typography
                fontWeight={500}
                fontSize={"18px"}
                marginBottom={"5px"}
              >
                Chứng chỉ
              </Typography>
              <FieldArray name="certifications">
                {({ remove, push }) => (
                  <>
                    {values?.certifications?.map((_, index) => (
                      <Box
                        key={index}
                        className="border p-4 rounded-md shadow-sm bg-white relative group grid grid-cols-12 gap-4"
                      >
                        <FormikField
                          size="small"
                          name={`certifications.${index}.time`}
                          component={InputField}
                          classNameContainer="col-span-4"
                          label="Thời gian"
                        />
                        <FormikField
                          size="small"
                          name={`certifications.${index}.certification_name`}
                          component={InputField}
                          classNameContainer="col-span-8"
                          label="Tên chứng chỉ"
                        />
                        <Box className=" hidden group-hover:flex items-center gap-2 absolute top-0 right-0 -translate-y-full p-2 rounded-t-md bg-white border">
                          <button
                            type="button"
                            className="bg-primary text-white py-1 px-2 rounded-md text-sm flex items-center justify-center"
                            onClick={() =>
                              push({
                                time: "",
                                certification_name: "",
                              })
                            }
                          >
                            <CommonIcon.Add className="!text-[16px]" />
                          </button>
                          <button
                            className="bg-red-600 p-1 flex items-center justify-center text-white rounded-md"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <CommonIcon.DeleteOutline className="!text-[16px]" />
                          </button>
                        </Box>
                      </Box>
                    ))}
                  </>
                )}
              </FieldArray>
            </Box>
            {/* Sở thích */}
            <Box className="col-span-12">
              <Typography
                fontWeight={500}
                fontSize={"18px"}
                marginBottom={"5px"}
              >
                Sở thích
              </Typography>
              <FormikField
                size="small"
                name={"interests"}
                component={InputField}
                classNameContainer="col-span-12"
                label="Sở thích"
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditCvForm;
