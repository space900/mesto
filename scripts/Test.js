class Card {
  constructor({ text, link }, cardTemplateSelector) {
    this._text = text;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle("photo-grid__like-btn_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handlePreviewPicture() {

    openModal(popupPhoto);
    const photoUrl = evt.target.src;
    const photoLabel = evt.target.parentElement.querySelector(".photo-grid__title")
      .textContent;
    popupPhoto.querySelector("img").src = photoUrl;
    popupPhoto.querySelector(".popup__caption").textContent = photoLabel;
  }


  _setEventListeners() {

    const likeButton = cardElement.querySelector(".photo-grid__like-btn");
    const deleteButton = cardElement.querySelector(".photo-grid__delete-btn");
    const cardImage = cardElement.querySelector(".photo-grid__image");

    likeButton.addEventListener('click', this._handleLikeCard);
    deleteButton.addEventListener('click', this._handleDeleteCard);
    cardImage.addEventListener('click', () => this._handlePreviewPicture);

    /*this._element.querySelector(".photo-grid__delete-btn").addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._element.querySelector(".photo-grid__like-btn").addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._element.querySelector(".photo-grid__image").addEventListener("click", () => {
      this._handleCardClick(this._name, this._link, this._altText);
    }); */
  }

  getCard() {
    const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector(".photo-grid__card");

    this._cardElement = cardTemplate.cloneNode(true);
    const cardImage = this._cardElement.querySelector(".photo-grid__image");


    cardElement.querySelector(".photo-grid__title").textContent = this._text;
    cardImage.querySelector(".photo-grid__image").src = this._link;
    //cardElement.querySelector(".photo-grid__image").alt = element.altText;
    getCurrentPhoto(cardElement);
    handleDeleteCard(cardElement);
    return cardElement;
  }
}

const card = new Card({ text: "123", link: "https://tototo.png" }, "#card-template");
