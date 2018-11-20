// Duplicate page elements for inverse color effect
var clone = $(".container").clone();
clone.removeClass("container").addClass("static-container");
$("body").append(clone);

/// <summary> Timer object used to streamline functions. </summary>
/// <param name="_starting time" type="number"> The total length of the timer. </param>
/// <param name="_element" type="jQuery element"> The page element that contains the timer. </param>
var Timer = function(_startingTime, _element) {
  this.startingTime = _startingTime;
  this.currentTime = _startingTime;
  this.display = _element.children("p").children("span");

  this.initialize = function() {
    this.currentTime = this.startingTime * 60;
    tickDown();
  }

  this.changeAmount = function(changeBy) {
    var text = " mins";
    this.startingTime += changeBy;

    if (this.startingTime <= 1) {
      this.startingTime = 1;
      text = " min";
    }

    if (this.startingTime >= 60) {
      this.startingTime = 60;
    }

    this.display.html(this.startingTime + text);
  }

  this.tick = function() {
    return this.currentTime--;
  }
}

// Initialize two timer objects
var Timers = {
  "work-timer" : new Timer(25, $(".work-timer")),
  "rest-timer" : new Timer(5, $(".rest-timer")),
};

// Helper variable to track which element is counting down
var currentTimer = null;

/// <summary> Helper function used to change page colors </summary> 
/// <param name="color" type="string"> Color to use for foreground (moving) element. </param>
/// <param name="color" type="string"> Color to use for background (static) element. </param>
function ColorSwap(firstColor, secondColor) {
  $(".container").css({"background":firstColor,"color":secondColor,"border-color":secondColor});
  $(".static-container").css({"background":secondColor,"color":firstColor,"border-color":firstColor});
}

/// <summary> Helper function to streamline changing the timer display. </summary>
/// <param name="value" type="string"> The text to display. </param>
function UpdateTimeDisplay(value) {
  if (typeof(value) == "number") {
    var minutes = Math.floor(value/60);
    var seconds = value % 60;

    if (minutes.toString().length < 2) {
      minutes = "0" + minutes;
    }

    if (seconds.toString().length < 2) {
      seconds = "0" + seconds;
    }
    $(".time-display").html(minutes + ":" + seconds);
  } else {
    $(".time-display").html(value);
  }
}

/// <summary> Count down current timer, and update the screen elements. </summary>
function tickDown() {
  if (currentTimer === null) {
    return;
  }

  var time = Timers[currentTimer].tick();
  UpdateTimeDisplay(time);
  var amount = (time * 100) / (Timers[currentTimer].startingTime * 60);

  if (currentTimer === "work-timer") {
    amount = 100 - amount;
  }

  $(".container").animate({"height": amount + "vh"});

  if (time > 0) {
    setTimeout(tickDown,1000);
  } else {
    if (currentTimer === "work-timer") {
      currentTimer = "rest-timer";
      UpdateTimeDisplay("Break Time");
    } else {
      currentTimer = "work-timer";
      UpdateTimeDisplay("Work Time");
    }

    setTimeout(function() {
      Timers[currentTimer].initialize();
    },5000);
  }
}

$(function(){
  $(".options").click(function() {
    $(".options-container").slideDown();
  });

  $(".color-group-1").click(function() {
    ColorSwap("white","black");
  });
  $(".color-group-2").click(function() {
    ColorSwap("brown","orange");
  });
  $(".color-group-3").click(function() {
    ColorSwap("gray","turquoise");
  });
  $(".color-group-4").click(function() {
    ColorSwap("olive","pink");
  });
  $(".color-group-5").click(function() {
    ColorSwap("beige","red");
  });

  $(".close").click(function() {
    $(".options-container").slideUp();
  });

  $(".modifier").click(function() {
    var target = $(this).closest("div").attr("class");
    var modify = $(this).html();

    if (modify === "-") {
      Timers[target].changeAmount(-1);
    } else if (modify === "+") {
      Timers[target].changeAmount(1);
    }

    if (target === "work-timer") {
      UpdateTimeDisplay(Timers["work-timer"].startingTime * 60);
    }
  });

  $(".toggle-timer").click(function() {
    if (currentTimer != null) {
      UpdateTimeDisplay(Timers[currentTimer].startingTime * 60);
      $(".container").animate({"height" : "0vh"});
      currentTimer = null;
      $(".toggle-timer").html("Start");
      $(".timer-controls").show();
      return;
    } else {
      currentTimer = "work-timer";
      $(".toggle-timer").html("Stop");
      $(".timer-controls").hide();
      Timers[currentTimer].initialize();
    }
  }); 
});