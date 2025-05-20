export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input ");
    this._closeBtn = this._popupElement.querySelector(".popup__close");
    this._popup__button = this._popupElement.querySelector(".popup__button");
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  getForm() {
    return this._popupForm;
  }

  setEventListeners() {
    //  handles both close button and modal listener
    this._popupElement.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("popup") ||
        e.target.classList.contains("popup__close")
      ) {
       this.close();
      }
    });
  }

 _handleEscapeClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };
}
