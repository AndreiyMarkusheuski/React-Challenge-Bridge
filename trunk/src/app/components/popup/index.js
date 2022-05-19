import React from "react";

import "./style.scss";

const Popup = ({ text, closePopup }) => (
  <div className="popup">
    <div className="popup__inner">
      <p>{text}</p>
      <button onClick={closePopup}>Close</button>
    </div>
  </div>
);

export default Popup;
