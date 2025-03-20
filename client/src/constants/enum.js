export const EmploymentType = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  INTERN: "intern",
};
export const cvTheme = {
  "MODERN-THEME": "MODERN-THEME",
  "POLITE-THEME": "POLITE-THEME",
  "DELICATE-THEME": "DELICATE-THEME",
};
export const PACKAGE_CODE = {
  ECO: "eco",
  PRO: "pro",
  MAX: "max",
  MAX_PLUS: "max_plus",
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
export const GENDER = {
  MALE: "male",
  FEMALE: "female",
};
export const APPLICANT_STATUS = {
  UNDER_REVIEW: "under_review",
  SUITABLE: "suitable",
  ACCEPTED: "accept",
  REJECTED: "rejected",
  INTERVIEW: "interview",
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
  {
    label: "Hẹn phỏng vấn",
    value: APPLICANT_STATUS.INTERVIEW,
  },
];
export const exps = {
  NOT_REQUIRE: "not_required",
  UNDER_ONE_YEAR: "under_1_year",
  ONE_YEAR: "1_year",
  TWO_YEAR: "2_years",
  THREE_YEAR: "three_years",
  FOUR_YEAR: "4_years",
  FIVE_YEAR: "five_years",
  OVER_FIVE_YEAR: "over_5_years",
};
export const experienceOptions = [
  {
    label: "Tất cả",
    value: "",
  },
  {
    label: "Không yêu cầu",
    value: exps.NOT_REQUIRE,
  },
  {
    label: "Dưới 1 năm",
    value: exps.UNDER_ONE_YEAR,
  },
  {
    label: "1 năm",
    value: exps.ONE_YEAR,
  },
  {
    label: "2 năm",
    value: exps.TWO_YEAR,
  },
  {
    label: "3 năm",
    value: exps.THREE_YEAR,
  },
  {
    label: "4 năm",
    value: exps.FOUR_YEAR,
  },
  {
    label: "5 năm",
    value: exps.FIVE_YEAR,
  },
  {
    label: "Trên 5 năm",
    value: exps.OVER_FIVE_YEAR,
  },
];
export const salaryOptions = [
  {
    label: "Tất cả",
    value: JSON.stringify({
      min: "",
      max: "",
    }),
  },
  {
    label: "Thỏa thuận",
    value: JSON.stringify({
      min: "0",
      max: "0",
    }),
  },
  {
    label: "Dưới 10 triệu",
    value: JSON.stringify({
      min: "",
      max: 10000000,
    }),
  },
  {
    label: "10 - 15 triệu",
    value: JSON.stringify({
      min: 10000000,
      max: 15000000,
    }),
  },
  {
    label: "15 - 20 triệu",
    value: JSON.stringify({
      min: 15000000,
      max: 20000000,
    }),
  },
  {
    label: "20 - 25 triệu",
    value: JSON.stringify({
      min: 20000000,
      max: 25000000,
    }),
  },
  {
    label: "25 - 30 triệu",
    value: JSON.stringify({
      min: 25000000,
      max: 30000000,
    }),
  },
  {
    label: "30 - 50 triệu",
    value: JSON.stringify({
      min: 30000000,
      max: 50000000,
    }),
  },
  {
    label: "Trên 50 triệu",
    value: JSON.stringify({
      min: 50000000,
      max: "",
    }),
  },
];
