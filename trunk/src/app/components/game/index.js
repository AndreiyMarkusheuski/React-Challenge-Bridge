import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../card";

import { SET_DESC_ID, SET_REMAINIG, SET_CARDS } from "../../redux/actions";
import Card_API from "../../services/card-api";

import "./style.scss";

const Game = () => {
  const [isFliped, setFliped] = useState(false);
  const [isCardShown, setCardShown] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [selectedCard, setSelectedСard] = useState(null);
  const { deck_id, remaining, cards } = useSelector((store) => store.card);
  const dispatch = useDispatch();

  useEffect(() => {
    Card_API.getDesk()
      .catch((error) => {
        throw new Error(error);
      })
      .then((res) => res.json())
      .then(({ deck_id, remaining }) => {
        dispatch(SET_DESC_ID(deck_id));
        reshuffleCards(remaining);
      });
  }, []);

  const getCards = () => {
    Card_API.getCards(deck_id)
      .catch((error) => {
        throw new Error(error);
      })
      .then((res) => res.json())
      .then(({ cards, remaining }) => {
        dispatch(SET_CARDS(cards));
        reshuffleCards(remaining);
      });
  };

  const reshuffleCards = (resRemainig) => {
    if (remaining === 0) {
      Card_API.reshuffleCards(deck_id)
        .catch((error) => {
          throw new Error(error);
        })
        .then((res) => res.json())
        .then(({ remaining }) => dispatch(SET_REMAINIG(remaining)));
    } else dispatch(SET_REMAINIG(resRemainig));
  };

  const controls = {
    play: () => {
      getCards();
      setCardShown(false);
      setGameStarted(true);
    },

    choise: (selectСard) => {
      setSelectedСard(selectСard);
      setCardShown(true);
      setFliped(true);
    },

    playAgain: () => {
      setFliped(false);
      setGameStarted(false);
    },
  };

  return (
    <div className="game">
      <Card
        isFliped={isFliped}
        cards={cards}
        isCardShown={isCardShown}
        cardNumber={0}
      />
      <div className="game__buttons">
        {!isGameStarted && (
          <button onClick={() => controls.play()}>Play</button>
        )}

        {isGameStarted && !isFliped && (
          <button onClick={() => controls.choise(0)}>Left</button>
        )}

        {isGameStarted && !isFliped && (
          <button onClick={() => controls.choise(1)}>Right</button>
        )}

        {isGameStarted && isFliped && (
          <button onClick={() => controls.playAgain()}>Play one more</button>
        )}
      </div>
      <Card
        isFliped={isFliped}
        cards={cards}
        isCardShown={isCardShown}
        cardNumber={1}
      />
    </div>
  );
};

export default Game;
