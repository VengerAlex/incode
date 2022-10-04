import {Link, useNavigate} from "react-router-dom";

import {ROUTES} from "../../utils";
import {logout} from "../../redux/reducers/user/user.actions";

import "../../styles/index.scss";
import IMAGE from "../../assets/feedback-image.png";
import {useActions} from "../../hooks/useActions";

const Home = () => {
    const {logout} = useActions();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();

        navigate(ROUTES.Auth)
    }

    return (
        <section className="greetings">
            <Link to={"/setting"}>CHANGE PASSWORD</Link>
           <h2 className="title greetings__title">Congratulations</h2>
           <p>Now you are on the main page. Soon we will provide you with detailed feedback on the result of your work</p>
           <button onClick={logoutHandler}  className="button">LogOut</button>
           <img src={IMAGE} alt="feedback-image"/>
        </section>
    );
};

export default Home;