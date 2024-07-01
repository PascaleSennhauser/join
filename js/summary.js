const currentTime = new Date();
let currentHour = currentTime.getHours();
let pageStatus = true;
currentStatusTasks = [];
let finalinitals;


/**
 * This function gets the data of the tasks from the remote storage.
 */
async function getTaskData() {
  currentStatusTasks = JSON.parse(await getItem("tasks"));
}


/**
 * This function gets all the information for the summary.
 */
async function initSummary() {
  await includeHTML();
  let renderContainer = document.getElementById("summaryContent_container");
  renderContainer.innerHTML += renderSummaryPageHtml();
  changeGreetingMessage();
  changeCurrentTodos();
  changeTaskInProgress();
  changeTaskDone();
  changeUrgentTasks();
  changeAwaitingFeedbackTasks();
  changeTaskInBoard();
  checkIfUserIsLoggedin();
  try {
    changeInitialsCurrentUser();
  } catch (e) {
  }
  initUsers();
  changeDateUrgentTask();
}


/**
 * This function changes the greeting message.
 */
function changeGreetingMessage() {
  let changeMessage = document.getElementById("greetUserHeadline");
  if (currentHour < 12) {
    changeMessage.innerHTML = `Good Morning`;
  } else if (currentHour <= 17) {
    changeMessage.innerHTML = `Good afternoon`;
  } else {
    changeMessage.innerHTML = `Good Evening`;
  }
}


/**
 * This function gets the current logged in user from the array stored in the local storage.
 */
function getCurrentLoggedInUser() {
  let greetUser = document.getElementById("greetUserName");
  let userData = JSON.parse(localStorage.getItem("userName"));
  greetUser.innerHTML = `${userData}`;
}


/**
 * This function getsd the initials from the user name.
 */
function getInitialsFromUserName() {
  let userData = JSON.parse(localStorage.getItem("userName"));
  let dataInString = userData[0];
  let initials = dataInString.slice(0, 2);
  finalinitals = initials.toUpperCase();
}


/**
 * This function changes the initials for the current user.
 */
function changeInitialsCurrentUser() {
  getInitialsFromUserName();
  let guestUserLoggedIn = JSON.parse(localStorage.getItem("guest"));

  if (guestUserLoggedIn === true) {
    changeHeaderUserIconGuest();
  } else {
    changeHeaderUserIconLoggedIn();
  }
}


/**
 * This function checks if the user is logged in.
 */
function checkIfUserIsLoggedin() {
  let guestUserLoggedIn = JSON.parse(localStorage.getItem("guest"));
  if (guestUserLoggedIn === true) {
    let greetUser = document.getElementById("greetUserName");
    greetUser.innerHTML = "";
  } else {
    getCurrentLoggedInUser();
  }
}


/**
 * This function changes the icon in the header to the guest icon.
 */
function changeHeaderUserIconGuest() {
  let initialsDiv = document.querySelector(".header-profile-icon");
  let initialsDivMobile = document.getElementById("currentUserinHeader");
  initialsDiv.innerHTML = "GU";
  initialsDivMobile.innerHTML = "GU";
}


/**
 * This function changes the icon in the header to the logged in user.
 */
function changeHeaderUserIconLoggedIn() {
  let initialsDiv = document.querySelector(".header-profile-icon");
  let initialsDivMobile = document.getElementById("currentUserinHeader");
  initialsDiv.innerHTML = finalinitals;
  initialsDivMobile.innerHTML = finalinitals;
}


/**
 * This function is to set the current todos.
 */
async function changeCurrentTodos() {
  await getTaskData();
  let todoCount = currentStatusTasks.filter(
    (task) => task.progress === "todo"
  ).length;
  let currentToDo = document.getElementById("currentToDoNumber");
  currentToDo.innerHTML = "";
  currentToDo.innerHTML = todoCount;
}


/**
 * This function is to set the tasks in progress.
 */
async function changeTaskInProgress() {
  await getTaskData();
  let taskInProgressCount = currentStatusTasks.filter(
    (task) => task.progress === "inprogress"
  ).length;
  let taskInProgress = document.getElementById("TaskInProgress");
  taskInProgress.innerHTML = "";
  taskInProgress.innerHTML = taskInProgressCount;
}


/**
 * This function is to set the tasks done.
 */
async function changeTaskDone() {
  await getTaskData();
  let taskDoneCount = currentStatusTasks.filter(
    (task) => task.progress === "done"
  ).length;
  let tasksDone = document.getElementById("DoneToDos");
  tasksDone.innerHTML = "";
  tasksDone.innerHTML = taskDoneCount;
}


/**
 * This function is to set the urgent tasks.
 */
async function changeUrgentTasks() {
  await getTaskData();
  let taskUrgentCount = currentStatusTasks.filter(
    (task) => task.priority === "urgent"
  ).length;
  let tasksUrgent = document.getElementById("urgentToDos");
  tasksUrgent.innerHTML = "";
  tasksUrgent.innerHTML = taskUrgentCount;
}


/**
 * This function is to set the awaitng feedback tasks.
 */
async function changeAwaitingFeedbackTasks() {
  await getTaskData();
  let awaitingFeedbackTasksCount = currentStatusTasks.filter(
    (task) => task.progress === "awaitfeedback"
  ).length;
  let tasksAwaitingFeedback = document.getElementById("TaskAwaitingFeedback");
  tasksAwaitingFeedback.innerHTML = "";
  tasksAwaitingFeedback.innerHTML = awaitingFeedbackTasksCount;
}


/**
 * This function is to set the tasks in the board.
 */
async function changeTaskInBoard() {
  await getTaskData();
  let allCurrentTasks = currentStatusTasks.length;
  let allCurrentTaskContainer = document.getElementById("TasksInBoard");
  allCurrentTaskContainer.innerHTML = allCurrentTasks;
}


/**
 * This function is to set the date of the most urgent task.
 */
async function changeDateUrgentTask() {
  let dateContainer = document.getElementById("deadlineToDoDate");
  arrayData = JSON.parse(await getItem("tasks"));

  if (arrayData) {
    let dateOnlyArray = arrayData
      .filter((task) => task.duedate)
      .map((task) => ({ duedate: new Date(task.duedate) }));
    dateOnlyArray.sort((a, b) => a.duedate - b.duedate);

    if (dateOnlyArray.length > 0) {
      let nextDueDate = dateOnlyArray[0].duedate;

      if (isValidDate(nextDueDate)) {
        dateContainer.innerText = nextDueDate.toLocaleDateString();
      } else {
        let validNextDueDate = findNextValidDate(dateOnlyArray);

        dateContainer.innerText = validNextDueDate
          ? validNextDueDate.toLocaleDateString()
          : "No valid deadline found";
      }
    } else {
      dateContainer.innerText = "No Deadline";
    }
  } else {
    console.log("Error: arrayData ist undefined");
  }
}


/**
 * This function checks if the date is valid.
 * @param {Date} date - The date.
 * @returns {Boolean} - Returns true if the date is valid, otherwise false.
 */
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}


/**
 * This function looks for the next valid date.
 * @param {Array<date>} dateOnlyArray - The array with the dates of the tasks.
 * @returns {Date | null} - Returns the valid date or null.
 */
function findNextValidDate(dateOnlyArray) {
  for (let i = 1; i < dateOnlyArray.length; i++) {
    if (isValidDate(dateOnlyArray[i].duedate)) {
      return dateOnlyArray[i].duedate;
    }
  }
  return null;
}
