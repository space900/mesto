// импорты
import '../pages/index.css';
import FormValidator from '../components/FormValidation.js';
import {
  profileAvatar,
  changeProfileAvatar,
  userInfoTitle,
  userInfoSubtitle,
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

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { data } from 'autoprefixer';

// создание экземпляра Api

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
//   headers: {
//     authorization: '7db52f09-fd63-4bba-b480-bb98507e779c',
//     'Content-Type': 'application/json'
//   }
// });

// fetch('https://nomoreparties.co/v1/cohort-24/users/me', {
//   headers: {
//     authorization: '7db52f09-fd63-4bba-b480-bb98507e779c',
//     'Content-Type': 'application/json'
//   }
// })
//   .then(res => res.json())
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(`Ошибка: ${err}`);
//     });

// fetch('https://nomoreparties.co/v1/cohort-24/cards', {
//   headers: {
//     authorization: '7db52f09-fd63-4bba-b480-bb98507e779c',
//     'Content-Type': 'application/json'
//   }
// });

// fetch('https://nomoreparties.co/v1/cohort-24/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: '7db52f09-fd63-4bba-b480-bb98507e779c',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'beyondmyspace',
//     about: 'кто-то'
//   })
// });

// fetch('https://nomoreparties.co/v1/cohort-24/cards', {
//   method: 'POST',
//   headers: {
//     authorization: '7db52f09-fd63-4bba-b480-bb98507e779c',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: "бесконечный дом",
//     link: 'https://sun9-34.userapi.com/impf/c830209/v830209607/18f80f/EXy09X7eKmk.jpg?size=2560x1936&quality=96&sign=a8946e9cb56598abac301dd219cb38a5&type=album'
//   })
// }); 

// экземпляр Api

const api = new Api({
  address: 'https://nomoreparties.co/v1/',
  token: '7db52f09-fd63-4bba-b480-bb98507e779c',
  groupId: 'cohort-24'
});

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

// остальные экземпляры
const addCardValidator = new FormValidator(settings, addCardForm);
const editProfileValidator = new FormValidator(settings, editProfileForm);
const popupWithImage = new PopupWithImage(popupType.popupImage);
const addCardPopup = new PopupWithForm(popupType.popupAddCard, addCardSubmitHandler);
const editProfilePopup = new PopupWithForm(popupType.popupEditProfile, formEditProfileSubmitHandler);
const changeAvatarPopup = new PopupWithForm(popupType.popupChangeAvatar, cardImageClickHandler);
const userInfo = new UserInfo({ nameSelector: userInfoTitle, jobSelector: userInfoSubtitle, avatarSelector: profileAvatar });
popupWithImage.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
changeAvatarPopup.setEventListeners();

// функция для открытия попап с фото
function cardImageClickHandler(link, text) {
  popupWithImage.open(link, text);
};

// добавление новой карточки
function addCardSubmitHandler(data) {
  cardList.prependItem(createCard(data));
  addCardPopup.close();
  addCardValidator.resetValidation();
  fetch('https://nomoreparties.co/v1/cohort-24/cards', {
    method: 'POST',
    headers: {
      authorization: '7db52f09-fd63-4bba-b480-bb98507e779c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "arbat, neon city b/w",
      link: 'https://sun9-14.userapi.com/impf/c844416/v844416591/101413/xhR0Wlhp0EE.jpg?size=2560x2148&quality=96&sign=3ce7cfd2384c655d3cea2212339f65c8&type=album'
    })

  })

}

function formEditProfileSubmitHandler() {
  const info = {
    name: nameInput.value,
    job: jobInput.value
  }
  userInfo.setUserInfo(info);

  editProfilePopup.close();
}

function formChangeAvatarSubmitHandler() {

}

function openCardPopup() {
  addCardValidator.resetValidation();

  addCardPopup.open();
}

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
// closePopupsByCloseButtons();
// cardList.renderItems();
// api.getInitialCards()
//   .then(res => {
//     console.log(res);
//     cardList.renderItems(res);
//   })
//   .catch(e => console.log(`Ошибка при рендере карточек: ${e}`))

// api.getUserInfo()
//   .then(res => {
//     console.log('USER:', res)
//   })
//   .catch(e => console.log(`Ошибка при получении данных user: ${e}`))

Promise.all([ api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    console.log(userData)
    cardList.renderItems(cards);
  })

openPopupEditProfileButton.addEventListener("click", () => {
  editProfilePopup.open();
  editProfileValidator.resetValidation();
  const textInputs = userInfo.getUserInfo();
  nameInput.value = textInputs.name;
  jobInput.value = textInputs.job;
});

openPopupAddCardButton.addEventListener("click", openCardPopup);
