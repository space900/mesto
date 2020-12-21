let formElement = document.querySelector('.popup')
let popupOpenButton = document.querySelector('.info__edit-btn')
let popupCloseButton = document.querySelector('.popup__close')
let popupSaveButton = document.querySelector('.popup__save-btn')
let defaultName = document.querySelector('.info__title')
let defaultJob = document.querySelector('.info__subtitle')
let nameInput = document.querySelector('.popup__name')
let jobInput = document.querySelector('.popup__job')

function formSubmitHandler (evt) {
    evt.preventDefault();

    defaultName.textContent = nameInput.value;
    defaultJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

popupOpenButton.addEventListener('click', function(evt) {
    formElement.classList.add('popup_is-opened');

    nameInput.value = defaultName.textContent
    jobInput.value = defaultJob.textContent
    
})

popupSaveButton.addEventListener('click', function(evt) {
    nameInput.textContent = defaultName.value
    formElement.classList.remove('popup_is-opened');
})


popupCloseButton.addEventListener('click', function(evt) {
    formElement.classList.remove('popup_is-opened');
})