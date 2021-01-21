/* объявляем переменные */
const itemTemplate = document.querySelector('.photo-grid__list-template').content;
const formElement = document.querySelector('form')
const popupName = document.querySelector('.popup_texts')
const popupCard = document.querySelector('.popup_cards')
const popupOpenButton = document.querySelector('.info__edit-btn')
const popupEditButton = document.querySelector('.profile__btn')
const popupCloseButton = document.querySelector('.popup__close_texts')
const popupCloseButtonCard = document.querySelector('.popup__close_cards')
const defaultName = document.querySelector('.info__title')
const defaultJob = document.querySelector('.info__subtitle')
const nameInput = document.querySelector('.popup__text_field_name')
const jobInput = document.querySelector('.popup__text_field_job')
const cardNameInput = document.querySelector('.popup__card_field_name')
const cardLinkInput = document.querySelector('.popup__card_field_link')
const gridList = document.querySelector('.photo-grid__list')
const createButton = document.querySelector('.popup__submit_create-btn')
const popupPhoto = document.querySelector('.popup_photo')
const popupPhotoClose = document.querySelector('.popup__close_image')

/* массив карточек */
const initialCards = [
    {
        name: 'Каракая-Су',
        link: './images/karakaya-su.jpg',
        altText: 'фото водопад Каракая-Су'
    },
    {
        name: 'Эльбрус',
        link: './images/elbrus.jpg',
        altText: 'фото гора Эльбрус'
    },
    {
        name: 'о. Рица',
        link: './images/ritza.jpg',
        altText: 'фото озеро Рица'
    },
    {
        name: 'Каньон Псахо',
        link: './images/psaho.jpg',
        altText: 'фото каньон Псахо Сочи'
    },
    {
        name: 'Южный Урал',
        link: './images/uvan.jpg',
        altText: 'фото горы Южный Урал'
    },
    {
        name: 'Армения',
        link: './images/armenia.jpg',
        altText: 'фото серпантины Армения'
    }
];

function getCurrentPhoto(card) { // card в качестве аргумента
    card.querySelector('.photo-grid__image').addEventListener('click', popupCurrentPhoto);
}

/* функция открытия попап-фото */
function popupCurrentPhoto (evt) {
    popupPhoto.classList.add('popup_is-opened');
    let photoUrl = evt.target.src;
    let photoLabel = evt.target.parentElement.querySelector('.photo-grid__title').textContent;
    popupPhoto.querySelector('img').src = photoUrl;
    popupPhoto.querySelector('.photo-grid__caption').textContent = photoLabel;
}

/* функция лайка */
function toggleLike() {
    cardsElement.querySelector('.photo-grid__like-btn').addEventListener('click', toggleLikeTarget);
}

function toggleLikeTarget (evt) {
    evt.target.classList.toggle('photo-grid__like-btn_active');
}


function render () {
    initialCards.forEach (renderItems); //вызываем метод forEach чтобы пройти по всем элементам функции renderItems
}
/* Создание карточек из массива */
function renderItems (element) { // element в качестве аргумента
    cardsElement = itemTemplate.cloneNode(true); //клонируем узел itemTemplate в переменную cardsElement
    cardsElement.querySelector('.photo-grid__title').textContent = element.name; // выбираем методом querySelector класс с названием фото и свойством textContent, присваиваем классу значение name из массива
    cardsElement.querySelector('.photo-grid__image').src = element.link; // выбираем класс с фотографией, присваиваем классу значение link из массива
    cardsElement.querySelector('.photo-grid__image').alt = element.altText; // выбираем класс с фотографией, атрибутом alt, присваиваем классу значение altText, для добавления текстового описания изображения
    toggleLike();
    getCurrentPhoto(cardsElement);
    handleDeleteCard(cardsElement);
    gridList.append(cardsElement);
}

/* Создание карточки по клику */
function createCard(evt) {
    cardsElement = itemTemplate.cloneNode(true);
    toggleLike();
    getCurrentPhoto(cardsElement);
    handleDeleteCard(cardsElement);
    cardsElement.querySelector('.photo-grid__title').textContent = cardNameInput.value;
    cardsElement.querySelector('.photo-grid__image').src = cardLinkInput.value;
    gridList.prepend(cardsElement);
    evt.preventDefault();
    classRemove();
}

/* функция удаления карточки */
function handleDeleteCard(element) { // element в качестве аргумента
    element.querySelector('.photo-grid__delete-btn').addEventListener('click', deleteCard);
}

function deleteCard (evt) {
    evt.target.closest('.photo-grid__card').remove();
}

/* функция добавления попап с созданием фото */
function handleCreateCard() {
    popupCard.classList.add('popup_is-opened');
}

function formSubmitHandler () {
    popupName.classList.add('popup_is-opened') /* добавляем класс, в результате чего класс popup_is-opened добавляется при нажатии на "редактировать" и удаляется при нажатии на крестик. */ 
    nameInput.value = defaultName.textContent /* получаем информацию из содержимого полей формы */
    jobInput.value = defaultJob.textContent
}

/* функция закрытия попап */
function classRemove () {
    popupName.classList.remove('popup_is-opened');
    popupCard.classList.remove('popup_is-opened');
    popupPhoto.classList.remove('popup_is-opened');
}

/* функция сброса стандартного поведения страницы, перезаписи полученных значений в полях*/
function defaultEvt (evt) {
    evt.preventDefault();
    defaultName.textContent = nameInput.value /* перезаписываем полученные значения полей, для возможности изменения */
    defaultJob.textContent = jobInput.value
    classRemove(); /* вызываем функцию закрытия модального окна */
}

function CloseButtons () {
    popupCloseButton.addEventListener('click', classRemove) 
    popupCloseButtonCard.addEventListener('click', classRemove)
    popupPhotoClose.addEventListener('click', classRemove)
}

CloseButtons();
render();

popupOpenButton.addEventListener('click', formSubmitHandler)
popupEditButton.addEventListener('click', handleCreateCard)
createButton.addEventListener('click', createCard);
formElement.addEventListener('submit', defaultEvt);