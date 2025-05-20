import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handlerOfSubmission }) {
    super({ popupSelector });
    this.handlerOfSubmission = handlerOfSubmission;
   
  }

_getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }
 
setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this.handlerOfSubmission(values);
      this._popupForm.reset();
      this._popup__button.disabled = true;
      super.close();
    });
  }
}
