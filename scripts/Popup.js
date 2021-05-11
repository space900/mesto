class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keyup', this._handleEscClose);
    }
        
    close = () => {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        //const cardImage = this._popupSelector.querySelector(".photo-grid__image");
        //cardImage.addEventListener('click', this.close);
        this._popup.querySelector('.popup__close').addEventListener(() => {
            this.close();
        })
    }
}

export default Popup