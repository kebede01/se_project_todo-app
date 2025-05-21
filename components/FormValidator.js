class FormValidator {
  constructor(formElement, settings) {
    this._formElement = formElement;
    this._formSelector = settings.formSelector;
    (this._inputSelector = settings.inputSelector),
      (this._submitButtonSelector = settings.submitButtonSelector),
      (this._errorClass = settings.errorClass);
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }

  _showInputError(inputElement, errorMessage) {
    this.errorElementId = `#${inputElement.id}-error`;
    this.errorElement = this._formElement.querySelector(this.errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    this.errorElement.textContent = errorMessage;
    this.errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this.errorElementId = `#${inputElement.id}-error`;
    this.errorElement = this._formElement.querySelector(this.errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    this.errorElement.classList.remove(this._errorClass);
    this.errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
      
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._formElement.reset();
    this._toggleButtonState();
     }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    }
}
export default FormValidator;
