var formEl = document.querySelector('#task-form');
var taskToDoEl = document.querySelector('#task-to-do');
var pageContentEl = document.querySelector('#page-content')
var taskIdCounter = 0;

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
    //package up data as object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    //send it as an arguement to createtaskel
    createTaskEl(taskDataObj);
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
    listItemEl.appendChild(taskActionsEl);
    //append entire li element to ul element
    taskToDoEl.appendChild(listItemEl);
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
};
var editTask = function(taskId) {
    console.log("editing Task #" + taskId);
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +  "']");
    // get content from task name and type 
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId); 
    
}
//'submit' event allows us to use the enter key to submit as well as button
formEl.addEventListener("submit", taskFormHandler); 
pageContentEl.addEventListener("click", taskButtonHandler);
