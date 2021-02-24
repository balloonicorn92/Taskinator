var formEl = document.querySelector('#task-form');
var taskToDoEl = document.querySelector('#task-to-do');
var pageContentEl = document.querySelector('#page-content')
var taskInProgressEl = document.querySelector("#tasks-in-progress");
var taskCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var tasks = [];

var taskFormHandler = function (event) {
    //stop page from acting on default action or refreshing upon submisison of form
    event.preventDefault();
    //grab the input "value" of task name
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //grab the input "value" of task type
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert('Yo....... you forgot to fill out the form tho');
        return false;
    }
    formEl.reset();
    var isEdit =  formEl.hasAttribute("data-task-id");
//has data attribute so get task id and call function to complete edit process
if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
    //no data attribute so create object as normal and pass create task handler function
} else {
    var taskDataObj = {
        name:taskNameInput,
        type: taskTypeInput,
        status: "to do"
    };
        //send it as an arguement to createtaskel
        createTaskEl(taskDataObj);
}
};
var createTaskEl = function (taskDataObj) {
    //create a new li element
    var listItemEl = document.createElement('li');
    //give it a class name
    listItemEl.className = 'task-item';
    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    //create a div element
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = 'task-info';
    //add html content to div
    taskInfoEl.innerHTML = "<h3 class= 'task-name'>" + taskDataObj.name + "</h3><span class= 'task-type'>" + taskDataObj.type + "</span>";
    // append new div element to li element
    listItemEl.appendChild(taskInfoEl);
    var taskActionsEl = createTaskActions(taskIdCounter);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    listItemEl.appendChild(taskActionsEl);
    //append entire li element to ul element
    taskToDoEl.appendChild(listItemEl);
    saveTasks();
    //increase task counter for next unique id
    taskIdCounter++;

}
var createTaskActions = function (taskId) {
    //this div will be a container for other elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    //create two new button and append them to div--FIRST EDIT BUTTON
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
    //delete button
    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
    //dropdown 
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);
    var statusChoices = ["To Do","In Progress","Completed"];
    for (var i = 0; i < statusChoices.length; i ++){
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
};
var taskButtonHandler = function(event) {
    //get target element from event 
    var targetEl = event.target;
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } else if (targetEl.matches('.delete-btn')) {
        //get the element by the id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    //create new array to hold updated list of tasks
    var updatedTaskArr = [];
    //loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        //if taks[i].id doesnt match value of taskId keep task and push it into new arr
        if (tasks[i]!== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    //reassign tasks arr to be the same as updatedtasksarr
    taks = updatedTaskArr;
    saveTasks();
};
var editTask = function(taskId) {
    //console.log("editing Task #" + taskId);
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +  "']");
    // get content from task name and type 
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId); 
    
};
var completeEditTask = function(taskName, taskType, taskId) {
    //find matching task list items
    var taskSelected =  document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    alert("Task has been updated yo");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
    saveTasks();
};
var taskStatusChangeHandler = function(event){
    //get the task items id 
    var taskId = event.target.getAttribute("data-task-id");
    //get the currently selected options value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if (statusValue === "to do") {
        taskToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        taskInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        taskCompletedEl.appendChild(taskSelected);
    }
    //update tasks in tasks arr
    for (var i = 0; i < tasks.length; i++) {
         if (tasks[i].id === parseInt(taskId)) {
             tasks[i].status = statusValue;
         }
    }
     saveTasks();
};
var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
//gets tasks items from localstorage
//converts tasks from the string format back into an array of objects
//iterates through a tasks arr and create task elements on the page from it (refer to createtaskel())
var loadTasks = function() {
    var savedTasks = localStorage.getItem("tasks");
    if (!savedTasks) {
        return false;
    }
    savedTasks= JSON.parse(savedTasks);
    for (var i = 0; i < savedTasks.length; i++) {
        createTaskEl(savedTasks[i]);       
    }
};
//'submit' event allows us to use the enter key to submit as well as button
formEl.addEventListener("submit", taskFormHandler); 
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
