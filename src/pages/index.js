// импорты
import "../pages/index.css";
import FormValidator from "../components/FormValidation.js";
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
  jobInput,
} from "../utils/constants.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


// экземпляр Api

const api = new Api({
  address: "https://nomoreparties.co/v1/",
  token: "7db52f09-fd63-4bba-b480-bb98507e779c",
  groupId: "cohort-24",
});

// остальные экземпляры
const addCardValidator = new FormValidator(settings, addCardForm);
const editProfileValidator = new FormValidator(settings, editProfileForm);
const popupWithImage = new PopupWithImage(popupType.popupImage);
const changeAvatarValidator = new FormValidator(settings, changeProfileAvatar);
const editProfilePopup = new PopupWithForm(popupType.popupEditProfile, formEditProfileSubmitHandler);

const userInfo = new UserInfo({ nameSelector: userInfoTitle, jobSelector: userInfoSubtitle });
popupWithImage.setEventListeners();
editProfilePopup.setEventListeners();

// функция для открытия попап с фото
function cardImageClickHandler(link, text) {
  popupWithImage.open(link, text);
}

function formEditProfileSubmitHandler() {
  const info = {
    name: nameInput.value,
    job: jobInput.value,
  };
  userInfo.setUserInfo(info);
  api
    .getUserData()
    .then((result) => {
      console.log(result + "всё ок");
    })
    .catch((e) => console.log(`Ошибка при обновлении юзера: ${e}`));
  editProfilePopup.close();
}
changeAvatarValidator.enableValidation();
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    console.log("cards", cards);
    const currentUserId = userData._id;

    // новая карточка
    const createCard = (cardData) => {
      const card = new Card(
        { ...cardData, currentUserId: currentUserId },
        cardTemplateSelector,
        cardImageClickHandler,
        handleLikeClick,
        handleDeleteCard
      );
      return card.getCard();
    };

    // экземпляр Section для добавления карточек в контейнер из data.js
    const cardList = new Section(
      {
        data: initialCards,
        renderer: (cardElement) => {
          cardList.appendItem(createCard(cardElement));
        },
      },
      gridList
    );

    userInfo.setUserInfo(userData);
    cardList.renderItems(cards);

    const addCardPopup = new PopupWithForm(popupType.popupAddCard, addCardSubmitHandler);
    addCardPopup.setEventListeners();

    // добавление новой карточки
    function addCardSubmitHandler(data) {
      api
        .addCard(data)
        .then((result) => {
          cardList.prependItem(createCard(result));
        })
        .catch((e) => console.log(`Ошибка при добавлении карточки: ${e}`));
      // userInfo.getId();
      addCardPopup.close();
      addCardValidator.resetValidation();
    }

    function openCardPopup() {
      addCardValidator.resetValidation();
      addCardPopup.open();
    }

    openPopupAddCardButton.addEventListener("click", openCardPopup);

    function handleLikeClick(card) {
      if (card.isLiked) {
        api.deleteLike(card._cardId).then((res) => {
          card.setLikeInfo(res);
        });
      } else {
        api.setLike(card._cardId).then((res) => {
          card.setLikeInfo(res);
        });
      }
    }

    function handleDeleteCard(card) {
      function confirmSubmitHandler() {
        api.deleteCard(card._cardId).then((res) => {
          confirmModal.close();

          card.handleDeleteCard();
        });
      }

      const confirmModal = new PopupWithForm(".popup_delete", confirmSubmitHandler);
      confirmModal.setEventListeners();
      confirmModal.open();
    }

    openPopupEditProfileButton.addEventListener("click", () => {
      editProfilePopup.open();

      editProfileValidator.resetValidation();
      const textInputs = userInfo.getUserInfo();
      nameInput.value = textInputs.name;
      jobInput.value = textInputs.job;
    });
  })
  .catch((e) => console.log(`Ошибка при получении данных: ${e}`));

function changeAvatarSubmit() {
  api.changeAvatar()
    .then((result) => {
      console.log(result)
    })
    .catch((e) => console.log(`Ошибка при смене аватара: ${e}`));
    changeAvatarModal.close()
}

profileAvatar.addEventListener("click", () => {
  changeAvatarModal.open();
  changeAvatarValidator.resetValidation();
  console.log(profileAvatar, "profileAvatar");
  console.log("!!!!");
});

const changeAvatarModal = new PopupWithForm(popupType.popupChangeAvatar, changeAvatarSubmit);
changeAvatarModal.setEventListeners();

