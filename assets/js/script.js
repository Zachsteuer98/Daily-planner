var task = [];
if(JSON.parse(localStorage.getItem("task")).length > 0 
) {
    task = JSON.parse(localStorage.getItem("task"))
}
console.log(task)
taskIdCounter= 8

var Today = (moment().format("MMMM D, YYYY"))
    $("#currentDay").text(Today);
// tasks = [];

//load tasks
var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("task"))
    if(!tasks) {
        tasks=[];
    } ;
    printTasks()
}

var printTasks = function(){
    $.each(tasks, function(list, arr){
console.log(list)
console.log(arr)
        // var taskSpan = $("<span>").addClass("task-" + list).text(arr)
        $('#p-' + arr.time).text(arr.tasks)
        // console.log(list)
        // console.log(taskSpan);
        // $("#task-" + list).replaceWith(taskSpan);
    })
 }

//color code hours source from https://github.com/mlportu/workday-scheduler
var hourAudit =function(){
    var currentHour = moment().hour() 

    for(var i=8; i<18; i++){
        var taskArea = $("#task-"+i)  
        if(currentHour>i){
            $(taskArea).addClass("past");
        } else if (currentHour === i){
            $(taskArea).addClass("present");
        }else{
            $(taskArea).addClass("future")
        }
    }
}

//clicking on taskBin opens the <span> and allows you to enter text source used from lesson 5.1.6
    $(".taskBin").on("click", "span", function() {
    var text = $(this).text()

    var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger("focus");

//Task needs to be updated

    $(".taskBin").on("blur", "textarea", function(){
        // get the textarea's current value/text
        var text = $(this)
        .val()
        .trim();

        // recreate span element (how do I make it so that each individual task has its own taskItem[i])
        var newText = $("<span>")
        .addClass("taskItem")
        .text(text);

        //replace old span with new span
        $(this).replaceWith(newText);
    })
})

//Save button is responsive on click and logs to the console
    $(".saveBtn").on("click", function(){
    var textArea = $(this).siblings("#task-" + $(this).attr("id"))
    var taskDataObj = {
    time: $(this).attr("id"),
    tasks: textArea.children().text(),
    } 
   
  if(task.length <= 0) {
    //   console.log(true)
      task.push(taskDataObj)
  }
  var updatedTaskArr = [];
  var updatedTask = false
//   loop through current tasks
  for (var i = 0; i < task.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if(task[i].time === $(this).attr("id")) {
        task[i].tasks = textArea.children().text()
        updatedTask = true
        updatedTaskArr.push(task[i])
    }   
  }
    if(updatedTask === false) {
        task.push(taskDataObj)
    }
// console.log("this is old task array", task)
// console.log("this is the updated task array", updatedTaskArr)
  // reassign tasks array to be the same as updatedTaskArr
  
localStorage.setItem("task", JSON.stringify(task));
    });

var displayTasks = function(id, saveText) {
for (var i = 8; i < 18; i++) 
    localStorage.getItem(i)
    
    
}

//set timer to one hour increments
  setInterval(function(){
      hourAudit();},1000*60*60);


//call loadTask function and hourAudit
  loadTasks();
  hourAudit();

 