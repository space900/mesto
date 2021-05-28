// импорты
import "../pages/index.css";
import FormValidator from "../components/FormValidation.js";
import {
  addCardModal,
  profileAvatar,
  profileAvatarButton,
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
  submitDeletePopup,
} from "../utils/constants.js";

import { renderLoading } from "../utils/utils.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm";
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
const confirmModal = new PopupWithConfirm(".popup_delete");

// селекторы юзера
const userInfo = new UserInfo({
  nameSelector: userInfoTitle,
  jobSelector: userInfoSubtitle,
  avatarSelector: profileAvatar,
});

// функция для открытия попап с фото
function cardImageClickHandler(link, text) {
  popupWithImage.open(link, text);
}

// удаление карточки
function handleDeleteCardClick(card) {
  const getid = card._cardId;

  console.log(getid, 'card')
  confirmModal.setNewSubmitHandler(confirmSubmitHandler)
  confirmModal.open()
}

function confirmSubmitHandler(card) {
  console.log(getid)
  
  renderLoading(true, submitDeletePopup)
  api.deleteCard(card.getid())
    .then(res => {
      console.log(res)
      card.handleDeleteCard();
      confirmModal.close();

    })
    .catch((e) => console.log(`Ошибка при удалении карточки: ${e}`))
    .finally(() => {
      renderLoading(false, submitDeletePopup)
    })
  
}

// вызов валидаций
changeAvatarValidator.enableValidation();
addCardValidator.enableValidation();
editProfileValidator.enableValidation();

popupWithImage.setEventListeners();
confirmModal.setEventListeners()

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserAvatar(userData.avatar);
    userInfo.setUserInfo(userData.name, userData.job);
    const currentUserId = userData._id;

    // новая карточка
    const createCard = (cardData) => {
      const card = new Card(
        { ...cardData, currentUserId: currentUserId },
        cardTemplateSelector,
        cardImageClickHandler,
        handleLikeClick,
        handleDeleteCardClick
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

    // форма для попап добавления карточки
    const addCardPopup = new PopupWithForm(popupType.popupAddCard, addCardSubmitHandler);
    addCardPopup.setEventListeners();

    // форма смены аватара
    const changeAvatarModal = new PopupWithForm(popupType.popupChangeAvatar, changeAvatarSubmit);
    changeAvatarModal.setEventListeners();

    // форма изменения полей юзера
    const editProfilePopup = new PopupWithForm(popupType.popupEditProfile, formEditProfileSubmitHandler);
    editProfilePopup.setEventListeners();

    // добавление новой карточки
    function addCardSubmitHandler(data) {
      renderLoading(true, addCardModal)
      api.addCard(data)
        .then((result) => {
          cardList.prependItem(createCard(result));
          addCardPopup.close();
        })
        .catch((e) => console.log(`Ошибка при добавлении карточки: ${e}`))
        .finally(() => {
          renderLoading(false, addCardModal)
        })

      
      addCardValidator.resetValidation();
    }

    // открытие попап-фото
    function openCardPopup() {
      addCardValidator.resetValidation();
      addCardPopup.open();
    }

    // слушатель попап-фото
    openPopupAddCardButton.addEventListener("click", openCardPopup);

    // лайк-клик
    function handleLikeClick(card) {
      if (card.isLiked) {
        api.deleteLike(card._cardId).then((res) => {
          card.setLikeInfo(res);
        })
        .catch((e) => console.log(`Ошибка при попытке убрать лайк: ${e}`))
      } else {
        api.setLike(card._cardId).then((res) => {
          card.setLikeInfo(res);
        })
        .catch((e) => console.log(`Ошибка при попытке поставить лайк: ${e}`))
      }
    }

    // замена аватара
    function changeAvatarSubmit(data) {
      renderLoading(true, changeProfileAvatar)
      api.changeAvatar(data)
        .then((res) => {
          userInfo.setUserAvatar(res.avatar);
          changeAvatarModal.close();
        })
        .catch((e) => console.log(`Ошибка при смене аватара: ${e}`))
        .finally(() => {
          renderLoading(false, changeProfileAvatar)
        })
    }

    // изменение инфо профиля
    function formEditProfileSubmitHandler() {
      const info = {
        name: nameInput.value,
        job: jobInput.value,
      };
  
      userInfo.setUserInfo(info);
      renderLoading(true, editProfileForm)
      api.getUserData()
        .then((result) => {
          userInfo.setUserInfo(result);
          editProfilePopup.close();
        })
        .catch((e) => console.log(`Ошибка при обновлении юзера: ${e}`))
        .finally(() => {
          renderLoading(false, editProfileForm)
        })
    }

    // слушатель аватара
    profileAvatarButton.addEventListener("click", () => {
      changeAvatarModal.open();
      changeAvatarValidator.resetValidation();
    });

    // слушатель юзера
    openPopupEditProfileButton.addEventListener("click", () => {
      editProfilePopup.open();

      editProfileValidator.resetValidation();
      const textInputs = userInfo.getUserInfo();
      nameInput.value = textInputs.name;
      jobInput.value = textInputs.job;
    });
  })
  .catch((e) => console.log(`Ошибка при получении данных: ${e}`));