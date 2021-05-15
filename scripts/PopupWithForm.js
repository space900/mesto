import Popup from './Popup.js'

class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }

    _getInputValues() {
        const values = {};
        const inputs = [...this._form.querySelectorAll('.popup__text_input')];
        inputs.forEach((input) => {
            values[input.name] = input.value;
        })
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popup.querySelector('form');
        this._form.addEventListener('submit', () => {
            this._submitHandler(this._getInputValues());
        })
    }

    close() {
        this._form.reset();
        super.close();
    }
}

export default PopupWithForm