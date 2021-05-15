import Popup from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup); 
        this.open();
    }

    open(link, text) {
        console.log(this);
        this._popup.querySelector('.popup__image').src = link;
        this._popup.querySelector('.popup__caption').textContent = text;
        
        super.open();
    }
}

export default PopupWithImage

