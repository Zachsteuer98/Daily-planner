tasks = [];

// load tasks
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"))
    if (!tasks) {
        tasks = {};
    };
    printTasks(tasks)
}

var printTasks = function() {
    $.each(tasks), function(list, arr) {
        var taskP = $("<p>").addClass("description task-item-" + list).text(arr)
console.log(list)
console.log(taskP)
        $("task-content-" + list).replaceWith(taskP);
    }
}

var Today = (moment().format("MMMM D, YYYY"))
    $("#currentDay").text(Today);

//color code hours Credit too mlportu git https://github.com/mlportu/workday-scheduler/blob/master/assets/script.js
var hourAudit=function(){
    var currentHour= moment().hour() 

    for(var i = 8; i < 17; i++); {
        var taskArea = $("#task-" + i)
        if(currentHour>i){
            $(taskArea).addClass("past");
        } else if (currentHour === i){
            $(taskArea).addClass("present");
        }else {
            $(taskArea).addClass("future");
        }
    } 
}

setInterval(function(){
    hourAudit();},1000*60*60);

loadTasks();
hourAudit();
