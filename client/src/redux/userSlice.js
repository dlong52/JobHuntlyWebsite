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
export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
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
    resetUser: (state) => {
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
export const { updateUser, resetUser } = userSlide.actions;
export default userSlide.reducer;
