// Base API URL
export const BASE_URL = import.meta.env.VITE_API;
// Auth API URL
export const SIGN_IN = BASE_URL + "/auth/sign-in";
export const SIGN_UP = BASE_URL + "/auth/sign-up";
export const SIGN_OUT = BASE_URL + "/auth/sign-out";
// User API URL
export const USER = BASE_URL + "/user";
// Job API URL
// export const JOB = BASE_URL + "/user";
// Category API URL
export const CATEGORY = BASE_URL + "/category";
export const apiURL = {
  NOTIFICATION: BASE_URL + "/notify",
  COMPANY: BASE_URL + "/company",
  APPLICATION: BASE_URL + "/application",
  SEND_EMAIL: BASE_URL + "/nodemailer",
  CONVERSATION: BASE_URL + "/conversation",
  MESSAGE: BASE_URL + "/message",
  USER: BASE_URL + "/user",
  POST: BASE_URL + "/job",
  PACKAGE: BASE_URL + "/package",
  WISH_LIST: BASE_URL + "/wishlist",
  VN_PAY: BASE_URL + "/vnpay",
  ROLE: BASE_URL + "/role",
};
