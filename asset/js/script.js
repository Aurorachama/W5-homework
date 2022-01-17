var $currentDay = $("#currentDay");
var $currentTime = $("#currentTime")
var $timeCard = $(".time-card");
var $scheduleArea = $(".schedule");

var toDoItems = [];
//each object has a hour property and a text property
 
var currentDate = moment().format("Do MMMM, GGGG (dddd)");
var currentHour = moment().format("H");
var currentTime = moment().format("HH:mm:ss, Z UTC");

//set up array
function initializeSchedule(){

  $timeCard.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
      hour: thisBlockHr,
      text: "",
    }
    //add todo object
    toDoItems.push(todoObj);
  });

  localStorage.setItem("todo", JSON.stringify(toDoItems));
}

//class for timecard (for styling)
function setUptimeCard(){
    $timeCard.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todo");
  toDoItems = JSON.parse(toDoItems);

  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      //set text
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todo", JSON.stringify(toDoItems));
  renderSchedule();
  window.alert("Item to do: " + itemToAdd + " is added.");
}

// when load
$(document).ready(function (){

  setUptimeCard();
  if(!localStorage.getItem("todo")){
    //initialize the array of objects
    initializeSchedule();
  }
  $currentDay.text(currentDate);
  $currentTime.text(currentTime);

  renderSchedule();
  $scheduleArea.on("click", "button", saveHandler);
});

setInterval(function(){
  $currentDay.text(moment().format("Do MMMM, GGGG (dddd)"));
  $currentTime.text(moment().format("HH:mm:ss, Z UTC"));
  currentDate = moment().format("Do MMMM, GGGG (dddd)");
  currentHour = moment().format("H");
  currentTime = moment().format("HH:mm:ss, Z UTC");
  //console.log(currentDate);
  //console.log(currentHour);
  //console.log(currentTime);  
},1000);