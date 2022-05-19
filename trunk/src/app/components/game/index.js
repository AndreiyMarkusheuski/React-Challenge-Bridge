import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { SET_DESC_ID, WIN_BALANCE, LOST_BALANCE } from "../../redux/actions";

import Popup from "../popup";

import Controls from "./gameControls";
import Card from "./gameCard";

import Card_API from "../../services/card-api";

import {
  getWinPrize,
  getWinGameText,
  getLostGameText,
  isSelectCardWin,
} from "../../helpers";

import "./style.scss";

const Game = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  const [inputBid, setInputBid] = useState(0);

  const [isCardFliped, setCardFliped] = useState(false);
  const [isCardShown, setCardShown] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const [cards, setCards] = useState([]);
  const { deck_id } = useSelector((store) => store.card);
  const dispatch = useDispatch();

  useEffect(() => {
    Card_API.getDesk()
      .catch((error) => {
        throw new Error(error);
      })
      .then((res) => res.json())
      .then(({ deck_id }) => {
        dispatch(SET_DESC_ID(deck_id));
      });
  }, []);

  const getCards = () => {
    Card_API.getCards(deck_id)
      .catch((error) => {
        throw new Error(error);
      })
      .then((res) => res.json())
      .then(({ cards, remaining }) => {
        setCards(cards);
        reshuffleCards(remaining);
      });
  };

  const reshuffleCards = (resRemaining) => {
    if (resRemaining === 0) {
      Card_API.reshuffleCards(deck_id)
        .catch((error) => {
          throw new Error(error);
        })
        .then((res) => res.json())
        .then((res) => console.log(`status of remaining: ${res.remaining}`));
    }
  };

  const setResult = (selectСardIndex) => {
    let gameResultText;
    let dispatchBalance;
    if (isSelectCardWin(cards, selectСardIndex)) {
      dispatchBalance = WIN_BALANCE(getWinPrize(inputBid));
      gameResultText = getWinGameText(inputBid);
    } else {
      dispatchBalance = LOST_BALANCE(inputBid);
      gameResultText = getLostGameText(inputBid);
    }
    dispatch(dispatchBalance);
    setPopupText(gameResultText);
    setShowPopup(true);
  };

  const controls = {
    play: () => {
      getCards();
      setCardShown(false);
      setGameStarted(true);
    },

    choise: (selectСard) => {
      if (inputBid > 0) {
        setResult(selectСard);
        setCardShown(true);
        setCardFliped(true);
      } else {
        alert("Rate must be greater than 0");
      }
    },

    playAgain: () => {
      setInputBid(0);
      setCardFliped(false);
      setGameStarted(false);
    },
  };

  return (
    <div className="game">
      <Card
        isFliped={isCardFliped}
        cards={cards}
        isCardShown={isCardShown}
        cardNumber={0}
      />
      <Controls
        isGameStarted={isGameStarted}
        isCardFliped={isCardFliped}
        inputBid={inputBid}
        setInputBid={setInputBid}
        controls={controls}
      />
      <Card
        isFliped={isCardFliped}
        cards={cards}
        isCardShown={isCardShown}
        cardNumber={1}
      />
      {showPopup && popupText.length > 0 && (
        <Popup text={popupText} closePopup={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Game;
