import * as actions from "./actionTypes";
import { LOGIN_STORAGE_NAME } from "../consts";

const initState = {
  isAuth: sessionStorage.getItem(LOGIN_STORAGE_NAME) || false,
  balance: 0,
  card: {
    deck_id: null,
    remaining: null,
    cards: [],
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, isAuth: true };
    case actions.LOGOUT:
      return { ...state, isAuth: false };
    case actions.UPDATE_BALANCE:
      return { ...state, balance: action.value };
    case actions.SET_DESC_ID: {
      const copy = { ...state };
      copy.card = { ...copy.card, deck_id: action.value };
      return copy;
    }
    case actions.SET_REMAINIG: {
      const copy = { ...state };
      copy.card = { ...copy.card, remaining: action.value };
      return copy;
    }
    case actions.SET_CARDS: {
      const copy = { ...state };
      copy.card = { ...copy.card, cards: action.value };
      return copy;
    }
    default:
      return state;
  }
};

export default reducer;
