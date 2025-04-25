class FormValidator {
  constructor(formElement, settings) {
    this._settings = settings;
    this._formElement = formElement;
    this._formSelector = settings.formSelector;
    (this._inputSelector = settings.inputSelector),
      (this._submitButtonSelector = settings.submitButtonSelector),
      (this._errorClass = settings.errorClass);
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }

  _showInputError(inputElement, errorMessage) {
    console.log("error showing 1");
    this.errorElementId = `#${inputElement.id}-error`;
    this.errorElement = this._formElement.querySelector(this.errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    this.errorElement.textContent = errorMessage;
    this.errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    console.log("error showing 2");
    this.errorElementId = `#${inputElement.id}-error`;
    this.errorElement = this._formElement.querySelector(this.errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    this.errorElement.classList.remove(this._errorClass);
    this.errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    console.log("error showing 3");
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    console.log("error showing 4");
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList) {
    console.log("error showing 5");
    if (this._hasInvalidInput(inputList)) {
      this.buttonElement.classList.add(this._inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this._inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    console.log("error showing 6");
    this.inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this.buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(this.inputList, this.buttonElement, this._settings);

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this.buttonElement);
      });
    });
  }

  enableValidation() {
    console.log("error showing 7");
    // this._formElement = document.querySelector( this._formSelector);
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
export default FormValidator;
