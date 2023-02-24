// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html. -DONE

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Select all the save buttons
  var saveButtons = $(".saveBtn");

  // Add a click event listener to each save button
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

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Get the current hour using Day.js
  var currentHour = dayjs().hour();
  console.log(currentHour);

  // Get time block element
  var timeBlock = $(".time-block");

  // Loop through each time-block
  $(timeBlock).each(function () {
    // Get the hour of the time-block from its id
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    // Compare the time-block hour to the current hour
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  $(".time-block").each(function () {
    // Get the id of the time-block
    var timeBlockId = $(this).attr("id");

    // Get the user input from local storage using the time-block id as the key
    var userInput = localStorage.getItem(timeBlockId);

    // Set the value of the corresponding textarea element
    $(this).find(".description").val(userInput);
  });

  // TODO: Add code to display the current date in the header of the page.

  // Get the current date using Day.js

  var currentDate = dayjs().format("dddd, MMMM D, YYYY");

  // Append the formatted date to the header element
  $("#currentDay").append(currentDate);
});
