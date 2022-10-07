import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils";

const Header = () => {
  return (
    <header className="header">
      <Link to={ROUTES.Home}>
        <h1 className="title header__title">InCode</h1>
        <span className="header__subtitle">Finance</span>
      </Link>
    </header>
  );
};

export default Header;
