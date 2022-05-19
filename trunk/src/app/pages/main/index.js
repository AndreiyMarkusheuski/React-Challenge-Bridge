import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { LOGIN_PAGE } from "../../consts";
import { logout } from "../../redux/middlewares";

import Header from "../../components/header";
import Game from "../../components/game";

import "./style.scss";

const Main = () => {
  const isUserAuth = useSelector((store) => store.isAuth);
  const balance = useSelector((store) => store.balance);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !isUserAuth && navigate(LOGIN_PAGE);
  }, [isUserAuth]);

  return (
    <div className="main">
      <Header handleClick={() => dispatch(logout())} />
      <div className="container">
        <div className="main__content">
          <div className="main__content_balance">
            <p className="text">Balance: {balance}$</p>
          </div>
          <div className="main__content_prepare">
            <p className="prepare__title">Who won?</p>
            <p className="prepare__describe">Play the game</p>
          </div>
          <Game />
        </div>
      </div>
    </div>
  );
};

export default Main;
