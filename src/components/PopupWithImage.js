import Popup from '../components/Popup.js'

class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
    }

    open(link, text) {
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImage.src = link;
        this._popup.querySelector('.popup__caption').textContent = text;
        this._popupImage.alt = text;
        super.open();
    }
}

export default PopupWithImage

