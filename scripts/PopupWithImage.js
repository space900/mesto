import Popup from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        console.log(this._popup);
        this.open();
    }

    open(link, text) {
        this.Popup.querySelector('.popup__image').src = link;
        this.Popup.querySelector('.popup__caption').textContent = text;
        super.open();
    }
}

export default PopupWithImage

const popupWithImage = new PopupWithImage('.popup_photo');
popupWithImage.open(link, text);