import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUserState} from "./user.interface";
import AuthService from "../../../services/auth/auth.service";

interface IRegisterProps {
    username: string
    password: string
    displayName: string
}

interface ILoginProps {
    username: string
    password: string
}

interface ILoginResponse {
    "accessToken": string,
    "refreshToken": string
}
export const register = createAsyncThunk<IUserState, IRegisterProps>(
    "auth/register",
    async ({username, password, displayName}, thunkAPI) => {
        try {
            const response = await AuthService.register(username, password, displayName);

            return response.data
        } catch (error: any){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const login = createAsyncThunk<ILoginResponse, ILoginProps>(
    "auth/login",
    async ({username, password}, thunkAPI) => {
        try {
            const response = await AuthService.login(username, password);

            return response.data
        }  catch (error: any){
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = await AuthService.logout();

            return response.data
        }  catch (error: any){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)
