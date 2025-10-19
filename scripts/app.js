//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-task");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");


//New task list item
const createNewTaskElement = (taskString) => {

  const listItem = document.createElement("li");
  listItem.classList.add("task__list-item");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("task__checkbox")

  const label = document.createElement("label");
  label.classList.add("task__label");
  label.innerText = taskString;

  const editInput = document.createElement("input");
  editInput.classList.add("task__control");
  editInput.type = "text";

  const editButton = document.createElement("button");
  editButton.classList.add("task__button", "task__button_edit");
  editButton.innerText = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("task__button", "task__button_delete");

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add("task__button-icon");
  deleteButtonImg.src = './images/remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = () => {
  console.log("Add Task...");

  if (!taskInput.value || !taskInput.value.trim()) return;

  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.
const editTask = (event) => {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = event.target.closest('li');

  const editInput = listItem.querySelector('input[type = text]');
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".task__button_edit");
  const containsClass = listItem.classList.contains("task__list-item_edit-mode");

  if (containsClass) {
    if (editInput.value && editInput.value.trim()) {
      label.innerText = editInput.value.trim();
    }
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("task__list-item_edit-mode");
};

//Delete task.
const deleteTask = (event) => {
  console.log("Delete Task...");

  const listItem = event.target.closest('li');
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = (event) => {
  console.log("Complete Task...");

  const listItem = event.target.closest('li');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = (event) => {
  console.log("Incomplete Task...");

  const listItem = event.target.closest('li');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = () => {
  console.log("AJAX Request");
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector(".task__button_edit");
  var deleteButton = taskListItem.querySelector(".task__button_delete");

  // editButton.onclick = editTask;
  editButton.addEventListener('click', editTask);
  // deleteButton.onclick = deleteTask;
  deleteButton.addEventListener('click', deleteTask);
  // checkBox.onchange = checkBoxEventHandler;
  checkBox.addEventListener('change', checkBoxEventHandler);
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
