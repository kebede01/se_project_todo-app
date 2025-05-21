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

const todoCounterInstanceObject = new TodoCounter(
  initialTodos,
  ".counter__text"
);

const addTodoForm = document.forms["add-todo-form"];

function handleCompletion(completed) {
  todoCounterInstanceObject.updateCompleted(completed);
}

function handleTotal(increment) {
  todoCounterInstanceObject.updateTotal(increment);
}

function handleDeletion(completed) {
  handleTotal(false);
  if (completed) {
    todoCounterInstanceObject.updateCompleted(false);
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
// instansiating section class that appends the todos
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
const popupWithFormObject = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handlerOfSubmission: (values) => {
    const id = uuidv4();
    values["id"] = id;
    renderTodo(values, "#todo-template", handleCompletion, handleDeletion);
    handleTotal(true);
    instFormValidator.resetValidation();
  },
});

addTodoButton.addEventListener("click", () => {
  popupWithFormObject.open();
});
// closing popups with "Escape" key included;
popupWithFormObject.setEventListeners();
// Form validator
const instFormValidator = new FormValidator(addTodoForm, validationConfig);
instFormValidator.enableValidation();
