import * as actions from "./actionTypes";

export const LOGIN = () => ({
  type: actions.LOGIN,
});
export const LOGOUT = () => ({
  type: actions.LOGOUT,
});
export const UPDATE_BALANCE = (value) => ({
  type: actions.UPDATE_BALANCE,
  value,
});
export const SET_DESC_ID = (value) => ({
  type: actions.SET_DESC_ID,
  value,
});
export const SET_REMAINIG = (value) => ({
  type: actions.SET_REMAINIG,
  value,
});
export const SET_CARDS = (value) => ({
  type: actions.SET_CARDS,
  value,
});