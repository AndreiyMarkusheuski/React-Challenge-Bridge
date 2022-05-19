import React from "react";
import cardBack from "../../../../assets/images/playing-card-back.png";

import "./style.scss";

const Card = ({ isFliped, cards, isCardShown, cardNumber }) => (
  <div className="card">
    <div className={`card__content ${isFliped ? "is-flipped" : ""}`}>
      <img
        src={cardBack}
        className="card__content_face card__content_face--front"
        alt="card-back"
      />
      {cards.length > 0 && isCardShown && (
        <img
          src={cards[cardNumber].image}
          className="card__content_face card__content_face--back"
          alt="card-front"
        />
      )}
    </div>
  </div>
);

export default Card;
