import React from "react";

import "./style.scss";

const Controls = ({
  isGameStarted,
  isCardFliped,
  inputBid,
  setInputBid,
  controls,
}) => (
  <div className="controls">
    {!isGameStarted && (
      <div className="controls_start">
        <button onClick={() => controls.play()}>Play</button>
      </div>
    )}

    {isGameStarted && !isCardFliped && (
      <div className="controls_choise">
        <button onClick={() => controls.choise(0)}>Left</button>
        <div className="choise__input-block">
          <label className="choise__input-block_label" htmlFor="input_rate">
            Input your rate
          </label>
          <input
            name="input_rate"
            required
            className="choise__input-block_input"
            min="0"
            type="number"
            value={inputBid}
            onChange={(e) => {
              setInputBid(e.target.value);
            }}
          />
        </div>
        <button onClick={() => controls.choise(1)}>Right</button>
      </div>
    )}

    {isGameStarted && isCardFliped && (
      <div className="controls_again">
        <button onClick={() => controls.playAgain()}>Play one more</button>
      </div>
    )}
  </div>
);

export default Controls;
