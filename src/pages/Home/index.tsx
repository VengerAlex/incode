import React, {useEffect} from 'react';
import "../../styles/index.scss";
import IMAGE from "../../assets/feedback-image.png";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../utils";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {logout} from "../../redux/reducers/user/user.actions";
import {useAppSelector} from "../../hooks/useAppSelector";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {user} = useAppSelector(state => state.user);
    const isAuth = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!isAuth && !user){
            navigate(ROUTES.Auth)
        }
    }, [])


    const logoutHandler = () => {
        dispatch(logout())

        navigate(ROUTES.Auth)
    }

    return (
        <section className="greetings">
           <h2 className="title greetings__title">Congratulations</h2>
           <p>Now you are on the main page. Soon we will provide you with detailed feedback on the result of your work</p>
           <button onClick={logoutHandler}  className="button">LogOut</button>
           <img src={IMAGE} alt="feedback-image"/>
        </section>
    );
};

export default Home;