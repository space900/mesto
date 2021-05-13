import initialCards from './data.js'

class Section {
    constructor({ items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderInitialCards() {
        initialCards.forEach(renderCard)
    }

    addItem() {

    }
}



const itemTemplate = document.querySelector(".photo-grid__list-template").content.querySelector(".photo-grid__card");

const appendCard = (showCard) => {
    gridList.append(createCard(showCard));
}

const renderCard = (data) => {
    appendCard(data);
}

const createCard = (cardData) => {
    const card = new Card(cardData, itemTemplate);
    return card.getCard();
}

function renderInitialCards() {
    initialCards.forEach(renderCard); //вызываем метод forEach чтобы пройти по всем элементам
}

renderInitialCards();