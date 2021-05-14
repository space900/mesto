// импорты
import FormValidator from './FormValidation.js';
import { openModal, closeModal, closeActivePopup } from './utils.js';
import initialCards from './data.js'
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';

// настройки для валидации
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text_input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__text_invalid",
  errorClass: "`${inputElement.id}-error`"
};

// переменные
const itemTemplate = document.querySelector(".photo-grid__list-template").content.querySelector(".photo-grid__card");
const editProfileForm = document.querySelector(".popup_texts");
const addCardModal = document.querySelector(".popup_cards");
const addCardForm = addCardModal.querySelector(".popup__form");
const addCardValidator = new FormValidator(settings, addCardForm);
const editProfileValidator = new FormValidator(settings, editProfileForm);
const formItem = document.querySelector("form");
const popupName = document.querySelector(".popup_texts");
const popupCard = document.querySelector(".popup_cards");
const popupOpenButton = document.querySelector(".info__edit-btn");
const popupEditButton = document.querySelector(".profile__btn");
const closeButtonProfile = document.querySelector(".popup__close_texts");
const closeButtonCard = document.querySelector(".popup__close_cards");
const closeButtonPhoto = document.querySelector(".popup__close_image");
const defaultName = document.querySelector(".info__title");
const defaultJob = document.querySelector(".info__subtitle");
const nameInput = document.querySelector(".popup__text_field_nickname");
const jobInput = document.querySelector(".popup__text_field_job");
const cardNameInput = document.querySelector(".popup__text_field_name");
const cardLinkInput = document.querySelector(".popup__text_field_link");
const gridList = document.querySelector(".photo-grid__list");
const popupPhoto = document.querySelector(".popup_photo");

// экземпляр Section для добавления карточек в контейнер из data.js
const section = new Section({
  data: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, itemTemplate);
    const cardElement = card.getCard();
    
    section.appendItem(cardElement);
  }
}, ".photo-grid__list");

const getAddCard = new Section({
  data: {name: cardNameInput.value, link: cardLinkInput.value},
  renderer: (cardData) =>  {
    const card = new Card(cardData, itemTemplate);
    const cardElement = card.getCard();

    getAddCard.prependItem(cardElement);
  }
});

// экземпляр PopupWithImage, открытие попап с фото

// const popupWithImage = new PopupWithImage('.popup_photo');
// popupWithImage.open();

// const renderCard = (data) => {
//   appendItem(data);
// }



// методы вставки элементов
// const appendCard = (showCard) => {
//   gridList.append(createCard(showCard));
// }

// const prependCard = (showCard) => {
//   gridList.prepend(createCard(showCard));
// }

// // вызов стандартных карточек
// const renderCard = (data) => {
//   appendCard(data);
// }

// // вызов новой карточки
// const getAddCard = (data) => {
//   prependCard(data);
// }

// // const addCardPopup = new PopupWithForm('.popup_texts', getAddCard);
// // const editProfilePopup = new PopupWithForm('.popup_cards', formSubmitProfile);

// function renderInitialCards() {
//   initialCards.forEach(renderCard); //вызываем метод forEach чтобы пройти по всем элементам
// }

function openCardPopup() {
  openModal(popupCard);
}

// функция сброса валидации, открытия и редактирования значений профиля
function formSubmitProfile() {
  editProfileValidator.resetValidation();
  openModal(popupName);
  nameInput.value = defaultName.textContent;
  jobInput.value = defaultJob.textContent;
}

// функция сброса стандартного поведения страницы, перезаписи полученных значений в полях
function resetProfilePopup(evt) {
  evt.preventDefault();
  defaultName.textContent = nameInput.value;
  defaultJob.textContent = jobInput.value;
  closeModal(popupName);
}


// закрытие модалок по клику
function closePopupsByCloseButtons() {
  closeButtonProfile.addEventListener("click", () => closeModal(popupName));
  closeButtonCard.addEventListener("click", () => {
    closeModal(popupCard);
    addCardForm.reset();
    addCardValidator.resetValidation();
  });
  closeButtonPhoto.addEventListener("click", () => closeModal(popupPhoto));
}


// закрытие модалок по оверлею
const closeByOverlay = (e) => {
  if (e.target === e.currentTarget) {
    closeActivePopup(e);
  }
};

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
closePopupsByCloseButtons();
// renderInitialCards();
section.renderItems();

// Слушатели
addCardForm.addEventListener("submit", (e) => {

  e.preventDefault();
  

  e.target.reset();
  getAddCard();
  closeModal(popupCard);
  addCardValidator.resetValidation();
})

popupOpenButton.addEventListener("click", formSubmitProfile);
popupEditButton.addEventListener("click", openCardPopup);
formItem.addEventListener("submit", resetProfilePopup);
popupPhoto.addEventListener("click", closeByOverlay);
popupCard.addEventListener("click", closeByOverlay);
popupName.addEventListener("click", closeByOverlay);