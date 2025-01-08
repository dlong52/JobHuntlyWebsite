import React from "react";
import { Formik, Form, FieldArray } from "formik";
import FormikField from "../../CustomFieldsFormik/FormikField";
import TextAreaField from "@/components/CustomFieldsFormik/TextAreaField";
import { CommonIcon } from "../../../ui";
import { Box } from "@mui/material";
import { initialValues } from "./formik/initialvalues";

const CvTemplate2 = () => {
  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <Box className="max-w-[760px] mx-auto p-6 bg-white">
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Box className="max-w-4xl mx-auto p-6">
              {/* Profile Section */}
              <Box className="flex justify-between items-center mb-8">
                <Box>
                  <h1 className="text-3xl font-bold text-blue-800">
                    <FormikField
                      variant="plain"
                      name="profile.name"
                      component={TextAreaField}
                      placeholder="Họ tên"
                    />
                  </h1>
                  <p className="text-gray-700 font-semibold">
                    <FormikField
                      name="profile.position"
                      component={TextAreaField}
                      placeholder="Vị trí ứng tuyển"
                    />
                  </p>
                </Box>
                <Box className="flex flex-col items-start text-gray-600 gap-y-1 border-l-4 border-blue-800 px-4">
                  <FormikField
                    name="profile.phone_number"
                    component={TextAreaField}
                    placeholder="Số điện thoại"
                  />
                  <FormikField
                    name="profile.email"
                    component={TextAreaField}
                    placeholder="Email"
                  />
                  <FormikField
                    name="profile.address"
                    component={TextAreaField}
                    placeholder="Địa chỉ"
                  />
                </Box>
              </Box>

              {/* Objective */}
              <section className="mb-8">
                <h2 className="text-lg font-bold text-blue-800">
                  Mục tiêu nghề nghiệp
                </h2>
                <hr className="border-t-2 border-blue-800 my-2" />
                <p className="text-gray-700">
                  <FormikField
                    name="objective"
                    component={TextAreaField}
                    placeholder="Mục tiêu nghề nghiệp"
                  />
                </p>
              </section>

              {/* Work Experiences */}
              <FieldArray name="work_experiences">
                {({ remove, push }) => (
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-800">
                      Kinh nghiệm làm việc
                    </h2>
                    <hr className="border-t-2 border-blue-800 my-2" />
                    {values.work_experiences.map((_, index) => (
                      <Box
                        key={index}
                        className="border p-4 rounded-md shadow-sm mb-4 bg-white relative group"
                      >
                        <p className="font-semibold text-blue-700">
                          <FormikField
                            name={`work_experiences.${index}.company`}
                            component={TextAreaField}
                            placeholder="Tên công ty"
                          />
                        </p>
                        <Box className="text-gray-600 flex items-center w-fit">
                          <FormikField
                            className="w-fit"
                            name={`work_experiences.${index}.from_date`}
                            component={TextAreaField}
                            placeholder="Bắt đầu"
                          />
                          -
                          <FormikField
                            className="w-fit"
                            name={`work_experiences.${index}.to_date`}
                            component={TextAreaField}
                            placeholder="Kết thúc"
                          />
                        </Box>
                        <p className="text-gray-700">
                          <FormikField
                            name={`work_experiences.${index}.position`}
                            component={TextAreaField}
                            placeholder="Vị trí"
                          />
                        </p>
                        <p>
                          <FormikField
                            name={`work_experiences.${index}.experience_des`}
                            component={TextAreaField}
                            placeholder="Mô tả"
                          />
                        </p>
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
                  </section>
                )}
              </FieldArray>
              {/* Projects */}
              <FieldArray name="projects">
                {({ remove, push }) => (
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-800">Dự án</h2>
                    <hr className="border-t-2 border-blue-800 my-2" />
                    {values.projects.map((_, index) => (
                      <Box
                        key={index}
                        className="border-2 border-blue-200 p-4 rounded-md shadow-sm mb-4 relative group"
                      >
                        <p className="font-semibold text-blue-700">
                          <FormikField
                            name={`projects.${index}.project_name`}
                            component={TextAreaField}
                            placeholder="Tên dự án"
                          />
                        </p>
                        <p className="text-gray-600">
                          <FormikField
                            name={`projects.${index}.from_date`}
                            component={TextAreaField}
                            placeholder="Bắt đầu"
                          />
                          <FormikField
                            name={`projects.${index}.to_date`}
                            component={TextAreaField}
                            placeholder="Kết thúc"
                          />
                        </p>
                        <Box className="flex items-center flex-nowrap text-nowrap gap-1">
                          <span>Khách hàng:</span>
                          <FormikField
                            name={`projects.${index}.customer_name`}
                            component={TextAreaField}
                            placeholder="Tên khách hàng"
                          />
                        </Box>
                        <Box className="flex items-center flex-nowrap text-nowrap gap-1">
                          Số lượng người tham gia:
                          <FormikField
                            name={`projects.${index}.team_size`}
                            component={TextAreaField}
                            placeholder="Số lượng"
                          />
                        </Box>
                        <Box className="flex items-center flex-nowrap text-nowrap gap-1">
                          Vị trí:
                          <FormikField
                            name={`projects.${index}.position_project`}
                            component={TextAreaField}
                            placeholder="Vị trí"
                          />
                        </Box>
                        <Box className="flex items-center flex-nowrap text-nowrap gap-1">
                          Công nghệ:
                          <FormikField
                            name={`projects.${index}.tecnology_des`}
                            component={TextAreaField}
                            placeholder="Công nghệ"
                          />
                        </Box>
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
                                position_project: "",
                                tecnology_des: "",
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
                  </section>
                )}
              </FieldArray>

              {/* Education */}
              <FieldArray name="education">
                {({ remove, push }) => (
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-800">Học vấn</h2>
                    <hr className="border-t-2 border-blue-800 my-2" />
                    {values.education.map((_, index) => (
                      <Box
                        key={index}
                        className="bg-white p-4 shadow-sm mb-4 rounded-md relative group"
                      >
                        <p className="font-semibold text-blue-700">
                          <FormikField
                            name={`education.${index}.school_name`}
                            component={TextAreaField}
                            placeholder="Tên trường"
                          />
                        </p>
                        <Box className="flex items-center gap-1">
                          <FormikField
                            className="size-fit border-none"
                            name={`education.${index}.from_date`}
                            comBoxonent={TextAreaField}
                            placeholder="Bắt đầu"
                          />
                          -
                          <FormikField
                            className="size-fit border-none"
                            name={`education.${index}.to_date`}
                            component={TextAreaField}
                            placeholder="Kết thúc"
                          />
                        </Box>
                        <p>
                          <FormikField
                            name={`education.${index}.courses`}
                            component={TextAreaField}
                            placeholder="Khóa học"
                          />
                        </p>
                        <p>
                          <FormikField
                            name={`education.${index}.education_des`}
                            component={TextAreaField}
                            placeholder="Mô tả"
                          />
                        </p>
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
                  </section>
                )}
              </FieldArray>

              {/* Skills */}
              <FieldArray name="skills">
                {({ remove, push }) => (
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-800">
                      Các kỹ năng
                    </h2>
                    <hr className="border-t-2 border-blue-800 my-2" />
                    {values.skills.map((_, index) => (
                      <Box key={index} className="mb-2 relative group">
                        <p className="font-semibold">
                          <FormikField
                            name={`skills.${index}.skill_name`}
                            component={TextAreaField}
                            placeholder="Kĩ năng"
                          />
                        </p>
                        <p>
                          <FormikField
                            name={`skills.${index}.skill_des`}
                            component={TextAreaField}
                            placeholder="Mô tả"
                          />
                        </p>
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
                  </section>
                )}
              </FieldArray>

              {/* Honors & Awards */}
              <FieldArray name="honors_awards">
                {({ remove, push }) => (
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-800">
                      Danh hiệu và giải thưởng
                    </h2>
                    <hr className="border-t-2 border-blue-800 my-2" />
                    {values.honors_awards.map((_, index) => (
                      <Box key={index} className="mb-2 relative group">
                        <p>
                          <FormikField
                            name={`honors_awards.${index}.time`}
                            component={TextAreaField}
                            placeholder="Thời gian"
                          />
                        </p>
                        <p>
                          <FormikField
                            name={`honors_awards.${index}.award_name`}
                            component={TextAreaField}
                            placeholder="Danh hiệu"
                          />
                        </p>
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
                  </section>
                )}
              </FieldArray>

              {/* Certifications */}
              <FieldArray name="certifications">
                {({ remove, push }) => (
                  <section className="mb-8">
                    <h2 className="text-lg font-bold text-blue-800">
                      Chứng chỉ
                    </h2>
                    <hr className="border-t-2 border-blue-800 my-2" />
                    {values.certifications.map((_, index) => (
                      <Box key={index} className="mb-2 relative group">
                        <p>
                          <FormikField
                            name={`certifications.${index}.time`}
                            component={TextAreaField}
                            placeholder="Thời gian"
                          />
                        </p>
                        <p>
                          <FormikField
                            name={`certifications.${index}.certification_name`}
                            component={TextAreaField}
                            placeholder="Chứng chỉ"
                          />
                        </p>
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
                  </section>
                )}
              </FieldArray>

              {/* Interests */}
              <section className="mb-8">
                <h2 className="text-lg font-bold text-blue-800">Sở thích</h2>
                <hr className="border-t-2 border-blue-800 my-2" />
                <p>
                  <FormikField
                    name="interests"
                    component={TextAreaField}
                    placeholder="Sở thích"
                  />
                </p>
              </section>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CvTemplate2;
