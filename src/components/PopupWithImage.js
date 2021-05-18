import Popup from '../components/Popup.js'

class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
    }

    open(link, text) {
        this._popup.querySelector('.popup__image').src = link;
        this._popup.querySelector('.popup__caption').textContent = text;
        this._popup.querySelector('.popup__image').alt = text;
        super.open();
    }
}

export default PopupWithImage

