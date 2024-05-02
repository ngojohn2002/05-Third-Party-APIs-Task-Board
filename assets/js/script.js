// Grab references to the important DOM elements
const modalFormEl = $("#modalForm");
const taskTitleInputEl = $("#taskTitleInput");
const taskDueDateEl = $("#taskDueDate");
const taskDescriptionInputEl = $("taskDescriptionInput");

// Retrieve tasks and nextId from localStorage
function readTaskListFromStorage() {
  let taskList = JSON.parse(localStorage.getItem("taskList"));
  // If no taskList in localStorage, create an empty array taskList and generate new task ID
  if (!taskList) {
    taskList = [];
  }

  let nextId = JSON.parse(localStorage.getItem("nextId"));
  //  If nextId is null, generate new task ID
  if (nextId === null) {
    nextId = generateTaskId();
  }

  console.log("from readTaskListFromStorage():" + taskList);

  return taskList;
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // If nextId is null, assign a unique ID starting from 1
  if (nextId === null) {
    nextId = 1;
  } else {
    // increment nextId by 1 for each subsequent ID to keep it unique
    nextId++;
  }
  
  // Store nextId in local storage
  localStorage.setItem("nextId", JSON.stringify(nextId));
  
  console.log("from generateTaskId(), nextId: " + nextId);

  //return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  /*
  const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('nextId', task.nextId);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  //const cardDescription = $('<p>').addClass('card-text').text(task.due)
  */

  // Add task to taskList
  //taskList.push(task);

  // Stringify taskList array of tasks and save it in localStorage.
  //localStorage.setItem("taskList", JSON.stringify(taskList));

  console.log("from createTaskCard(task)");
}

function saveTaskListToStorage(taskList) {
  localStorage.setItem('taskList', JSON.stringify(taskList));

  console.log("from saveTaskListToStorage(taskList).");
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const todoList = $('#todo-cards');
  const inProgressList = $('#in0progress-cards');
  const doneList = $('#done-cards');

  // Empty out all swim lanes
  todoList.empty();
  inProgressList.empty();
  doneList.empty();
  
  // Read in task list from storage
  const taskList = readTaskListFromStorage();

  // Loop through task list and create task cards for each status
  for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }

  // Use JQuery UI to make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // Create the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card that is draggable and clone that.
      const target = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's being dragged to another lane.
      return target.clone().css({
        width: target.outerWidth(),
      });
    },
  });

  console.log("from renderTaskList().");
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  // Prevent the default behavior
  event.preventDefault();

  taskTitleInputEl.val('');
  taskDescriptionInputEl.val('');
  taskDueDateEl.val('');
  
  console.log(`from handleAddTask(event)`);
  
  //return taskCard;
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const nextId = $(this).attr("nextId");
  const taskList = readTaskListFromStorage();

  // Remove task from the array
  taskList.forEach((task) => {
    if (taskList.nextId === nextId) {
      taskList.splice(taskList.indexOf(task), 1);
    }
  });

  // Save the task list to localStorage
  saveTaskListToStorage(taskList);

  // Render task list back to the screen
  renderTaskList();

  console.log("from handleDeleteTask(event)");
}

// Todo: create a function to handle dropping a task into a new status lane
// This function is called when a card is dropped into a lane. It updates the status of the task and saves it to localStorage. You can see this function is called in the `droppable` method below.
function handleDrop(event, ui) {
  // Read task list from localStorage
  const taskList = readTaskListFromStorage();

  // Get the task id from the event
  const taskId = ui.draggable[0].dataset.taskId;

  // Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of taskList) {
    // Find the task card by the `id` and update the task status.
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  // Save the updated task list array to localStorage (overwritting the previous one) and render the new task data to the screen.
  localStorage.setItem("taskList", JSON.stringify(taskList));
  renderTaskList();

  console.log("from handleDrop(event, ui).");
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // Render the task list
  renderTaskList();

  // Add event listeners
  // Add event listener to the form element, listen for a submit event, and call the `handleAddTask` function.
  modalFormEl.on("submit", handleAddTask);

  // Make lanes droppable
  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });

  // Make due date field a date picker
  $(function () {
    $("#taskDueDate").datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

  console.log("from ready(function ()).");
});
