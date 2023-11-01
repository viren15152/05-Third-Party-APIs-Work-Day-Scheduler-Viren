// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const localeSettings = {};
dayjs.locale(localeSettings);

$(function () {
//This will get the current hour of the day using the dayjs library 
  const currentHour = dayjs().format('H');
//This function will allow the colours of each time block to change weather it is in the past, present or future corresponding to the current hour (Functions are one of the fundemental building blocks in JavaScript they are a reusable set of statements to perform a task or calculate a value)
  function hourlyColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }
  //I've implemented the next function to allow the user to save their inputs into local storage
  function textEntry() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
   //I have included error handling for any situations when local storage is not available for or when setting items fail.
      try {
        localStorage.setItem(key, value);
        console.log('Data saved succesfully.');
      } catch (error) {
        console.error('Error saving data:', error);
      }
      
    });
  }
  //This function will allow me to refresh the colour of each time block dependant on wheather the time interval is in the past(grey), present(red) or future(green) in correspondence  to the current time.
  function refreshColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      //If statement to specify a block of JavaScript code to be executed if the condition is true.
      if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
        //This else if statement to specify a new condition if the first condition is false.
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
        //This else statement to specify a block of code to be executed if the condition is false.
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }
  //This will allow any user to input from local storage and implement text into each time block.
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  //This function will alow me to display the time in the header section of the page. 
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }

  //This area will allow me to call my 3 main functions to set up the page.
  hourlyColor();
  textEntry();
  refreshColor();
//I have used setInterval as this will update the time once per second for the current time.

  setInterval(updateTime, 1000);
});


