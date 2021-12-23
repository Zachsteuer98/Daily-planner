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
        var taskP = $("<p>").addClass("description task-content-" + list).text(arr)

        $("task-content-" + list).replaceWith(taskP);
    }
}

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

