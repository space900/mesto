/* объявляем переменные */
const itemTemplate = document.querySelector('.photo-grid__list-template').content;
let formElement = document.querySelector('form')
let popupName = document.querySelector('.popup_texts')
let popupCard = document.querySelector('.popup_cards')
let popupOpenButton = document.querySelector('.info__edit-btn')
let popupEditButton = document.querySelector('.profile__btn')
let popupCloseButton = document.querySelector('.popup__close_texts')
let popupCloseButtonCard = document.querySelector('.popup__close_cards')
let defaultName = document.querySelector('.info__title')
let defaultJob = document.querySelector('.info__subtitle')
let nameInput = document.querySelector('.popup__text_field_name')
let jobInput = document.querySelector('.popup__text_field_job')
let cardNameInput = document.querySelector('.popup__card_field_name')
let cardLinkInput = document.querySelector('.popup__card_field_link')
let gridList = document.querySelector('.photo-grid__list')
let createButton = document.querySelector('.popup__submit_create-btn')
let popupPhoto = document.querySelector('.popup_photo')
let popupPhotoClose = document.querySelector('.popup__close_image')


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

function getCurrentPhoto(card) {
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

function handleDeleteCard() {
    gridList.onclick = function(e) {
        const btn = e.target.closest('.photo-grid__delete-btn');
        if (!btn) {
            return;
        }
        btn.parentElement.remove();
    }
}

function toggleLike() {
    cardsElement.querySelector('.photo-grid__like-btn').addEventListener('click', toggleLikeTarget);
}

function toggleLikeTarget (evt) {
    evt.target.classList.toggle('photo-grid__like-btn_active');
}

/* Создание карточек из массива */
function render () {
    initialCards.forEach (renderItems);
}

function renderItems (element) {
    cardsElement = itemTemplate.cloneNode(true);
    cardsElement.querySelector('.photo-grid__title').textContent = element.name;
    cardsElement.querySelector('.photo-grid__image').src = element.link;
    cardsElement.querySelector('.photo-grid__image').alt = element.altText;
    toggleLike();
    getCurrentPhoto(cardsElement);
    
    handleDeleteCard();
    gridList.append(cardsElement);
}

/* Создание карточки по клику */
function createCard(evt) {
    cardsElement = itemTemplate.cloneNode(true);
    toggleLike();
    getCurrentPhoto(cardsElement);
    cardsElement.querySelector('.photo-grid__title').textContent = cardNameInput.value;
    cardsElement.querySelector('.photo-grid__image').src = cardLinkInput.value;
    gridList.prepend(cardsElement);
    evt.preventDefault();
    classRemove();
    handleDeleteCard();
}

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

popupOpenButton.addEventListener('click', formSubmitHandler) /* делаем кнопку работоспособной при помощи метода addEventListener, события "клик" и ранее объявленной функции */
popupEditButton.addEventListener('click', handleCreateCard)
createButton.addEventListener('click', createCard);
formElement.addEventListener('submit', defaultEvt);