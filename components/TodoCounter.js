class TodoCounter {
constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._numberOfCompletedTodos = todos.filter(
      (todo) => todo.completed
    ).length;
    this._total = todos.length;
  }

updateCompleted = (increment) => {
    this._numberOfCompletedTodos += increment ? 1 : -1;
    this._updateText();
  };

updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._numberOfCompletedTodos} out of ${this._total} completed`;
  }
}
export default TodoCounter;
