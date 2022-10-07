import { createSlice } from "@reduxjs/toolkit";

import { IUserInitialState } from "./user.interface";
import { login, logout, register } from "./user.actions";
import { RootState } from "../../index";

const initialState: IUserInitialState = {
  user: null,
  isLoading: false,
  errorSignIn: "",
  errorSignUp: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.user = payload;
        state.errorSignUp = "";
        state.errorSignIn = "";
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
        state.errorSignUp = payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;

        state.errorSignUp = "";
        state.errorSignIn = "";
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorSignIn = payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const getUserState = (state: RootState) => state.user;

export default userSlice.reducer;
