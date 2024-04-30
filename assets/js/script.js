// Grab references to the important DOM elements
// Modal form's elements
const modalFormEl = $("#modalForm");
const modalCloseEl = $("#close");

// Input elements
const taskTitleInputEl = $("#taskTitleInput");
const taskDescriptionInputEl = $("taskDescriptionInput");
const taskDueDateEl = $("#taskDueDate");

// Display anchors' elements
const todoCardsEl = $("todo-cards");
const inProgressCardsEl = $("in-progress-cards");
const doneCardsEl = $("done-cards");

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.nextId);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  //...
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  // Prevent the default behavior
  event.preventDefault();

  console.log(`from handleAddTask`);
  clearCaledar();
  //modalFormEl.hide();

  
  //return taskCard;
}

function clearCaledar() {
  console.log('from clearCalendar');
  taskDueDateEl.datepicker("setDate", null);
}

// ? Add event listener to the form element, listen for a submit event, and call the `handleAddTask` function.
modalFormEl.on("submit", handleAddTask);
//modalFormEl.blur(clearCaledar);

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// When the user clicks on <span> (x), close the modal
/*
modalCloseEl.onclick = function() {
  modalFormEl.style.display = "none";
}
*/


/*
// Get a reference to the modal element
const myModal = new bootstrap.Modal(modalFormEl);

// Function to open the modal
function openModal() {
  myModal.show();
}

// Function to close the modal
function closeModal() {
  myModal.hide();
}

// Event listener to open the modal when a button is clicked
modalFormEl.addEventListener("click", openModal);
*/


// Datepicker widget
$(function () {
  $("#taskDueDate").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
