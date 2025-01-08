export const initialValues = {
  profile: {
    name: "",
    position: "",
    email: "",
    phone_number: "",
    address: "",
  },
  objective: "",
  work_experiences: [
    {
      company: "",
      from_date: "",
      to_date: "",
      position: "",
      experience_des: "",
    },
  ],
  projects: [
    {
      project_name: "",
      from_date: "",
      to_date: "",
      customer_name: "",
      team_size: "",
      position_project: "",
      tecnology_des: "",
    },
  ],
  education: [
    {
      school_name: "",
      from_date: "",
      to_date: "",
      courses: "",
      education_des: "",
    },
  ],
  skills: [
    {
      skill_name: "",
      skill_des: "",
    },
  ],
  interests: "",
  references: [
    {
      references_des: "",
    },
  ],
  activities: [
    {
      organization_name: "",
      from_date: "",
      to_date: "",
      position: "",
      activity_des: "",
    },
  ],
  certifications: [
    {
      time: "",
      certification_name: "",
    },
  ],
  honors_awards: [
    {
      time: "",
      award_name: "",
    },
  ],
  additional_information: [""],
};
