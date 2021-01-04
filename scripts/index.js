/* объявляем переменные */

let formElement = document.querySelector('form')
let popup = document.querySelector('.popup')
let popupOpenButton = document.querySelector('.info__edit-btn')
let popupCloseButton = document.querySelector('.popup__close')
let defaultName = document.querySelector('.info__title')
let defaultJob = document.querySelector('.info__subtitle')
let nameInput = document.querySelector('.field_name')
let jobInput = document.querySelector('.field_job')

/* объявляем общую функцию*/

function formSubmitHandler (evt) {
    popup.classList.add('popup_is-opened') /* добавляем toggle в попап, в результате чего класс popup_is-opened добавляется при нажатии на "редактировать" и удаляется при нажатии на крестик. */ 
    nameInput.value = defaultName.textContent /* получаем информацию из содержимого полей формы */
    jobInput.value = defaultJob.textContent
}

function classRemove (evt) {
    popup.classList.remove('popup_is-opened');
}

function defaultEvt (evt) {
    evt.preventDefault();
    defaultName.textContent = nameInput.value /* перезаписываем полученные значения полей, для возможности изменения */
    defaultJob.textContent = jobInput.value
    classRemove();
}

popupOpenButton.addEventListener('click', formSubmitHandler) /* делаем кнопку работоспособной при помощи метода addEventListener, события "клик" и ранее объявленной функции */
popupCloseButton.addEventListener('click', classRemove)
formElement.addEventListener('submit', defaultEvt);