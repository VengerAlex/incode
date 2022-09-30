import "../../styles/index.scss";

const NotFound = () => {
    return (
        <div className="not-found">
            <span className="not-found__code">404</span>
            <br/>
            <p>Sorry, the page you're looking for doesn't exist.</p>
        </div>
    );
};

export default NotFound;