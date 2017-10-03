// Pomodoro module
function Pomodoro() {
  var sessionTime = 25;// length of session in minutes
  var breakTime = 5; // length of break in minutes
  var minutesCounter = sessionTime; // counter for minutes in timer
  var secondsCounter = 0; // counter for seconds in timer
  var timer; // stores interval
  var timerState = 'session';
  const sessionColor = '#006400'; // session panel color, used for timer color when session
  const breakColor = '#640000'; // break panel color, used for timer color when break
  const stopColor = '#333'; // used for timer color when stopped
  
  // DOM elements
  var timerMins = $('#timer_mins'); // minutes
  var timerSecs = $('#timer_secs'); // seconds
  var sessionTimeEl = $('#session_time'); // session input
  var breakTimeEl = $('#break_time'); // break input
  
  // toggles color of countdown timer 
  function setColor() {
    var timerDigits = $('#timer span');
    (timerState ===  'session')
      ? timerDigits.css('color', sessionColor)
      : timerDigits.css('color', breakColor);
  }
      
  // clears countdown interval
  function pauseTimer() {
    clearInterval(timer);
    timer = undefined;
  }
  
  // clears interval, resets minutes and seconds variables, resets timer color
  function stopTimer() {
    clearInterval(timer);
    timer = undefined;
    secondsCounter = 0;
    minutesCounter = sessionTime;
    timerState = 'session';
  }
  
  // returns a string with leading 0 if counter value < 10, used for timer text 
  function setTimerDigits(counter) {
    return counter < 10 ? '0' + counter : counter;
  }
    
  // sets minutes and seconds values of timer
  function updateTimer() {
    timerSecs.text(setTimerDigits(secondsCounter));
    timerMins.text(setTimerDigits(minutesCounter));
  }
  
  // decrease minutes and seconds counters, resetting seconds counter every minute
  function decreaseCounters() {
    if(secondsCounter === 0) {
      minutesCounter--;
      secondsCounter = 59;
    } else {
      secondsCounter--;  
    }
  }
    
  // used in setInterval, updates timer variables 
  function countdown() {
    decreaseCounters();
    updateTimer();
    if(minutesCounter === 0 && secondsCounter === 0) {
      $('#timer').trigger('switchTimer');
      return;
    }
  }
  
  //returns a started countdown interval 
  function startCountdown(){
	  return setInterval( countdown , 1000 );
  }
    
  // initializes timer to an interval 
  function startTimer() {
    decreaseCounters();
    updateTimer();
    timer = startCountdown();
  }
  
  //switches between session and break
  function switchTimer() {
    if (timerState === 'session') {
      timerState = 'break';
      minutesCounter = breakTime;
    } else {
      timerState = 'session';
      minutesCounter = sessionTime;
    }
    clearInterval(timer);
    timer = undefined;
    setColor();
    secondsCounter = 0;
    updateTimer();
    startTimer();
  }
  
  // returns true or false depending on whether timer is defined or not
  function isPlaying() {
    return timer ? true : false;
  }
  
  // returns a value for timers with a max of 60 minutes and a min of 1 minute
  function setTimer( timer, operation , quantity) {
    var result;
    if (operation === 'increment') {
      result = timer + quantity;
      if ( result > 60 ) {
        result = 60;
      } 
    } else {
      result = timer - quantity;
      if ( result < 1 ) {
        result = 1;
      } 
    }
    return result;
  }
  
  // returns a function that updates timer and variables related to session or break depending on timerType data attribute
  function timerOperationFactory ( elementData ) {
    if ( elementData.timerType === 'sessionTime' ) {
      return function() { 
        sessionTime = setTimer(sessionTime, elementData.operation, elementData.quantity);
        sessionTimeEl.attr('value', sessionTime);
        if (!isPlaying() && timerState === 'session') {
          minutesCounter = sessionTime;
          secondsCounter = 0;
          updateTimer();
        }
      }
    } else {
      return function() { 
        breakTime = setTimer(breakTime, elementData.operation, elementData.quantity);
        breakTimeEl.attr('value', breakTime);
        if (!isPlaying() && timerState === 'break') {
          minutesCounter = breakTime;
          secondsCounter = 0;
          updateTimer();
        }
      }
    }
  }
   
  // DOM event listeners
  $('#play').on( 'click' , function() {
    if(!isPlaying()) {
      startTimer();
      setColor();
    }  
  });
  
  $('#pause').on( 'click' , function() {
    pauseTimer();
  });
  
  $('#stop').on( 'click' , function() {
    stopTimer();
    updateTimer();
    $('#timer span').css( 'color' , stopColor );
  });
  
  $('#timer').on ( 'switchTimer', switchTimer );
  
  $('#skip').on ( 'click', function() {
    if( isPlaying() ) {
      switchTimer();
    }
  });
  
  // time adjustment buttons for Session and Break, generated using data-* attributes and a factory method
  $('.time_settings button').each( function() {
    $(this).on( 'click' , timerOperationFactory($(this).data()));
  })
  
  
  return {
    init: function() {
      sessionTimeEl.attr('value', sessionTime);
      breakTimeEl.attr('value', breakTime);
      updateTimer();
    }
  }
}

// on document ready
$(function() {
  var pomodoro = new Pomodoro();
  pomodoro.init();
})


