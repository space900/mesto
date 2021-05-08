// импорты
import FormValidator from './FormValidation.js';
import { openModal, closeModal, closeActivePopup } from './utils.js';
import initialCards from './data.js'
import Card from './Card.js';

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

//function createCard(element) {
//  const cardElement = itemTemplate.cloneNode(true);
//  cardElement.querySelector(".photo-grid__title").textContent = element.name; // выбираем методом querySelector класс с названием фото и свойством textContent, присваиваем классу значение name из массива 
//  cardElement.querySelector(".photo-grid__image").src = element.link; // выбираем класс с фотографией, присваиваем классу значение link из массива 
//  cardElement.querySelector(".photo-grid__image").alt = element.altText;
//  return cardElement;
//}

//экземпляр
const createCard = (cardData) => {
  const card = new Card(cardData, itemTemplate); // пока не получается вынести селектор в переменную, при добавлении переменной из глобала вместо селектора все ломается, вне зависимости до renderInitialCards() назначается или после, причину пока не понял
  return card.getCard();
}

// методы вставки элементов
const appendCard = (showCard) => {
  gridList.append(createCard(showCard));
}

const prependCard = (showCard) => {
  gridList.prepend(createCard(showCard));
}

// вызов стандартных карточек
const renderCard = (data) => {
  appendCard(data);
}

// вызов новой карточки
const getAddCard = (data) => {
  prependCard(data);
}

function renderInitialCards() {
  initialCards.forEach(renderCard); //вызываем метод forEach чтобы пройти по всем элементам
}

function openCardPopup() {
  openModal(popupCard);
}

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
renderInitialCards();

// Слушатели
addCardForm.addEventListener("submit", (e) => {

  e.preventDefault();
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }

  e.target.reset();
  getAddCard(data);
  closeModal(popupCard);
  addCardValidator.resetValidation();
})

popupOpenButton.addEventListener("click", formSubmitProfile);
popupEditButton.addEventListener("click", openCardPopup);
formItem.addEventListener("submit", resetProfilePopup);
popupPhoto.addEventListener("click", closeByOverlay);
popupCard.addEventListener("click", closeByOverlay);
popupName.addEventListener("click", closeByOverlay);