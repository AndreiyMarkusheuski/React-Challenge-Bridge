import React, { useState, useEffect, useCallback } from "react";
import {
  SUCCESS_LOGIN_DATA,
  MAIN_PAGE,
} from "../../consts";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/middlewares";

import "./style.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isUserAuth = useSelector((store) => store.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDataValid = useCallback(() => {
    if (username.length < 1 || password.length < 1) {
      return false;
    } else if (
      SUCCESS_LOGIN_DATA.username !== username ||
      SUCCESS_LOGIN_DATA.password !== password
    ) {
      alert("The username or password entered is incorrect");
      return false;
    } else {
      return true;
    }
  });

  useEffect(() => {
    isUserAuth && navigate(MAIN_PAGE);
  }, [isUserAuth]);

  return (
    <div className="login">
      <div className="login__form">
        <h1 className="login__form_headline">Sign in to your account</h1>
        <input
          className="login__form_input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Login"
        />
        <input
          className="login__form_input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        <button
          className="login__form_button"
          onClick={() => {
            isDataValid() && dispatch(login());
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
