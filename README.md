# Simple Todo App
This project is about creating a todo-list page.

## Functionality

The project allows users to add their own todo-list and delete if they don't want it.
The page won't allow invalid inputs because there is a validation checker in the codes.
The todo-list displays how many tasks completed and total number of tasks.

## Technology

The technologies used are refactoring a file to different components and finally amalgamate them in one index.js file using module 'import and export' technique.
Refactoring index.js file satisfies the idea of "separation of concerns". i.e I moved all the factory functions to a 'components' folder and created a file for each class. 'Todo.js' owns 'Todo' class and 'FormValidator.js' owns 'FormValidator' class. Finally I moved these modules to index.js file.
Moving modules require key words "export" and "import".

Loose coupling of classes is used by introducing a named callback function in the constructor. Inaddition I created a separate class called 'section' which is resposible for appending any element anywhere we choose in the index.html.

## Deployment

This project is deployed on GitHub Pages:

- SEE LINK HERE:
  [https://github.com/kebede01/se_project_todo-app.git]
