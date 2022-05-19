import * as actions from "./actionTypes";
import { LOGIN_STORAGE_NAME } from "../consts";

const initState = {
  isAuth: sessionStorage.getItem(LOGIN_STORAGE_NAME) || false,
  balance: 0,
  card: {
    deck_id: null,
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, isAuth: true };
    case actions.LOGOUT:
      return { ...state, isAuth: false };
    case actions.WIN_BALANCE:
      return { ...state, balance: state.balance + action.value };
    case actions.LOST_BALANCE:
      return { ...state, balance: state.balance - action.value };
    case actions.SET_DESC_ID: {
      const copy = { ...state };
      copy.card = { ...copy.card, deck_id: action.value };
      return copy;
    }
    default:
      return state;
  }
};

export default reducer;
