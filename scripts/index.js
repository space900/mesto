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
let deleteButton = document.querySelector('.photo-grid__delete-btn')
let photoGrid = document.querySelector('.photo-grid')


/* объявляем общую функцию*/

/*
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

var arrayImage = []; // определяете искомый массив объектов изображений
for (var j = 0, J = initialCards.length; j < J; j++)
   {
   arrayImage [j] = new Image ();
   arrayImage [j].src = initialCards [j];
} */

function addPhotoGrid() {
    const photoTemp = document.querySelector('#photo-template').content;
    const photoElement = photoTemp.cloneNode(true);
    photoGrid.appendChild(photoElement);
}

addPhotoGrid();



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

/*
function createButtons() {
    let buttonGenerate = document.querySelector('popup__create-btn');
    deleteButton = document.querySelector('photo-grid__delete-btn');

    buttonGenerate.textContent = 'add';
    buttonDelete.textContent = 'Delete';
    
    let photoGrid = document.querySelector('photo-grid');

    photoGrid.appendChild(buttonGenerate);
    photoGrid.appendChild(buttonDelete);

    buttonGenerate.addEventListener('click', createImgElement);
    buttonDelete.addEventListener('click', deleteImgElement);
}

function deleteImgElement() {
    let image = document.querySelector('.photo-grid__card');

		if (image != undefined) {
			image.remove();
		} else {
			console.log('Image is undefined');
		}
}

function createImgElement() {
    let image = document.createElement('photo-grid__card');

    image.src = src;

    document.querySelector('photo-grid').appendChild(image);
} */

popupOpenButton.addEventListener('click', formSubmitHandler) /* делаем кнопку работоспособной при помощи метода addEventListener, события "клик" и ранее объявленной функции */
popupEditButton.addEventListener('click', formCreateCard)
/*deleteButton.addEventListener('click', deleteImgElement); */
CloseButtons();
formElement.addEventListener('submit', defaultEvt);
/* createButtons(); */