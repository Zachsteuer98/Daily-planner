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

        var taskSpan = $("<span>").addClass("task-item-" + list).text(arr)
        
        // console.log(list)
        // console.log(taskSpan);

        $("#task-item-" + list).replaceWith(taskSpan);
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

        // recreate span element
        var newText = $("<span>")
        .addClass("taskItem")
        .text(text);

        //replace old span with new span
        $(this).replaceWith(newText);
        console.log(newText)
    })
})

//Save task text using save button
$(".saveBtn").on("click", function(){
    var index = $(".saveBtn").index(this);
    console.log(index)
    index = $(this).parent().find("taskItem").outerText;
    localStorage.setItem("tasks",JSON.stringify(tasks));
})

//set timer to one hour increments
  setInterval(function(){
      hourAudit();},1000*60*60);

//call loadTask function and hourAudit
  loadTasks();
  hourAudit();