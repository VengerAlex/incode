import {FC, useEffect} from 'react';
import "../../styles/index.scss";
import Input from "../../shared/UI/Input";
import PasswordInput from "../../shared/UI/PasswordInput";
import {PAGE, ROUTES} from "../../utils";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {login} from "../../redux/reducers/user/user.actions";
import {useAppSelector} from "../../hooks/useAppSelector";
import useFormFocus from "../../hooks/useFormFocus";
import {getUserState} from "../../redux/reducers/user/userSlice";
import localstorageService from "../../services/localstorage/localstorage.service";
import {useActions} from "../../hooks/useActions";

interface ISignIn {
    pageHandler: (page: PAGE) => void
}

interface ISignInForm {
    username: string,
    password: string
}

const SignIn: FC<ISignIn> = ({pageHandler}) => {
    const {login} = useActions()
    const navigate = useNavigate();
    const {isLoading, errorSignIn} = useAppSelector(getUserState);
    const isAuth = localstorageService.get("accessToken");

    const {
        control, handleSubmit,
        formState: {errors, isValid, isSubmitSuccessful},
        reset, setFocus
    } = useForm<ISignInForm>({mode: 'onChange'});


    const onSubmit = async (data: ISignInForm) => {
        login({...data})

        isSubmitSuccessful && reset()
    }

    useFormFocus(() => setFocus("username"))

    if (isAuth){
        navigate(ROUTES.Home)
    }

    const displayErrorHandler = (key: keyof ISignInForm, msg: string) => errors?.[key] && <p className="error">{msg}</p>;

    return (
        <div className="sign">
            <h2 className="title">Sign In</h2>

            <form className="sign__form" onSubmit={handleSubmit(onSubmit)}>
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
                <button
                    disabled={!isValid}
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