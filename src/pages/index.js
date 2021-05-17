// импорты
// import FormValidator from '../components/FormValidation.js';
import { closeModal, openModal, closeActivePopup } from '../utils/utils.js';
import { 
  initialCards,  
  popupType, 
  cardTemplateSelector,  
  addCardForm, 
  addCardValidator, 
  editProfileValidator, 
  popupName, 
  popupCard, 
  popupOpenButton, 
  popupEditButton, 
  closeButtonProfile, 
  closeButtonCard, 
  closeButtonPhoto, 
  nameInput, 
  jobInput, 
  popupPhoto 
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
