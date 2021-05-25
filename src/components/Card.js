class Card {
  constructor({ name, link, altText, likes, _id, owner, currentUserId }, cardTemplateSelector, handleCardClick, handleLikeClick, handleDeleteCard) {
    this._text = name;
    this._link = link;
    this._altText = altText;
    this._likes = likes;
    this._cardId = _id;
    this._cardOwnerId = owner._id;
    this._currentUserId = currentUserId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    this._template = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".photo-grid__card")
      .cloneNode(true);

    return this._template;
  }

  setLikeInfo(newCard) {
    if (newCard) {
      this._likes = newCard.likes
    }
    this.isLiked = !this.isLiked
    this._toggleLike()
    this._likeCount.textContent = this._likes.length;
  }

  _toggleLike() {
    this._cardElement.querySelector(".photo-grid__like-btn")
    .classList.toggle('photo-grid__like-btn_active');
  }

  checkLikes() {
    this._likeCount.textContent = this._likes.length;
  }

  handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners() {
    this._cardElement.querySelector(".photo-grid__like-btn").addEventListener("click", () => this._handleLikeClick(this));

    this._cardElement
      .querySelector(".photo-grid__delete-btn")
      .addEventListener("click", () => this._handleDeleteCard(this));

    this._cardElement
      .querySelector(".photo-grid__image")
      .addEventListener("click", () => this._handleCardClick(this._link, this._text));
  }

  getCard() {
    this._itemTemplate = this._getTemplate();

    this._cardElement = this._itemTemplate.cloneNode(true);
    const cardImage = this._cardElement.querySelector(".photo-grid__image");

    if (this._cardOwnerId !== this._currentUserId) {
      this._cardElement.querySelector(".photo-grid__delete-btn").classList.add("photo-grid__delete-btn_hide");
    }
    
    
    cardImage.src = this._link;
    this._cardElement.querySelector(".photo-grid__title").textContent = this._text;

    this._likeCount = this._cardElement.querySelector(".photo-grid__like-count");
    cardImage.alt = this._altText;

    this.isLiked = this._likes.find(user => user._id === this._currentUserId)
    if (this.isLiked) {
      this._toggleLike()
    }

    this._setEventListeners();
    this.checkLikes();

    return this._cardElement;
  }
}

export default Card;
