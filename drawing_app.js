var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

// when clicking on control list items
//grabs the "controls" class sibling elements and removes the "selected" class and adds "selected" class to whichever li element is clicked
$(".controls").on("click", "li", function(){
  // de-select sibling elements
  $(this).siblings().removeClass("selected");
  // select clicked element
  $(this).addClass("selected");
  // cache current color here
  color = $(this).css("background-color");

})

// when "new color" is pressed
$("#revealColorSelect").click(function(){      
  // show or hide color select
  changeColor();
  $("#colorSelect").toggle();
});

// update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")"); 
}

// when color sliders change
$("input[type=range]").change(changeColor);
  
// when "add color" is pressed
$("#addNewColor").click(function(){
  // append color to the ul controls
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  // select the new color
  $newColor.click();
});

// on mouse event on canvas
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  // draw lines
  if (mouseDown) {
  context.beginPath();
  context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
  context.lineTo(e.offsetX, e.offsetY);
  context.strokeStyle = color;
  context.stroke();
  lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});








