
const EmploymentType = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  INTERN: "intern",
};
export const employmentTypeOptions = [
  {
    label: "Toàn thời gian",
    value: EmploymentType.FULL_TIME,
  },
  {
    label: "Bán thời gian",
    value: EmploymentType.PART_TIME,
  },
  {
    label: "Thực tập",
    value: EmploymentType.INTERN,
  },
];

export const genderOptions = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
];
export const STATUS_APPLICANT = {
  UNDER_REVIEW: "under_review",
  SUITABLE: "suitable",
  ACCEPT: "accept",
  REJECTED: "rejected",
};
export const ROLE = {
  ALL: "ALL",
  ADMIN: "ADMIN",
  EMPLOYER: "EMPLOYER",
  CANDIDATE: "CANDIDATE",
};
export const APPLICANT_STATUS = {
  UNDER_REVIEW: "under_review",
  SUITABLE: "suitable",
  ACCEPTED: "accept",
  REJECTED: "rejected",
};

export const applicantStatusOptions = [
  {
    label: "Đang xem xét",
    value: APPLICANT_STATUS.UNDER_REVIEW,
  },
  {
    label: "Chưa phù hợp",
    value: APPLICANT_STATUS.REJECTED,
  },
  {
    label: "Phù hợp",
    value: APPLICANT_STATUS.SUITABLE,
  },
  {
    label: "Nhận việc",
    value: APPLICANT_STATUS.ACCEPTED,
  },
];

export const experienceOptions = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Không yêu cầu",
    value: "not_required",
  },
  {
    label: "Dưới 1 năm",
    value: "under_1_year",
  },
  {
    label: "1 năm",
    value: "1_year",
  },
  {
    label: "2 năm",
    value: "2_years",
  },
  {
    label: "3 năm",
    value: "three_years",
  },
  {
    label: "4 năm",
    value: "4_years",
  },
  {
    label: "5 năm",
    value: "five_years",
  },
  {
    label: "Trên 5 năm",
    value: "over_5_years",
  },
];
export const salaryOptions = [
  {
    label: "Tất cả",
    value: {
      min: null,
      max: null,
    },
  },
  {
    label: "Dưới 10 triệu",
    value: {
      min: null,
      max: 10000000,
    },
  },
  {
    label: "10 - 15 triệu",
    value: {
      min: 10000000,
      max: 15000000,
    },
  },
  {
    label: "15 - 20 triệu",
    value: {
      min: 15000000,
      max: 20000000,
    },
  },
  {
    label: "20 - 25 triệu",
    value: {
      min: 20000000,
      max: 25000000,
    },
  },
  {
    label: "25 - 30 triệu",
    value: {
      min: 25000000,
      max: 30000000,
    },
  },
  {
    label: "30 - 50 triệu",
    value: {
      min: 30000000,
      max: 50000000,
    },
  },
  {
    label: "Trên 50 triệu",
    value: {
      min: 50000000,
      max: null,
    },
  },
];
