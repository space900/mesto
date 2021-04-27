

class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._altText = data.altText;
    this._cardSelector = cardSelector;
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
    this._cardImage.alt = this._name;
    this._cardLikeButton = this._element.querySelector(".photo-grid__like-btn_active");
    this._element.querySelector(".photo-grid__title").textContent = this._name;
    
    return this._element;
  };


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
      this._handleCardClick(this._name, this._link, this._altText);
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

// открытие попап-фото 
function handleCardClick() {
  const openImg = document.querySelector(".popup__position");
 // const openTitle = document.querySelector(".popup__caption");
  
  openImg.querySelector("img").src = this._link;
  openImg.querySelector("p").textContent = this._name;
  // openTitle.textContent = this._name;
  openImg.querySelector("p").alt = this._altText;

  document.querySelector(".popup__image").alt = this._altText;
  // openImg.alt = this._altText;
  
  openModal(popupPhoto);
}




function createCard (evt) {
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  evt.preventDefault();
}

/*
function createCards(data) {
  const card = new Card(
    data,
    ".photo-grid__image", 
    handleCardClick
  );
  const cardElement = card.renderCard();
  return cardElement;
} */


// рендер карточек 
initialCards.forEach((item) => {
  const card = new Card(item, ".photo-grid__image", handleCardClick);
  const cardsElement = card.addCard();

  document.querySelector(".photo-grid__list").append(cardsElement);
});
