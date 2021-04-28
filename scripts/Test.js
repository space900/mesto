class Card {
  constructor({ text, link }, cardTemplateSelector) {
    this._text = text;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  getCard() {
    const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector(".photo-grid__card");

    const cardElement = cardTemplate.cloneNode(true);

    const likeButton = document.querySelector(".photo-grid__like-btn");
    cardElement.querySelector(".photo-grid__title").textContent = this._text;
    cardElement.querySelector(".photo-grid__image").src = this._link;
    cardElement.querySelector(".photo-grid__image").alt = element.altText;
    getCurrentPhoto(cardElement);
    handleDeleteCard(cardElement);
    return cardElement;
  }
}

const card = new Card({ text: "123", link: "https://tototo.png" }, "#card-template");
