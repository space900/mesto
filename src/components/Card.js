class Card {
  constructor({ name, link, altText }, cardTemplateSelector, handleCardClick) {
    this._text = name;
    this._link = link;
    this._altText = altText;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this._template = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(".photo-grid__card")
      .cloneNode(true)

    return this._template;

  }

  _handleLikeCard() {
    this._cardElement.querySelector(".photo-grid__like-btn")
      .classList.toggle("photo-grid__like-btn_active");
  }

  _handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {

    this._cardElement.querySelector(".photo-grid__like-btn")
      .addEventListener('click', () => this._handleLikeCard());

    this._cardElement.querySelector(".photo-grid__delete-btn")
      .addEventListener('click', () => this._handleDeleteCard());

    this._cardElement.querySelector(".photo-grid__image")
      .addEventListener('click', () => this._handleCardClick(this._link, this._text));
  }

  getCard() {
    this._itemTemplate = this._getTemplate();

    this._cardElement = this._itemTemplate.cloneNode(true);
    const cardImage = this._cardElement.querySelector(".photo-grid__image");

    cardImage.src = this._link;
    this._cardElement.querySelector(".photo-grid__title").textContent = this._text;
    cardImage.alt = this._altText;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
