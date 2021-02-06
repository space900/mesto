/* объявляем переменные */
const itemTemplate = document.querySelector(".photo-grid__list-template").content;
const formItem = document.querySelector("form");
const popupName = document.querySelector(".popup_texts");
const popupCard = document.querySelector(".popup_cards");
const popupOpenButton = document.querySelector(".info__edit-btn");
const popupEditButton = document.querySelector(".profile__btn");
const closeButtonProfile = document.querySelector(".popup__close_texts");
const CloseButtonCard = document.querySelector(".popup__close_cards");
const closeButtonPhoto = document.querySelector(".popup__close_image");
const defaultName = document.querySelector(".info__title");
const defaultJob = document.querySelector(".info__subtitle");
const nameInput = document.querySelector(".popup__text_field_name");
const jobInput = document.querySelector(".popup__text_field_job");
const cardNameInput = document.querySelector(".popup__card_field_name");
const cardLinkInput = document.querySelector(".popup__card_field_link");
const gridList = document.querySelector(".photo-grid__list");
const createButton = document.querySelector(".popup__submit_create-btn");
const saveButton = document.querySelector(".popup__submit_save-btn");
const popupPhoto = document.querySelector(".popup_photo");

const popupOpened = document.querySelectorAll(".popup_is-opened");

/* массив карточек */
const initialCards = [
  {
    name: "Каракая-Су",
    link: "./images/karakaya-su.jpg",
    altText: "фото водопад Каракая-Су",
  },
  {
    name: "Эльбрус",
    link: "./images/elbrus.jpg",
    altText: "фото гора Эльбрус",
  },
  {
    name: "о. Рица",
    link: "./images/ritza.jpg",
    altText: "фото озеро Рица",
  },
  {
    name: "Каньон Псахо",
    link: "./images/psaho.jpg",
    altText: "фото каньон Псахо Сочи",
  },
  {
    name: "Южный Урал",
    link: "./images/uvan.jpg",
    altText: "фото горы Южный Урал",
  },
  {
    name: "Армения",
    link: "./images/armenia.jpg",
    altText: "фото серпантины Армения",
  },
];




const closeByoverlay = (e) => {
  if (e.target === e.currentTarget) {
    closeAllPopups();
  }
};

popupPhoto.addEventListener("click", closeByoverlay);
popupCard.addEventListener("click", closeByoverlay);
popupName.addEventListener("click", closeByoverlay);

const closeByEscape = document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    removeOpenPopup();
  }
})

function removeOpenPopup() {
  popupPhoto.classList.remove("popup_is-opened");
  popupCard.classList.remove("popup_is-opened");
  popupName.classList.remove("popup_is-opened");
}

function openModal(evt) {
  evt.classList.add("popup_is-opened");
 
}

function closeModal(evt) {
  evt.classList.remove("popup_is-opened");
}

function getCurrentPhoto(card) {
  card.querySelector(".photo-grid__image").addEventListener("click", openPhotoPopup);
}

/* функция открытия попап-фото */
function openPhotoPopup(evt) {
  openModal(popupPhoto);
  const photoUrl = evt.target.src;
  const photoLabel = evt.target.parentElement.querySelector(".photo-grid__title")
    .textContent;
  popupPhoto.querySelector("img").src = photoUrl;
  popupPhoto.querySelector(".popup__caption").textContent = photoLabel;
}

/* функция лайка */
function toggleLike() {
  cardsElement
    .querySelector(".photo-grid__like-btn")
    .addEventListener("click", toggleLikeTarget);
}

function toggleLikeTarget(evt) {
  evt.target.classList.toggle("photo-grid__like-btn_active");
}

function render() {
  initialCards.forEach(showDefaultCards); //вызываем метод forEach чтобы пройти по всем элементам функции renderItems
}

function initialCardsValue(element) {
  cardsElement = itemTemplate.cloneNode(true); //клонируем узел itemTemplate в переменную cardsElement
  cardsElement.querySelector(".photo-grid__title").textContent = element.name; // выбираем методом querySelector класс с названием фото и свойством textContent, присваиваем классу значение name из массива
  cardsElement.querySelector(".photo-grid__image").src = element.link; // выбираем класс с фотографией, присваиваем классу значение link из массива
  cardsElement.querySelector(".photo-grid__image").alt = element.altText; // выбираем класс с фотографией, атрибутом alt, присваиваем классу значение altText, для добавления текстового описания изображения
  toggleLike();
  getCurrentPhoto(cardsElement);
  handleDeleteCard(cardsElement);
}

function showDefaultCards(element) {
  initialCardsValue(element);
  gridList.append(cardsElement);
}

function addCard(evt) {
  let data = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  function getAddCard(data) {
    initialCardsValue(data);
    closeAllPopups();
    evt.preventDefault();
    gridList.prepend(cardsElement);
  }
  getAddCard(data);
  buttonState(popupName, createButton);
}

/* функция удаления карточки */
function handleDeleteCard(element) {
  element.querySelector(".photo-grid__delete-btn").addEventListener("click", deleteCard);
}

function deleteCard(evt) {
  evt.target.closest(".photo-grid__card").remove();
}
/*
function handleCloseModalKey (elem) {
  elem.querySelector("popup").addEventListener("click", closeModalKey);
}
function closeModalKey(evt) {
  evt.target.closest(".popup_is-opened").remove();
} */

/* функция добавления попап с созданием фото */
function openCardPopup() {
  openModal(popupCard);
}

function formSubmitProfile() {
  openModal(popupName); // добавляем класс, в результате чего класс popup_is-opened добавляется при нажатии на "редактировать" и удаляется при нажатии на крестик. */
  nameInput.value = defaultName.textContent; // получаем информацию из содержимого полей формы
  jobInput.value = defaultJob.textContent;

  buttonState(popupName, saveButton);
}

/* функция закрытия попап */
function closeAllPopups() {
  closeModal(popupName);
  closeModal(popupCard);
  closeModal(popupPhoto);
}

/* функция сброса стандартного поведения страницы, перезаписи полученных значений в полях*/
function resetProfilePopup(evt) {
  evt.preventDefault();
  defaultName.textContent = nameInput.value;
  defaultJob.textContent = jobInput.value;
  closeAllPopups(); /* вызываем функцию закрытия модального окна */
}

function closeButtons() {
  closeButtonProfile.addEventListener("click", closeAllPopups);
  CloseButtonCard.addEventListener("click", closeAllPopups);
  closeButtonPhoto.addEventListener("click", closeAllPopups);
}

closeButtons();
render();

popupOpenButton.addEventListener("click", formSubmitProfile);
popupEditButton.addEventListener("click", openCardPopup);
createButton.addEventListener("click", addCard);
formItem.addEventListener("submit", resetProfilePopup);
popupPhoto.addEventListener("click", closeByoverlay);
popupCard.addEventListener("click", closeByoverlay);
popupName.addEventListener("click", closeByoverlay);
