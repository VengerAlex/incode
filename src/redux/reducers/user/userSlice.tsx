import {createSlice} from "@reduxjs/toolkit";

import {IUserInitialState} from "./user.interface";
import {login, logout, register} from "./user.actions";

const initialState: IUserInitialState = {
    user: null,
    isLoading: false,
    errorSignIn: "",
    errorSignUp: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, {payload}) => {
                state.isLoading = false

                console.log(payload, "PAYLOAD")
                state.user = payload
                state.errorSignUp = ""
                state.errorSignIn = ""
            })
            .addCase(register.rejected, (state, {payload}) => {
                state.isLoading = false
                state.errorSignUp = payload as string
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.isLoading = false

                localStorage.setItem("accessToken", payload.accessToken);
                state.user = payload
                state.errorSignUp = ""
                state.errorSignIn = ""
            })
            .addCase(login.rejected, (state, {payload}) => {
                console.log("payload", payload)
                state.isLoading = false
                state.errorSignIn = payload as string
            })

            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.user = null
                localStorage.removeItem("accessToken")
            })
            .addCase(logout.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export const {} = userSlice.actions;
export default userSlice.reducer;