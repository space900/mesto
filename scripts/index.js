// импорты
import FormValidator from './FormValidation.js';
import { closeModal, openModal, closeActivePopup } from './utils.js';
import initialCards from './data.js'
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

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
const cardTemplateSelector = ".photo-grid__list-template";
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

const popupType = {
  popupAddCard: ".popup_cards",
  popupEditProfile: ".popup_texts",
  popupImage: ".popup_photo"
}

const pooopup = ".popup_texts";

// экземпляр Section для добавления карточек в контейнер из data.js
const cardList = new Section({
  data: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, cardTemplateSelector, cardImageClickHandler);
    const cardElement = card.getCard();
    cardList.appendItem(cardElement);
  }
}, ".photo-grid__list");
  
const popupWithImage = new PopupWithImage(popupType.popupImage);
const addCardPopup = new PopupWithForm(popupType.popupAddCard, addCardSubmitHandler);
// const editProfilePopup = new PopupWithForm(popupType.popupEditProfile, editProfileHandler);
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();


// Редактирование профиля
const editProfilePopup = new PopupWithForm(
  popupType.popupEditProfile, { 
  renderer: (item) => {
    userInfo.setUserInfo(item);
  }
})
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({nameSelector: '.info__title', jobSelector: '.info__subtitle'});

// функция для открытия попап с фото
function cardImageClickHandler(link, text) {
  popupWithImage.open(link, text);
};

// добавление новой карточки
function addCardSubmitHandler(data) {
  const newCard = new Card(data, cardTemplateSelector, cardImageClickHandler);
  cardList.prependItem(newCard.getCard());
  addCardPopup.close();
  addCardValidator.resetValidation();
}

// const popupForEdit = new PopupWithForm({
//   data: popupType,
//   renderer: (item) => {
//     userInfo.setUserInfo(item);
//   }
// })

// редактирование профиля
function editProfileHandler() {
  
  editProfilePopup.close();
}

function openCardPopup() {
  addCardPopup.open();
}

// const openEditProfile = () => {
//   const text = userInfo.getUserInfo();
//   nameInput.value = text.name;
//   jobInput.value = text.job;
//   editProfilePopup.open();
//   editProfileValidator.resetValidation();
// }

// функция сброса валидации, открытия и редактирования значений профиля
// function formSubmitProfile() {
//   editProfileValidator.resetValidation();
  
//   nameInput.value = defaultName.textContent;
//   jobInput.value = defaultJob.textContent;
// }

// функция сброса стандартного поведения страницы, перезаписи полученных значений в полях
// function resetProfilePopup(evt) {
//   evt.preventDefault();
//   defaultName.textContent = nameInput.value;
//   defaultJob.textContent = jobInput.value;
//   closeModal(popupName);
// }

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
// const closeByOverlay = (e) => {
//   if (e.target === e.currentTarget) {
//     closeActivePopup(e);
//   }
// };

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
closePopupsByCloseButtons();
cardList.renderItems();

popupOpenButton.addEventListener("click",  () => {
  editProfileValidator.resetValidation();
  const textInputs = userInfo.getUserInfo();
  nameInput.value = textInputs.name;
  jobInput.value = textInputs.job;
  editProfilePopup.open();
  
});

popupEditButton.addEventListener("click", openCardPopup);
// formItem.addEventListener("submit", resetProfilePopup);
// popupPhoto.addEventListener("click", closeByOverlay);
// popupCard.addEventListener("click", closeByOverlay);
// popupName.addEventListener("click", closeByOverlay);
