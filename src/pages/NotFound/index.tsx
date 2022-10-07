import "../../styles/index.scss";

const NotFound = () => {
  return (
    <div className="error-found__page">
      <span className="error-found__page-code">404</span>
      <br />
      <p>Sorry, the page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
