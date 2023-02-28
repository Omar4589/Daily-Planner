// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.

$(function () {
  //handle on all the save buttons
  var saveButtons = $(".saveBtn");

  // Click event listener for each save button
  saveButtons.on("click", function () {
    // Get the id of the time-block containing the button that was clicked
    //$(this) is referring to the button that was clicked.
    //.parent to get the parent of $(this) or the button that was clicked
    //get the 'id' attribute from the parent container which is a time block with an id of #hour-9
    //we can confirm this using the properties tab in the console.
    var timeBlockId = $(this).parent().attr("id");

    // Get the user input from the textarea in the same time-block
    //$(this) again refers to the button that was pressed
    //.siblings because we are targeting  sibling element in the same parent container
    //('.description') becasuse we are targeting the sibling with that class .description
    //.val() to get the value of it. usually when a user has typed something.
    var userInput = $(this).siblings(".description").val();

    // Save the user input in local storage using the time-block id as the key
    //This code should use the id in the containing time-block as a key to save the user input in local storage.
    //The key is used to identify where the value is coming from. in this case,
    //value, userInput, is coming from time block where the button was pressed
    localStorage.setItem(timeBlockId, userInput);
  });

  // Handle on the current hour using Day.js
  var currentHour = dayjs().hour();

  // Handle on time block element
  var timeBlock = $(".time-block");

  // Function that loops through each time-block
  $(timeBlock).each(function () {
    // Get the hour of the time-block from its id by parsing the "id" attribute after splitting it at the hyphen and selecting index 1, the second element.
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    // Compares the time-block hour to the current hour
    if (timeBlockHour < currentHour) {
      //adds class to "this" time block
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  //function that loops through each time block.
  $(".time-block").each(function () {
    // Get the id of the time-block
    var timeBlockId = $(this).attr("id");

    // Get the user input from local storage using the time-block id as the key
    var userInput = localStorage.getItem(timeBlockId);

    // Set the value of the corresponding textarea element
    $(this).find(".description").val(userInput);
  });

  // Get the current date using Day.js
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");

  // Append the formatted date to the header element
  $("#currentDay").append(currentDate);

  // Define a function to update the current time every second
  function updateTime() {
    var currentTime = dayjs().format("h:mm:ss A");
    $("#currentTime").html(currentTime); // .html() jquery method updates the #currentTime element
  }
  // Call the updateTime function every second using setInterval()
  setInterval(updateTime, 1000);
});
