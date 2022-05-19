import {
  CARD_WEIGHT,
  VALUE_SUIT,
  COEFFICIENT,
  WIN_TEXT,
  LOST_TEXT,
} from "../consts";

const getCardValue = (card) => CARD_WEIGHT.indexOf(card.value);

const getSuitValue = (card) => VALUE_SUIT[card.suit];

const getIndexGreaterValue = (cards) => {
  const [firstCard, secondCard] = cards;

  let valueOfFirst = getCardValue(firstCard);
  let valueOfSecond = getCardValue(secondCard);

  if (valueOfFirst === valueOfSecond) {
    valueOfFirst *= getSuitValue(firstCard);
    valueOfSecond *= getSuitValue(secondCard);
  }
  return valueOfFirst > valueOfSecond ? 0 : 1;
};

export const isSelectCardWin = (cards, selectСardIndex) =>
  selectСardIndex === getIndexGreaterValue(cards);

export const getWinPrize = (value) => value * COEFFICIENT;

export const getLostGameText = (inputBid) => `${LOST_TEXT} ${inputBid}$`;

export const getWinGameText = (inputBid) =>
  `${WIN_TEXT} ${getWinPrize(inputBid)}$`;
