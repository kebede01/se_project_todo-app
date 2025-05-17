import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  initialTodos,
  validationConfig,
  cardListSelector,
  addTodoButton,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
// const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
// const todosList = document.querySelector(".todos__list");
function todoCreator(data, selector, handleCompletion, handleDeletion) {
  const todoInstance = new Todo(
    data,
    selector,
    handleCompletion,
    handleDeletion
  );
  const todoElement = todoInstance.getView();
  return todoElement;
}

function handleCompletion(completed) {
  todoCounterInstanceObject.updateCompleted(completed);
}

function handleDeletion(completed) {
  if (completed) {
    todoCounterInstanceObject.updateCompleted(false);
  }
}

function handleTotal(increment) {
  todoCounterInstanceObject.updateTotal(increment);
}
// instanciating section class that appends the todos
const sectionInstance = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = todoCreator(
      item,
      "#todo-template",
      handleCompletion,
      handleDeletion
    );
    sectionInstance.addItem(todoElement);
  },
  containerSelector: cardListSelector,
});

// iterating the todos data
sectionInstance.renderItems();

// instanciating PopupWithForm class and calling its eventlistener that closes and opens a popup.
const addToDoPopupInstance = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handlerOfSubmission: (values) => {
    const todoElement = todoCreator(
      values,
      "#todo-template",
      handleCompletion,
      handleDeletion
    );
    sectionInstance.addItem(todoElement);
  },
  handleTotal,
});

// closing popups with "Escape" key included;
addToDoPopupInstance.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addToDoPopupInstance.open();
});

const todoCounterInstanceObject = new TodoCounter(
  initialTodos,
  ".counter__text"
);
const text = todoCounterInstanceObject._updateText();
sectionInstance.addItem(text);

// Form validator
const instFormValidator = new FormValidator(addTodoForm, validationConfig);
instFormValidator.enableValidation();
