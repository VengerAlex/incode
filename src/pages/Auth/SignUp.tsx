import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {PAGE, ROUTES} from "../../utils";
import Input from "../../shared/UI/Input";
import PasswordInput from "../../shared/UI/PasswordInput";

import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {register} from "../../redux/reducers/user/user.actions";
import {useAppSelector} from "../../hooks/useAppSelector";

interface ISignUp {
    pageHandler: (page: PAGE) => void
}

export interface ISignUpData {
    fullName: string,
    username: string,
    password: string,
    confirmedPassword: string
}

const SignUp: FC<ISignUp> = ({pageHandler}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {isLoading, errorSignUp, user} = useAppSelector(state => state.user);

    const isAuth = localStorage.getItem("accessToken");
    const { control, handleSubmit, formState: { errors }, reset, watch} = useForm<ISignUpData>({mode: 'onChange'});

    const [password, confirmedPassword] = watch(["password", "confirmedPassword"])
    const isTheSamePassword = password === confirmedPassword;

    const onSubmit = async (data: ISignUpData) => {
        const {username, password, fullName: displayName} = data;

        dispatch(register({username, password, displayName}))

        reset()
    }


    if (isAuth || user){
        navigate(ROUTES.Home)
    }

    return (
        <div className="sign" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="title">Sign Up</h2>

            <form className="sign__form">
                <Input
                    name="fullName"
                    control={control}
                    title="Full Name"
                />
                {errors?.fullName && <p className="error">FullName is required and min length is 6</p>}
                <Input
                    name="username"
                    control={control}
                    title="User Name"
                />
                {errors?.username && <p className="error">Username is required and min length is 6</p>}
                <PasswordInput
                    name="password"
                    control={control}
                    title="Password"
                />
                {errors?.password && <p className="error">Password must be at least 8 characters long</p>}
                <PasswordInput
                    name="confirmedPassword"
                    control={control}
                    title="Confirm Password"
                />
                {errors?.confirmedPassword && <p className="error">Password must be at least 8 characters long</p>}
                {!isTheSamePassword && <p className="error">Password should match</p>}
                <button
                    disabled={!isTheSamePassword}
                    type="submit"
                    className="button sign__form-button">
                    {isLoading ? "Loading" : "Sign Up"}
                </button>
                {errorSignUp &&  <p className="error">{errorSignUp}</p>}
            </form>

            <div
                className="sign__no-account">
                I have an account. <a onClick={() => pageHandler(PAGE.SignIn)}>Go to Sign in</a>
            </div>
        </div>
    );
};

export default SignUp
