// импорты
import "../pages/index.css";
import FormValidator from "../components/FormValidation.js";
import {
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

const userInfo = new UserInfo({ nameSelector: userInfoTitle, jobSelector: userInfoSubtitle, avatarSelector: profileAvatar });
popupWithImage.setEventListeners();
editProfilePopup.setEventListeners();

// функция для открытия попап с фото
function cardImageClickHandler(link, text) {
  popupWithImage.open(link, text);
}


// изменение инфо профиля
function formEditProfileSubmitHandler() {
  const info = {
    name: nameInput.value,
    job: jobInput.value,
  };
  console.log(info, 'info')
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    const currentUserId = userData._id;
    console.log('userData', userData)

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

    // форма для попап добавления карточки
    const addCardPopup = new PopupWithForm(popupType.popupAddCard, addCardSubmitHandler);
    addCardPopup.setEventListeners();

    // форма смены аватара
    const changeAvatarModal = new PopupWithForm(popupType.popupChangeAvatar, changeAvatarSubmit);
    changeAvatarModal.setEventListeners();

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


    // лайк-клик
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

    // замена аватара
    function changeAvatarSubmit(data) {

      console.log(api.changeAvatar(data))
      api.changeAvatar(data)
        .then((res) => {
          userInfo.setUserAvatar(res)
          changeAvatarModal.close()
        })
        .catch((e) => console.log(`Ошибка при смене аватара: ${e}`));

      // const newAvatar = {
      //   userAvatar: profileAvatar
      // }


      // console.log(newAvatar)

      // console.log(userInfo.setUserAvatar(newAvatar))
      // api.changeAvatar()
      //   .then(() => {
      //     userInfo.setUserAvatar({
      //       userAvatar: avatar
      //     })

      //   })
      //   .catch((e) => console.log(`Ошибка при смене аватара: ${e}`));
      // changeAvatarModal.close()
    }


    // удаление карточки
    function handleDeleteCard(card) {
      function confirmSubmitHandler() {
        api.deleteCard(card._cardId)
          .then((res) => {
            confirmModal.close();

            card.handleDeleteCard();
          });
      }

      const confirmModal = new PopupWithForm(".popup_delete", confirmSubmitHandler);
      confirmModal.setEventListeners();
      confirmModal.open();
    }

    profileAvatarButton.addEventListener("click", () => {
      changeAvatarModal.open();
      changeAvatarValidator.resetValidation();
    });

    openPopupEditProfileButton.addEventListener("click", () => {
      editProfilePopup.open();

      editProfileValidator.resetValidation();
      const textInputs = userInfo.getUserInfo();
      nameInput.value = textInputs.name;
      jobInput.value = textInputs.job;
    });
  })
  .catch((e) => console.log(`Ошибка при получении данных: ${e}`));







