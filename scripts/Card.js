class Card {
  constructor(data, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._altText = data.altText;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    const cardsElement = document
      .querySelector(".photo-grid__list-template")
      .content.querySelector(".photo-grid__card")
      .cloneNode(true);

    return cardsElement;
  };

  addCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector(".photo-grid__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._altText;
    this._cardLikeButton = this._element.querySelector(".photo-grid__like-btn_active");
    this._element.querySelector(".photo-grid__title").textContent = this._name;

    return this._element;
  };

  openPopupImage = () => {
    this._element = this.addCard();
    
  }

  _setEventListeners = () => {
    this._element
      .querySelector(".photo-grid__delete-btn")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element.querySelector(".photo-grid__like-btn").addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._element.querySelector(".photo-grid__image").addEventListener("click", () => {
        this._handleCardClick(this._link);
      });
  };

  _handleDeleteCard = () => {
    this._element.remove();
  };

  _handleLikeCard = () => {
    this._element
      .querySelector(".photo-grid__like-btn")
      .classList.toggle("photo-grid__like-btn_active");
  };
}

initialCards.forEach((item) => {
  const card = new Card(item, ".photo-grid__image");
  const cardsElement = card.addCard();

  document.querySelector(".photo-grid__list").append(cardsElement);
});
