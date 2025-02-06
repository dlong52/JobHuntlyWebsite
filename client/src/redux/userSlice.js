import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  username: "",
  email: "",
  address: "",
  phone_number: "",
  avatar_url: "",
  access_token: "",
  role: "",
  isLoading: false,
  company_name: "",
  company_id: "",
  company_url: "",
  company_logo_url: "",
  company_phone_number: "",
  company_cover: "",
  company_description: "",
  company_introduce: "",
  company_website: "",
  company_staff_quantity: "",
  company_address: {},
};
export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { _id, profile, email, access_token, role, company } =
        action.payload;
      state.user_id = _id;
      state.username = profile?.name || email;
      state.email = email;
      state.address = "";
      state.avatar_url = profile?.avatar_url || "";
      state.phone_number = profile?.phone_number || "";
      state.access_token = access_token;
      state.role = role.name || "";
      state.company_id = company?._id || "";
      state.company_name = company?.name || "";
      state.company_url = company?.website || "";
      state.company_logo_url = company?.logo || "";
      state.company_address = company?.address || "";
      state.company_phone_number = company?.phone || "";
      state.company_cover = company?.cover || "";
      state.company_description = company?.description || "";
      state.company_introduce = company?.introduce || "";
      state.company_staff_quantity = company?.staff_quantity || "";
    },
    resetUser: (state) => {
      state.user_id = null;
      state.username = null;
      state.email = null;
      state.address = null;
      state.phone_number = null;
      state.access_token = null;
      state.avatar_url = null;
      state.role = null;
      state.company_name = null;
      state.company_url = null;
      state.company_logo_url = null;
      state.company_address = null;
      state.company_phone_number = null;
    },
  },
});
export const { updateUser, resetUser } = userSlide.actions;
export default userSlide.reducer;
