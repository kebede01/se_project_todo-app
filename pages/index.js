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

const addTodoForm = document.forms["add-todo-form"];

function handleCompletion(completed) {
  todoCounterInstanceObject.updateCompleted(completed);
  }

function handleTotal(increment) {
  todoCounterInstanceObject.updateTotal(increment);
}

function handleDeletion(completed) {
  if (completed) {
    todoCounterInstanceObject.updateCompleted(false);
     handleTotal(false);
  }
  else {
    handleTotal(false);
  }
  }

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

// todo card element creator
const renderTodo = (data, selector, handleCompletion, handleDeletion) => {
  const todo = todoCreator(data, selector, handleCompletion, handleDeletion);
  sectionInstance.addItem(todo);
};
// instanciating section class that appends the todos
const sectionInstance = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item, "#todo-template", handleCompletion, handleDeletion);
  },
  containerSelector: cardListSelector,
});

// iterating the todos data
sectionInstance.renderItems();

// instanciating PopupWithForm class and calling its eventlistener that closes and opens a popup.
const addToDoPopupInstance = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handlerOfSubmission: (values) => {
    const id = uuidv4();
    values["id"] = id;
    renderTodo(values, "#todo-template", handleCompletion, handleDeletion);
  }
  });

addTodoButton.addEventListener("click", () => {
  addToDoPopupInstance.open();
  handleTotal(true);
  handleTotal(false);
  });


// closing popups with "Escape" key included;
addToDoPopupInstance.setEventListeners();

const todoCounterInstanceObject = new TodoCounter(
  initialTodos,
  ".counter__text"
);
// The following replaces "x" and "y" by numbers in the h2 tag
todoCounterInstanceObject._updateText();

const todoForm = addToDoPopupInstance.getForm();
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleTotal(true);
});

// Form validator
const instFormValidator = new FormValidator(addTodoForm, validationConfig);
instFormValidator.enableValidation();
