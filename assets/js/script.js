var task = [];
taskIdCounter= 8

var Today = (moment().format("MMMM D, YYYY"))
    $("#currentDay").text(Today);
tasks = [];

//load tasks
var loadTasks = function(){
    tasks = JSON.parse(localStorage.getItem("tasks"))
    if(!tasks) {
        tasks={};
    } ;
    printTasks(tasks)
}

var printTasks = function(){
    $.each(tasks, function(list, arr){

        var taskSpan = $("<span>").addClass("task-" + list).text(arr)
        
        // console.log(list)
        // console.log(taskSpan);

        $("#task-" + list).replaceWith(taskSpan);
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
    console.log(taskDataObj)

    // create new array to hold updated list of tasks
  var updatedTaskArr = [];

  // loop through current tasks
  for (var i = 8; i < 18; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    
      updatedTaskArr.push(tasks[i]);
  }

  // reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;
  
localStorage.setItem("tasks", JSON.stringify(taskDataObj));
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


//   console.log(localStorage.getItem("toDo"))
//   for (var i = 8; i < 18; i++) {
//     var saveText = localStorage.getItem(i)
//     var textArea = $("#task-" + i).children()[0].text(saveText)
//     console.log(textArea)
// }
 