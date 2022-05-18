const Card_API = {
  getDesk: () =>
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"),

  getCards: (deck_id) =>
    fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`),

  reshuffleCards: (deck_id) =>
    fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`),
};

export default Card_API;
