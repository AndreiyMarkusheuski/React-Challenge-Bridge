import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { SET_DESC_ID, SET_REMAINIG, SET_CARDS, UPDATE_BALANCE } from "../../redux/actions";

import Card from "../card";
import Card_API from "../../services/card-api";

import { getIndexGreaterValue } from "../../helpers";

import "./style.scss";

const Game = () => {
  const [inputBid, setInputBid] = useState(0);
  const [isFliped, setFliped] = useState(false);
  const [isCardShown, setCardShown] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const { deck_id, remaining, cards } = useSelector((store) => store.card);
  const balance = useSelector((store) => store.balance);
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

  const reshuffleCards = (resRemaining) => {
    if (remaining === 0) {
      Card_API.reshuffleCards(deck_id)
        .catch((error) => {
          throw new Error(error);
        })
        .then((res) => res.json())
        .then(({ remaining }) => dispatch(SET_REMAINIG(remaining)));
    } else dispatch(SET_REMAINIG(resRemaining));
  };

  const updateBalance = (selectСardIndex) => {
    const updBalance =
      balance +
      (selectСardIndex === getIndexGreaterValue(cards) ? +inputBid*2 : -inputBid);
    dispatch(UPDATE_BALANCE(updBalance));
  };

  const controls = {
    play: () => {
      if (inputBid > 0) {
        getCards();
        setCardShown(false);
        setGameStarted(true);
      } else {
        alert("Rate must be greater than 0");
      }
    },

    choise: (selectСard) => {
      updateBalance(selectСard);
      setCardShown(true);
      setFliped(true);
    },

    playAgain: () => {
      setInputBid(0);
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
          <div className="start">
            <input
              required
              className="start__input"
              type="number"
              value={inputBid}
              onChange={(e) => {
                setInputBid(e.target.value);
              }}
            />
            <button className="start__button" onClick={() => controls.play()}>
              Play
            </button>
          </div>
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
