(function() {
  autotrainer = {
    initialize: function() {
      var lifts = this.thisWorkout.lifts()
      for(var i=0; i<lifts.length; i++) {
        lift = lifts[i];
        addLift(lift);
      }
    },

    thisWorkout: new StartingStrength()
  }

  var loadWorkoutHistory = function() {
    var history = window.localStorage.getItem('workoutHistory');

    if (history !== null) {
      autotrainer.workoutHistory = JSON.parse(history);
    } else {
      autotrainer.workoutHistory = [];
    }
  }

  var addLift = function(lift) {
    newLift = $('.workout-list').loadTemplate($('#lift-template'),
    {
      lift: lift.details.name,
      weight: lift.details.weight,
      reps: lift.details.reps
    },
    {
      append: true,
      afterInsert: function($elem) {
        $elem.swipeleft(function(){
          $(this).hide();
          lift.result = 'fail';
        })

        $elem.swiperight(function(){
          $(this).hide();
          lift.result = 'pass';
        })
      }
    })
  }
})();