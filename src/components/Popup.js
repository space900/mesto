class Popup {
    constructor(popupElement) {
        this._popup = document.querySelector(popupElement);
    }

    open() {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            evt.preventDefault();
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
        document.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_is-opened')) {
                this.close();
            }
        })
    }
}

export default Popup