import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  token: localStorage.getItem("token"), // Check if a token exists in localStorage
};

const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInUser: (state, action) => {

      const { user, token } = action.payload;
      if (user && token) {
        state.user = user;
        state.isLoggedIn = true;
        state.token = token;
        localStorage.setItem("token", token); // Store the token in localStorage
      }
    },

    logOutUser: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token"); // Remove the token from localStorage
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { logInUser, logOutUser, updateUser } = Auth.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export default Auth.reducer;
