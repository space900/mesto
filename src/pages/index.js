// импорты
import '../pages/index.css';
import FormValidator from '../components/FormValidation.js';
import {
  gridList,
  editProfileForm,
  settings,
  initialCards,  
  popupType, 
  cardTemplateSelector,  
  addCardForm, 
  openPopupEditProfileButton, 
  openPopupAddCardButton, 
  nameInput, 
  jobInput
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const addCardValidator = new FormValidator(settings, addCardForm);
const editProfileValidator = new FormValidator(settings, editProfileForm);

// новая карточка
const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplateSelector, cardImageClickHandler);
  return card.getCard();
}

// экземпляр Section для добавления карточек в контейнер из data.js
const cardList = new Section({
  data: initialCards,
  renderer: (cardElement) => {
    cardList.appendItem(createCard(cardElement));
  }
}, gridList);
  
const popupWithImage = new PopupWithImage(popupType.popupImage);
const addCardPopup = new PopupWithForm(popupType.popupAddCard, addCardSubmitHandler);
// const editProfilePopup = new PopupWithForm(popupType.popupEditProfile, editProfileHandler);
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();

// Редактирование профиля
const editProfilePopup = new PopupWithForm(popupType.popupEditProfile, formSubmitHandler);
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({nameSelector: '.info__title', jobSelector: '.info__subtitle'});

// функция для открытия попап с фото
function cardImageClickHandler(link, text) {
  popupWithImage.open(link, text);
};

// добавление новой карточки
function addCardSubmitHandler(data) {
  cardList.prependItem(createCard(data));
  addCardPopup.close();
  addCardValidator.resetValidation();
}

function formSubmitHandler() {
  const info = {
    name: nameInput.value,
    job: jobInput.value
  }
  userInfo.setUserInfo(info);
  
  editProfilePopup.close();
}

function openCardPopup() {
  addCardValidator.resetValidation();
  
  addCardPopup.open();
}

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
// closePopupsByCloseButtons();
cardList.renderItems();

openPopupEditProfileButton.addEventListener("click",  () => {
  editProfilePopup.open();
  editProfileValidator.resetValidation();
  const textInputs = userInfo.getUserInfo();
  nameInput.value = textInputs.name;
  jobInput.value = textInputs.job;
});

openPopupAddCardButton.addEventListener("click", openCardPopup);
