var formEl = document.querySelector('#task-form');
var taskToDoEl = document.querySelector('#task-to-do');

var taskFormHandler = function(event) {
    event.preventDefault();
    //grab the input "value" of task name
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //grab the input "value" of task type
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //package up data as object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    //send it as an arguement to createtaskel
    createTaskEl(taskDataObj);
};
var createTaskEl = function(taskDataObj){
        //create a new li element
        var listItemEl = document.createElement('li');
        //give it a class name
        listItemEl.className = 'task-item';
        //create a div element
        var taskInfoEl = document.createElement("div");
        //give it a class name
        taskInfoEl.className = 'task-info';
        //add html content to div
        taskInfoEl.innerHTML = "<h3 class= 'task-name'>" + taskDataObj.name + "</h3><span class= 'task-type'>" + taskDataObj.type + "</span>";
        // append new div element to li element
        listItemEl.appendChild(taskInfoEl);
        //append entire li element to ul element
        taskToDoEl.appendChild(listItemEl);
    
}

formEl.addEventListener("submit", taskFormHandler); 
