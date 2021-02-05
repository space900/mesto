const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__text_invalid");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__text_input-error");
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__text_invalid");
  errorElement.classList.remove("popup__text_input-error");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideError(formElement, inputElement);
  }
};

function setEventListeners(formElement) {
  let inputList = Array.from(formElement.querySelectorAll(".popup__text_input"));
  inputList.forEach((inputElement) => {
    console.log(formElement);
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
    });
  });
}

function enableValidation() {
  let formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

enableValidation();
