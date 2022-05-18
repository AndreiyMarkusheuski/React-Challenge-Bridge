import { CARD_WEIGHT, VALUE_SUIT } from "../consts";

const getCardValue = (card) => CARD_WEIGHT.indexOf(card.value);

const getSuitValue = (card) => VALUE_SUIT[card.suit];

export const getIndexGreaterValue = (cards) => {
  const [firstCard, secondCard] = cards;

  let valueOfFirst = getCardValue(firstCard);
  let valueOfSecond = getCardValue(secondCard);

  if (valueOfFirst === valueOfSecond) {
    valueOfFirst *= getSuitValue(firstCard);
    valueOfSecond *= getSuitValue(secondCard);
  }
  return valueOfFirst > valueOfSecond ? 0 : 1;
};
