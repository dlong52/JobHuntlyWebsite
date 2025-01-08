import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  username: "",
  email: "",
  address: "",
  phone_number: "",
  image: "",
  accessToken: "",
  role: "",
  isLoading: false,
};
export const employerSlide = createSlice({
  name: "employer",
  initialState,
  reducers: {
    updateEmployer: (state, action) => {
      const {_id, profile, email, accessToken, role } = action.payload;
      state.user_id = _id;
      state.username = profile?.name || email;
      state.email = email;
      state.address = "";
      state.image = "";
      state.phone_number = "";
      state.accessToken = accessToken;
      state.role = role;
    },
    resetEmployer: (state) => {
      state.user_id = null;
      state.username = null;
      state.email = null;
      state.address = null;
      state.phone_number = null;
      state.accessToken = null;
      state.image = null;
      state.role = null;
    },
  },
});
export const { updateEmployer, resetEmployer } = employerSlide.actions;
export default employerSlide.reducer;
