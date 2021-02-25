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
const nameInput = document.querySelector(".popup__text_field_nickname");
const jobInput = document.querySelector(".popup__text_field_job");
const cardNameInput = document.querySelector(".popup__text_field_name");
const cardLinkInput = document.querySelector(".popup__text_field_link");
const gridList = document.querySelector(".photo-grid__list");
const createButton = document.querySelector(".popup__submit_create-btn");
const saveButton = document.querySelector(".popup__submit_save-btn");
const popupPhoto = document.querySelector(".popup_photo");

function closeActivePopup(e) {
  e.preventDefault();
  const activePopup = document.querySelector(".popup_is-opened");
  closeModal(activePopup);
}

const closeByOverlay = (e) => {
  if (e.target === e.currentTarget) {
    closeActivePopup(e);
  }
};

function openModal(evt) {
  evt.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

function closeModal(evt) {
  evt.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

const keyHandler = (e) => {
  if (e.key === "Escape") {
    closeActivePopup(e);
  }
};

function getCurrentPhoto(card) {
  card.querySelector(".photo-grid__image").addEventListener("click", openPhotoPopup);
}

function openPhotoPopup(evt) {
  openModal(popupPhoto);
  const photoUrl = evt.target.src;
  const photoLabel = evt.target.parentElement.querySelector(".photo-grid__title")
    .textContent;
  popupPhoto.querySelector("img").src = photoUrl;
  popupPhoto.querySelector(".popup__caption").textContent = photoLabel;
}

popupPhoto.addEventListener("click", () => openModal(photoUrl, photoLabel));

function toggleLike(cardsElement) {
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

function createCard(element) {
  const cardsElement = itemTemplate.cloneNode(true); //клонируем узел itemTemplate в переменную cardsElement
  cardsElement.querySelector(".photo-grid__title").textContent = element.name; // выбираем методом querySelector класс с названием фото и свойством textContent, присваиваем классу значение name из массива
  cardsElement.querySelector(".photo-grid__image").src = element.link; // выбираем класс с фотографией, присваиваем классу значение link из массива
  cardsElement.querySelector(".photo-grid__image").alt = element.altText; // выбираем класс с фотографией, атрибутом alt, присваиваем классу значение altText, для добавления текстового описания изображения
  toggleLike(cardsElement);
  getCurrentPhoto(cardsElement);
  handleDeleteCard(cardsElement);
  return cardsElement;
}

function showDefaultCards(cardsElement) {
  gridList.append(createCard(cardsElement));
}

function addCard(evt) {
  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  function getAddCard(data) {
    createCard(data);
    closeModal(popupCard);
    evt.preventDefault();
    gridList.prepend(createCard(data));
  }
  getAddCard(data);
  toggleButtonState(popupName, createButton);
}

/* функция удаления карточки */
function handleDeleteCard(element) {
  element.querySelector(".photo-grid__delete-btn").addEventListener("click", deleteCard);
}

function deleteCard(evt) {
  evt.target.closest(".photo-grid__card").remove();
}

function openCardPopup() {
  openModal(popupCard);
}

function formSubmitProfile() {
  openModal(popupName);
  nameInput.value = defaultName.textContent;
  jobInput.value = defaultJob.textContent;
  toggleButtonState(popupName, saveButton);
}

/* функция сброса стандартного поведения страницы, перезаписи полученных значений в полях*/
function resetProfilePopup(evt) {
  evt.preventDefault();
  defaultName.textContent = nameInput.value;
  defaultJob.textContent = jobInput.value;
  closeModal(popupName);
}

function closeButtons() {
  closeButtonProfile.addEventListener("click", () => closeModal(popupName));
  CloseButtonCard.addEventListener("click", () => closeModal(popupCard));
  closeButtonPhoto.addEventListener("click", () => closeModal(popupPhoto));
}

closeButtons();
render();

popupOpenButton.addEventListener("click", formSubmitProfile);
popupEditButton.addEventListener("click", openCardPopup);
createButton.addEventListener("click", addCard);
formItem.addEventListener("submit", resetProfilePopup);
popupPhoto.addEventListener("click", closeByOverlay);
popupCard.addEventListener("click", closeByOverlay);
popupName.addEventListener("click", closeByOverlay);