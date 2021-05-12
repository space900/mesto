import Popup from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(url, text) {
        this.Popup.querySelector('.photo-grid__image').src = url;
        this.Popup.querySelector('.photo-grid__title').textContent = text;
        super.open();
    }
}

export default PopupWithImage