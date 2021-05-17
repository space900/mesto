import Popup from '../components/Popup.js'

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
    }

    open(link, text) {
        this._popup.querySelector('.popup__image').src = link;
        this._popup.querySelector('.popup__caption').textContent = text;
        super.open();
    }
}

export default PopupWithImage

