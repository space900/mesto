/* объявляем переменные */

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

/* объявляем общую функцию*/

function formSubmitHandler (evt) {
    popupName.classList.add('popup_is-opened') /* добавляем класс, в результате чего класс popup_is-opened добавляется при нажатии на "редактировать" и удаляется при нажатии на крестик. */ 
    nameInput.value = defaultName.textContent /* получаем информацию из содержимого полей формы */
    jobInput.value = defaultJob.textContent
}

function formCreateCard (evt) {
    popupCard.classList.add('popup_is-opened');
}

/* функция закрытия попап */

function classRemove (evt) {
    popupName.classList.remove('popup_is-opened');
    popupCard.classList.remove('popup_is-opened');
}


/* функция сброса стандартного поведения страницы, перезаписи полученный значений в полях*/

function defaultEvt (evt) {
    evt.preventDefault();
    defaultName.textContent = nameInput.value /* перезаписываем полученные значения полей, для возможности изменения */
    defaultJob.textContent = jobInput.value
    classRemove(); /* вызываем функцию закрытия модального окна */
}

function CloseButtons (evt) {
    popupCloseButton.addEventListener('click', classRemove) & popupCloseButtonCard.addEventListener('click', classRemove)
}

popupOpenButton.addEventListener('click', formSubmitHandler) /* делаем кнопку работоспособной при помощи метода addEventListener, события "клик" и ранее объявленной функции */
popupEditButton.addEventListener('click', formCreateCard)
CloseButtons();
formElement.addEventListener('submit', defaultEvt);