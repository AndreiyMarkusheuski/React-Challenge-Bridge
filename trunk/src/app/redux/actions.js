import * as actions from "./actionTypes";

export const LOGIN = () => ({
  type: actions.LOGIN,
});
export const LOGOUT = () => ({
  type: actions.LOGOUT,
});
export const WIN_BALANCE = (value) => ({
  type: actions.WIN_BALANCE,
  value,
});
export const LOST_BALANCE = (value) => ({
  type: actions.LOST_BALANCE,
  value,
});
export const SET_DESC_ID = (value) => ({
  type: actions.SET_DESC_ID,
  value,
});
