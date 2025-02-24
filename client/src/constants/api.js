// Base API URL
export const BASE_URL = import.meta.env.VITE_API;

export const apiURL = {
  // AUTH
  SIGN_IN: BASE_URL + "/auth/sign-in",
  SIGN_IN_GOOGLE: BASE_URL + "/auth/sign-in-google",
  SIGN_UP: BASE_URL + "/auth/sign-up",
  REFRESH_TOKEN: BASE_URL + "/auth/refresh-token",
  LOG_OUT: BASE_URL + "/auth/log-out",
  CHANGE_PASSWORD: BASE_URL + "/auth/change-password",
  // MODULES
  CATEGORY: BASE_URL + "/category",
  LEVEL: BASE_URL + "/level",
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
  ROLE: BASE_URL + "/role",
  CV: BASE_URL + "/cv",
  CV_THEME: BASE_URL + "/cv-theme",
  PAYMENT: BASE_URL + "/payment",
  SUBSCRIPTION: BASE_URL + "/subscription",
  OVERVIEW: BASE_URL + "/overview",
  VN_PAY: BASE_URL + "/vnpay",
};
