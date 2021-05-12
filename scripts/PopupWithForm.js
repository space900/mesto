import Popup from './Popup.js'

class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }

    _getInputValues() {

    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popup.querySelector('form');
        form.addEventListener('submit', () => {

        })
    }

    close() {
        this.form.reset();
        super.close();
    }
}

export default PopupWithForm