import Popup from '../components/Popup.js'

class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }

    _getInputValues() {
        this._values = {};
        const inputs = [...this._form.querySelectorAll('.popup__text_input')];
        inputs.forEach((input) => {
            this._values[input.name] = input.value;
        })
        return this._values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popup.querySelector('.popup__form');
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