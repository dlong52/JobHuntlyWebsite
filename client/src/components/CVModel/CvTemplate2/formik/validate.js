import * as Yup from "yup";

export const validationSchema = Yup.object({
  profile: Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone_number: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  }),
  objective: Yup.string().required("Required"),
  work_experiences: Yup.array().of(
    Yup.object({
      company: Yup.string().required("Required"),
      from_date: Yup.string().required("Required"),
      to_date: Yup.string().required("Required"),
      position: Yup.string().required("Required"),
      experience_des: Yup.string().required("Required"),
    })
  ),
  projects: Yup.array().of(
    Yup.object({
      project_name: Yup.string().required("Required"),
      from_date: Yup.string().required("Required"),
      to_date: Yup.string().required("Required"),
      customer_name: Yup.string().required("Required"),
      team_size: Yup.string().required("Required"),
      position_project: Yup.string().required("Required"),
      tecnology_des: Yup.string().required("Required"),
    })
  ),
  education: Yup.array().of(
    Yup.object({
      school_name: Yup.string().required("Required"),
      from_date: Yup.string().required("Required"),
      to_date: Yup.string().required("Required"),
      courses: Yup.string().required("Required"),
      education_des: Yup.string().required("Required"),
    })
  ),
  skills: Yup.array().of(
    Yup.object({
      skill_name: Yup.string().required("Required"),
      skill_des: Yup.string().required("Required"),
    })
  ),
  honors_awards: Yup.array().of(
    Yup.object({
      time: Yup.string().required("Required"),
      award_name: Yup.string().required("Required"),
    })
  ),
  certifications: Yup.array().of(
    Yup.object({
      time: Yup.string().required("Required"),
      certification_name: Yup.string().required("Required"),
    })
  ),
  interests: Yup.string().required("Required"),
});
