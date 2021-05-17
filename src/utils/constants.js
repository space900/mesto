import FormValidator from '../components/FormValidation.js';

export const initialCards = [
    {
      name: "Москва, район Тушино",
      link: "./src/images/tushino.jpg",
      altText: "стройка Тушино",
    },
    {
      name: "Эльбрус",
      link: "./src/images/elbrus.jpg",
      altText: "гора Эльбрус",
    },
    {
      name: "метро Арбатская",
      link: "./src/images/arbat.jpg",
      altText: "садовое кольцо у м. Арбатская",
    },
    {
      name: "1222 м., г. Уван, южный Урал",
      link: "./src/images/ural.jpg",
      altText: "вершина горы Уван",
    },
    {
      name: "Щёлково",
      link: "./src/images/schelkovo.jpg",
      altText: "жилой дом в Щёлково",
    },
    {
      name: "Инженер и мороженое",
      link: "./src/images/tarasovka.jpg",
      altText: "рабочий с мороженым",
    },
];

// настройки для валидации
export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__text_input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__text_invalid",
    errorClass: "`${inputElement.id}-error`"
};

// попапы
export const popupType = {
    popupAddCard: ".popup_cards",
    popupEditProfile: ".popup_texts",
    popupImage: ".popup_photo"
};

// переменные
export const cardTemplateSelector = ".photo-grid__list-template";
export const editProfileForm = document.querySelector(".popup_texts");
export const addCardModal = document.querySelector(".popup_cards");
export const addCardForm = addCardModal.querySelector(".popup__form");
export const addCardValidator = new FormValidator(settings, addCardForm);
export const editProfileValidator = new FormValidator(settings, editProfileForm);
export const popupName = document.querySelector(".popup_texts");
export const popupCard = document.querySelector(".popup_cards");
export const popupOpenButton = document.querySelector(".info__edit-btn");
export const popupEditButton = document.querySelector(".profile__btn");
export const closeButtonProfile = document.querySelector(".popup__close_texts");
export const closeButtonCard = document.querySelector(".popup__close_cards");
export const closeButtonPhoto = document.querySelector(".popup__close_image");
export const nameInput = document.querySelector(".popup__text_field_nickname");
export const jobInput = document.querySelector(".popup__text_field_job");
export const popupPhoto = document.querySelector(".popup_photo");
