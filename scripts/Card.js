import {openModal, popupImage, popupImageCaption, popupPhoto} from './utils.js';

class Card {
  constructor({ name, link, altText }, cardTemplateSelector) {
    this._text = name;
    this._link = link;
    this._altText = altText;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle("photo-grid__like-btn_active");
  }

  _handleDeleteCard = () =>  {
    this._cardElement.remove();
  }

  _handlePreviewPicture = () => {
    popupImage.src = this._link;
    popupImage.alt = this._altText;
    popupImageCaption.textContent = this._text;

    openModal(popupPhoto);
  }
  
  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".photo-grid__like-btn");
    const deleteButton = this._cardElement.querySelector(".photo-grid__delete-btn");
    const cardImage = this._cardElement.querySelector(".photo-grid__image");

    likeButton.addEventListener('click', this._handleLikeCard);
    deleteButton.addEventListener('click', this._handleDeleteCard);
    cardImage.addEventListener('click', this._handlePreviewPicture);
  }

  getCard() {
    const itemTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector(".photo-grid__card");

    this._cardElement = itemTemplate.cloneNode(true);
    const cardImage = this._cardElement.querySelector(".photo-grid__image");

    cardImage.src = this._link;
    this._cardElement.querySelector(".photo-grid__title").textContent = this._text;
    
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card; 
