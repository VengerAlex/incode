import React, {FC, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import {PAGE, ROUTES} from "../../utils";
import Input from "../../shared/UI/Input";
import PasswordInput from "../../shared/UI/PasswordInput";

import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {register} from "../../redux/reducers/user/user.actions";
import {useAppSelector} from "../../hooks/useAppSelector";
import useFormFocus from "../../hooks/useFormFocus";
import {getUserState} from "../../redux/reducers/user/userSlice";
import localstorageService from "../../services/localstorage/localstorage.service";

interface ISignUp {
    pageHandler: (page: PAGE) => void
}

interface ISignUpForm {
    fullName: string,
    username: string,
    password: string,
    confirmedPassword: string
}

const SignUp: FC<ISignUp> = ({pageHandler}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = localstorageService.get("accessToken");
    const {isLoading, errorSignUp, user} = useAppSelector(getUserState);

    const {
        control, handleSubmit,
        formState: {errors, isValid, isSubmitSuccessful},
        reset, watch, setFocus
    } = useForm<ISignUpForm>({mode: 'onChange'});

    const [password, confirmedPassword] = watch(["password", "confirmedPassword"])
    const isTheSamePassword = password === confirmedPassword;

    const onSubmit = async (data: ISignUpForm) => {
        const {username, password, fullName: displayName} = data;

        dispatch(register({username, password, displayName}))

        isSubmitSuccessful && reset()
    }

    useFormFocus(() => setFocus("fullName"))

    if (user) {
        navigate(ROUTES.Home)
    }

    const displayErrorHandler = (key: keyof ISignUpForm, msg: string) => errors?.[key] &&
        <p className="error">{msg}</p>;

    return (
        <div className="sign" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="title">Sign Up</h2>

            <form className="sign__form">
                <Input
                    name="fullName"
                    control={control}
                    title="Full Name"
                />
                {displayErrorHandler("fullName", "FullName is required and min length is 6")}
                <Input
                    name="username"
                    control={control}
                    title="User Name"
                />
                {displayErrorHandler("username", "Username is required and min length is 6")}
                <PasswordInput
                    name="password"
                    control={control}
                    title="Password"
                />
                {displayErrorHandler("password", "Password must be at least 8 characters long")}
                <PasswordInput
                    name="confirmedPassword"
                    control={control}
                    title="Confirm Password"
                />
                {displayErrorHandler("confirmedPassword", "Password must be at least 8 characters long")}
                {!isTheSamePassword && <p className="error">Password should match</p>}
                <button
                    disabled={!isTheSamePassword || !isValid}
                    type="submit"
                    className="button sign__form-button">
                    {isLoading ? "Loading" : "Sign Up"}
                </button>
                {errorSignUp && <p className="error">{errorSignUp}</p>}
            </form>

            <div
                className="sign__no-account">
                I have an account. <a onClick={() => pageHandler(PAGE.SignIn)}>Go to Sign in</a>
            </div>
        </div>
    );
};

export default SignUp
