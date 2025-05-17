export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    // console.log(this._popupElement);
    this._addTodoCloseBtn = this._popupElement.querySelector(".popup__close");
    this._addTodoForm = this._popupElement.querySelector(".popup__form");
    this.inputList = this._addTodoForm.querySelectorAll(".popup__input ");
  }

  open() {
    this._popupElement.classList.add("popup_visible");

    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
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

  _handleEscapeClose(e) {
    if (e.key === "Escape") {
      const currentlyOpenedModal = document.querySelector(".popup_visible");
      currentlyOpenedModal.classList.remove("popup_visible");
    }
  }
}
