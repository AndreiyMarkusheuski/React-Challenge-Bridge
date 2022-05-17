import * as actions from "./actions";
import { LOGIN_STORAGE_NAME } from "../consts";

export const login = () => (dispatch) => {
  sessionStorage.setItem(LOGIN_STORAGE_NAME, true);
  dispatch(actions.LOGIN());
};

export const logout = () => (dispatch) => {
  sessionStorage.setItem(LOGIN_STORAGE_NAME, false);
  dispatch(actions.LOGOUT());
};
