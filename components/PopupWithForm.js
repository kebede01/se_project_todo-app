import Popup from "./Popup.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handlerOfSubmission, handleTotal }) {
    super({ popupSelector });
    this.handlerOfSubmission = handlerOfSubmission;
    this.handleTotal = handleTotal;
  }

  _getInputValues() {
    const values = {};
    this.inputList.forEach((input) => {
      const id = uuidv4();
      values["id"] = id;
      if (input.name === "date") {
        const date = new Date(input.value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        values[input.name] = date;
      } else {
        values[input.name] = input.value;
      }
    });
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._addTodoForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this.handlerOfSubmission(values);
      this.handleTotal(true);
      super.close();
    });
  }
}
