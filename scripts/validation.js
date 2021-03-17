class formValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._errorElement = this._form.querySelector(`.${this._inputElement.id}-error`);
  }

  _showInputError = (formElement, _inputElement, errorMessage, errorClass) => {
    this._inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError = (formElement, inputElement, validOptions) => {
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    this._inputElement.classList.remove(validOptions.inputErrorClass);
    this._errorElement.classList.remove(validOptions.errorClass);
    this._errorElement.textContent = "";
  };
  
  _checkInputValidity = (formElement, inputElement, validOptions) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement, validOptions);
    }
  };
  
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  _toggleButtonState = (inputList, buttonElement) => {
    if (inputList) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(this._validOptions.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled", false);
      buttonElement.classList.remove(this._validOptions.inactiveButtonClass);
    }
  };
  
  _setEventListeners = (formElement, validOptions) => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validOptions.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validOptions.submitButtonSelector);
    toggleButtonState(hasInvalidInput(inputList), buttonElement, validOptions);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement, validOptions);
        this._toggleButtonState(hasInvalidInput(inputList), buttonElement, validOptions);
      });
    });
  };
  
  _enableValidation = (validOptions) => {
    const getFormList = Array.from(document.querySelectorAll(validOptions.formSelector));
    getFormList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      _setEventListeners(formElement, validOptions);
    });
  };
  

}


const validOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text_input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__text_invalid",
  errorClass: "`${inputElement.id}-error`",
};

const showInputError = (formElement, inputElement, errorMessage, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validOptions.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, validOptions) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validOptions.inputErrorClass);
  errorElement.classList.remove(validOptions.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validOptions) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, validOptions);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (inputList) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(validOptions.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled", false);
    buttonElement.classList.remove(validOptions.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, validOptions) => {
  const inputList = Array.from(formElement.querySelectorAll(validOptions.inputSelector));
  const buttonElement = formElement.querySelector(validOptions.submitButtonSelector);
  toggleButtonState(hasInvalidInput(inputList), buttonElement, validOptions);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validOptions);
      toggleButtonState(hasInvalidInput(inputList), buttonElement, validOptions);
    });
  });
};

const enableValidation = (validOptions) => {
  const getFormList = Array.from(document.querySelectorAll(validOptions.formSelector));
  getFormList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validOptions);
  });
};

enableValidation(validOptions);