import Popup from '../components/Popup.js'

class PopupWithFormSubmit extends Popup {
    constructor(popupElement, submitHandler) {
        super(popupElement);
        this._submitHandler = submitHandler;
    }

    setEventListeners() {
        this._submitHandler()
    }

}


export default PopupWithFormSubmit