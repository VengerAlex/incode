import React, {FC} from 'react';
import "../../styles/index.scss";
import Input from "../../shared/UI/Input";
import PasswordInput from "../../shared/UI/PasswordInput";
import {PAGE, ROUTES} from "../../utils";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {login} from "../../redux/reducers/user/user.actions";
import {useAppSelector} from "../../hooks/useAppSelector";

interface ISignIn {
    pageHandler: (page: PAGE) => void
}

interface ISignInForm {
    username: string,
    password: string
}

const SignIn: FC<ISignIn> = ({pageHandler}) => {
    const {isLoading, errorSignIn} = useAppSelector(state => state.user);
    const {control, handleSubmit, formState: {errors}, reset} = useForm<ISignInForm>({mode: 'onChange'});
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isAuth = localStorage.getItem("accessToken");

    const onSubmit = async (data: ISignInForm) => {
        dispatch(login({...data}))

        reset()
    }

    const isDisabled = !!errors?.username?.type || !!errors?.password?.type;

    if (isAuth){
        navigate(ROUTES.Home)
    }

    return (
        <div className="sign">
            <h2 className="title">Sign In</h2>

            <form className="sign__form" onSubmit={handleSubmit(onSubmit)}>
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
                <button
                    disabled={isDisabled}
                    type="submit"
                    className="button sign__form-button">
                    {isLoading ? "LOADING" : "Sign Up"}
                </button>
                {errorSignIn && <p className="error">{errorSignIn}</p>}
            </form>

            <div className="sign__no-account">Don’t have account yet? <a onClick={() => pageHandler(PAGE.SignUp)}>New
                Account</a></div>
        </div>
    );
};

export default SignIn;