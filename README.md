# freeCodeCamp: 

This is a Pomodoro Clock developed for the freeCodeCamp Front End Certificate. It has adjustable Session and break times and Play, Pause, Stop and Skip buttons.

## Getting started

This is a stand alone single page app, all external libraries needed are either included as files on the repo or via CDN

## Requirements

* Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/aNyxXR)
* **User Story:** I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed
* **User Story:** I can reset the clock for my next pomodoro.
* **User Story:** I can customize the length of each pomodoro.

## Features

**Code:**
* **module pattern** used to make the clock reusable
* **data-\* attributes** and **factory pattern** are used with the timer adjustments buttons to create click events with different time elngths (1, 5, 10), targets(Session or Break) and functions (add or subtract)
* **custom events** are used to trigger internal state changes

**Fulfilment of Requirements:**
* Default length of Session and Break is 25m and 5m respectively, once started the clock will cycle between the two
* Clock can be stopped, when started again it will reset to Session
* The length of Session and Break can be adjusted (max 60 mins), even while the clock is running, changes in length will only take place on the next switch. e.g. changing time of Session, while a session is running will not affect the current Session timing, change will take place in the next iteration.

**Extra Features:**
* **Pause:** Allows the timer to be paused
* **Skip:** Allows the current period (Session or Break) to be skipped. Timer will switch automatically.

## Screenshots

![###](/###.png "###")

## APIs / Libraries used

* jQuery 3.2.1
* Bootstrap 3.3.7 CSS

## Licence 

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png "Creative Commons License")

