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
  inputElement.classList.add("popup__text_invalid");
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