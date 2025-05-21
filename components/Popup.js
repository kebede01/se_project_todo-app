export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeBtn = this._popupElement.querySelector(".popup__close");
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
