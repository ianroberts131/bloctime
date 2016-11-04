#Bloctime
A time management system based on the Pomodoro technique using AngularJS and Firebase

This is the first application I built as part of Bloc's Frontend Web Development course.

Overview of the Pomodoro Technique:   
The Pomodoro technique breaks work sessions into 30 minute blocks, with the first 25 minutes designated for uninterrupted work and the last 5 minutes for a break. Each of these 30 minute blocks is called a 'pomodoro'. After 4 consecutive pomodoros, a longer 30 minute break is taken. Find more details on the Pomodoro technique [here](http://caps.ucsd.edu/Downloads/tx_forms/koch/pomodoro_handouts/ThePomodoroTechnique_v1-3.pdf).

Simply click the 'Start Work Session' button to begin a 25 minute work session (no distractions!):

![start timer](/app/assets/images/bloctime-start-timer.gif)

If you get distracted at any point (yes, checking your Twitter feed counts), hit the 'Reset Work Session' button to reset the clock.

Once the full 25 minute break is up, the timer will reset to 5 minutes. Click the 'Take a Break' button to start the timer, and do anything but work during this period.

As you complete tasks, add them to the task bar on the left hand side. This will help track your progress and monitor the efficiency of your work sessions.

![add task](/app/assets/images/bloctime-add-task.gif)

And that's it! The simple act of breaking work sessions into uninterrupted blocks of time can greatly improve efficiency and quality. I hope you find this application useful.

The analog clock used was built using HTML5 canvas and JavaScript. I used [this template](http://www.encodedna.com/html5/canvas/simple-analog-clock-using-canvas-javascript.htm) for the design of the clock. All of the logic is contained within the directive 'timer.js'.

The following bit of code in the timer.js directive enables the `drawAnalogClock()` function to be called each time the `currentTime` variable changes (i.e. whenever the time ticks down):

```javascript
scope.$watch('currentTime', function() {
    drawAnalogClock();
});
```

If you have any ideas on how to enhance bloctime, please send me a note.