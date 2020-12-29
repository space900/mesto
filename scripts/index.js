let formElement = document.querySelector('.popup')
let popupOpenButton = document.querySelector('.info__edit-btn')
let popupCloseButton = document.querySelector('.popup__close')
let popupSaveButton = document.querySelector('.popup__save-btn')
let defaultName = document.querySelector('.info__title')
let defaultJob = document.querySelector('.info__subtitle')
let nameInput = document.querySelector('.popup__text_name')
let jobInput = document.querySelector('.popup__text_job')

function formSubmitHandler (evt) {
    evt.preventDefault();

    defaultName.textContent = nameInput.value;
    defaultJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

formElement.addEventListener('click', function() {
    if (event.target === event.currentTarget) {
        formElement.classList.remove('popup_is-opened')
    }
})

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