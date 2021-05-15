// импорты
import FormValidator from './FormValidation.js';
import { closeModal, openModal, closeActivePopup } from './utils.js';
import initialCards from './data.js'
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';

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

const popupType = {
  popupAddCard: ".popup_cards",
  popupEditProfile: ".popup_texts",
  popupImage: ".popup_photo"
}
  
const popupWithImage = new PopupWithImage('.popup_photo');
popupWithImage.setEventListeners();

// функция для открытия попап с фото
function cardImageClickHandler(link, text) {
  
  popupWithImage.open(link, text);
  popupWithImage.setEventListeners();
};

// экземпляр Section для добавления карточек в контейнер из data.js
const cardList = new Section({
  data: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, itemTemplate, cardImageClickHandler);
    const cardElement = card.getCard();
    cardList.appendItem(cardElement);
  }
}, ".photo-grid__list");


// const addCardModal = new PopupWithForm({
//   popupSelector: cardFormModalWindow,
//   handleFormSubmit: (data) => {// <======== (2)
//     const card = new Card({ data, handleCardClick: () => {}},cardSelector);
//     cardList.addItem(card.getView()) // <======== (1)
//   }
// });

const addPhotoPopup = new PopupWithForm(
  popupType.popupAddCard, {
  handleFormSubmit: (data) => {
    const card = new Card({ data, handleCardClick: () => {
    
    }}, cardTemplateSelector);
    const cardElement = card.getCard();
    cardList.prependItem(cardElement);
  }
})

addPhotoPopup.setEventListeners();


// function addCardSubmitHandler(data) {
//   const card = new Card(data, {
//     name: cardNameInput.value,
//     link: cardLinkInput.value
//   }, cardTemplateSelector, cardImageClickHandler);
//   const cardElement = card.getCard();
//   cardList.prependItem(cardElement);

// }

// const addCardPopup = new PopupWithForm(popupType.popupAddCard, addCardSubmitHandler);
// addCardPopup.setEventListeners();

// const addCardPopup = new PopupWithForm({
//   popupSelector: ".popup__form",
//   submitHandler: (data) => {
//     const card = new Card(data, itemTemplate);
//     const cardElement = card.getCard();
//     cardList.prependItem(cardElement);
//   }
// });

// const addCardPopup = new PopupWithForm({
//   popupSelector: addCardModal,
//   submitHandler: (cardData) => {
//     const card = new Card( {cardData, cardTemplateSelector}, cardImageClickHandler);
//     const cardElement = card.getCard();
//     cardList.prependItem(cardElement);
//   }
// })

// const edipProfilePopup = new PopupWithForm()

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
cardList.renderItems();

// addCardPopup();

// Слушатели
// addCardForm.addEventListener("submit", (e) => {

//   e.preventDefault();


//   e.target.reset();
//   getAddCard();
//   closeModal(popupCard);
//   addCardValidator.resetValidation();
// })

popupOpenButton.addEventListener("click", formSubmitProfile);
popupEditButton.addEventListener("click", openCardPopup);
formItem.addEventListener("submit", resetProfilePopup);
popupPhoto.addEventListener("click", closeByOverlay);
popupCard.addEventListener("click", closeByOverlay);
popupName.addEventListener("click", closeByOverlay);
