import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ILoginProps,
  ITokens,
  IRegisterProps,
  IRegisterResponse,
} from "./user.interface";
import AuthService from "../../../services/auth/auth.service";

export const register = createAsyncThunk<IRegisterResponse, IRegisterProps>(
  "auth/register",
  async ({ username, password, displayName }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        username,
        password,
        displayName,
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const login = createAsyncThunk<ITokens, ILoginProps>(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(username, password);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await AuthService.logout();

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
