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

const editProfileForm = document.querySelector(".popup_texts");
const addCardModal = document.querySelector(".popup_cards");
const addCardForm = addCardModal.querySelector(".popup__form");


// экземпляр карточки


function renderCard(cardData) {
  const card = new Card(cardData, ".photo-grid__list-template")
  gridList.append(card.getCard());
}

function getAddCard(data) {
  const card = new Card(data, ".photo-grid__list-template")
  gridList.prepend(card.getCard());
}

addCardForm.addEventListener("submit", (e) => {

  e.preventDefault();
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }

  
  e.target.reset();
  getAddCard(data);
  
  closeModal(popupCard);
})

const addCardValidator = new FormValidator(settings, editProfileForm);
const editProfileValidator = new FormValidator(settings, addCardForm);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();

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

const closeByOverlay = (e) => {
  if (e.target === e.currentTarget) {
    closeActivePopup(e);
  }
};

function renderInitialCards() {
  initialCards.forEach(renderCard); //вызываем метод forEach чтобы пройти по всем элементам функции renderItems
}

function openCardPopup() {
  openModal(popupCard);
}

function formSubmitProfile() {
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

function closePopupsByCloseButtons() {
  closeButtonProfile.addEventListener("click", () => closeModal(popupName));
  closeButtonCard.addEventListener("click", () => { closeModal(popupCard); addCardForm.reset();});
  addCardForm.addEventListener("submit", () => closeModal(popupCard));
  closeButtonPhoto.addEventListener("click", () => closeModal(popupPhoto));
}

closePopupsByCloseButtons();
renderInitialCards();

// Слушатели
popupOpenButton.addEventListener("click", formSubmitProfile);
popupEditButton.addEventListener("click", openCardPopup);
formItem.addEventListener("submit", resetProfilePopup);
popupPhoto.addEventListener("click", closeByOverlay);
popupCard.addEventListener("click", closeByOverlay);
popupName.addEventListener("click", closeByOverlay);