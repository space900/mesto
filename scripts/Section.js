
class Section {
    constructor({data, renderer}, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    appendItem(showCard) {
        this._container.append(showCard);
    }

    prependItem(showCard) {
        this._container.prepend(showCard);
    }



    // prependItem(showCard) {
    //     this._container.prepend(showCard);
    // }

    clear() {
        this._container.innerHTML = '';
        
    }

    renderItems() {
        this.clear();
            
        this._renderedItems.forEach((item) => {
            this._renderer(item);
        });
    }

}

// const itemTemplate = document.querySelector(".photo-grid__list-template").content.querySelector(".photo-grid__card");

// const appendCard = (showCard) => {
//     gridList.append(createCard(showCard));
// }

// const renderCard = (data) => {
//     appendCard(data);
// }



// function renderInitialCards() {
//     initialCards.forEach(renderCard); //вызываем метод forEach чтобы пройти по всем элементам
// }

export default Section