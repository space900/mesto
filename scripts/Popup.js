class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
    }

    open() {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keyup', this._handleEscClose);
        document.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_is-opened')) {
                this.close();
            }
        })
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

    _closeByOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            evt.preventDefault();
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    }
}

export default Popup