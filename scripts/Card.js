

class Card {
  constructor({ name, link, altText }, cardTemplateSelector, handleCardClick) {
    this._text = name;
    this._link = link;
    this._altText = altText;
    this._cardTemplateSelector = cardTemplateSelector;   //document.querySelector(cardTemplateSelector).content.querySelector(".photo-grid__card");
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this._template = this._cardTemplateSelector.cloneNode(true);
    
    return this._template;
    
  }

  _handleLikeCard() {
    this._cardElement.querySelector(".photo-grid__like-btn")
      .classList.toggle("photo-grid__like-btn_active");
  }

  _handleDeleteCard = () =>  {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // _handlePreviewPicture = () => {
  //   popupImage.src = this._link;
  //   popupImage.alt = this._altText;
  //   popupImageCaption.textContent = this._text;

  //   openModal(popupPhoto);
  // }

  // _handleLikeCard(evt) { 
  //   evt.target.classList.toggle("photo-grid__like-btn_active"); 
  // } 
  
  _setEventListeners() {

    this._cardElement.querySelector(".photo-grid__like-btn")
      .addEventListener('click', () => this._handleLikeCard());

    this._cardElement.querySelector(".photo-grid__delete-btn")
      .addEventListener('click', () => this._handleDeleteCard());
    
    this._cardElement.querySelector(".photo-grid__image")
      .addEventListener('click', () => this._handleCardClick(this._link, this._text));

    // const likeButton = this._cardElement.querySelector(".photo-grid__like-btn");
    // const deleteButton = this._cardElement.querySelector(".photo-grid__delete-btn");
    // likeButton.addEventListener('click', () => this._handleLikeCard); 
    // deleteButton.addEventListener('click', () => this._handleDeleteCard);
    // const cardImage = this._cardElement.querySelector(".photo-grid__image");
    
    // likeButton.addEventListener('click', () => this._handleLikeCard); 
    // deleteButton.addEventListener('click', () => this._handleDeleteCard);
    // cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._text));
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
