import React from "react";

import "./style.scss";

const Header = ({ handleClick }) => (
  <header className="header">
    <div className="container">
      <div className="header__content">
        <p className="header__content_title">Bridge</p>
        <button onClick={handleClick} className="header__content_button">
          SignOut
        </button>
      </div>
    </div>
  </header>
);

export default Header;
