
class Todo {
  constructor(data, selector) {
    this._selector = selector;
    this._data = data;
   
  }

  _generateCheckboxElement() {
     this._todoCheckboxElement = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxElement.checked = this._data.completed;
    // Apply id and for attributes.
    // The id will initially be undefined for new todos.
    this._todoCheckboxElement.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  
  }

  _generateDate() {
    this._todoDate = this._todoElement.querySelector(".todo__date");
    
    // If a due date has been set, parsing this it with `new Date` will return a
    // number. If so, we display a string version of the due date in the todo.
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }
  _setEventListeners() {
    this._todoCheckboxElement.addEventListener("click", () => {
      this._data.completed = !this._data.completed;
      
    });

    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoDeleteBtn.addEventListener("click", () => {
    this._todoElement.remove();
    });
  }
  _getView() {
    this._todoTemplate = document.querySelector(this._selector);
    // console.log(this._todoTemplate);
    this._todoElement = this._todoTemplate.content
      .querySelector(".todo")
      .cloneNode(true);
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    
    this._todoNameEl.textContent = this._data.name;

      this._generateCheckboxElement();
      this._generateDate();
      this._setEventListeners();
      return this._todoElement;
    }
  }


export default Todo;