// Your code goes here

var gameTimer

var driverDoorOpen = false
var passengerDoorOpen = false
var rearLeftDoorOpen = false
var rearRightDoorOpen = false

var gameIsActive = false
var driverDoorOpenedInPlay = false
var passengerDoorOpenedInPlay = false
var rearLeftDoorOpenedInPlay = false
var rearRightDoorOpenedInPlay = false

var ticks = -1




var doorSignals = ['driver_door_open', 'passenger_door_open', 'rearleft_door_open', 'rearright_door_open']
  gm.info.getVehicleData(getCurrentDoorStates, doorSignals)
  gm.info.watchVehicleData(getCurrentDoorStates, doorSignals)




function startFireDrill() {
  var startButton = document.getElementById('startButton')
  startButton.innerHTML = ""

  console.log("startFireDrill")
  if ( !allDoorsClosed() ) {
    var alert = document.getElementById('alert')
    alert.innerHTML = "You need to close all the doors before you play."
    setTimeout(function() {alert.innerHTML = ""}, 2000)
    return
  }
  driverDoorOpenedInPlay = false
  passengerDoorOpenedInPlay = false
  rearLeftDoorOpenedInPlay = false
  rearRightDoorOpenedInPlay = false

  ticks = 0
  gameIsActive = true
  gameTimer = setInterval(tick, 50)

  var progress = document.getElementById('progress')
  progress.innerHTML = "<img src='./images/flashing_light.gif'>"

  var result = document.getElementById('result')
  result.innerHTML = ""
}

function stopFireDrill() {
  clearInterval(gameTimer)
  gameIsActive = false

  var progress = document.getElementById('progress')
  progress.innerHTML = ""

  var result = document.getElementById('result')
  resultTime = ticks / 20
  formattedResultTime = parseFloat(Math.round(resultTime * 100) / 100).toFixed(2);
  result.innerHTML = "Your time: " + formattedResultTime + " seconds"

  var startButton = document.getElementById('startButton')
  startButton.innerHTML = "<button onclick='startFireDrill()'>START</button>"
}

function tick() {
  ++ticks
  console.log("ticks: " + ticks)

  var allDoorsOpenedInPlay = driverDoorOpenedInPlay &&
                             passengerDoorOpenedInPlay &&
                             rearLeftDoorOpenedInPlay &&
                             rearRightDoorOpenedInPlay
  if ( allDoorsOpenedInPlay && allDoorsClosed() ) {
    stopFireDrill()
  }
}

function getCurrentDoorStates(data) {
  console.log(data)
  if ( 'driver_door_open' in data ) {
      driverDoorOpen = ( data.driver_door_open != 0 )
      if ( gameIsActive && !driverDoorOpenedInPlay ) {
        driverDoorOpenedInPlay = true
      }
  }
  if ( 'passenger_door_open' in data ) {
      passengerDoorOpen = ( data.passenger_door_open != 0 )
      if ( gameIsActive && !passengerDoorOpenedInPlay ) {
        passengerDoorOpenedInPlay = true
      }
  }
  if ( 'rearleft_door_open' in data ) {
      rearLeftDoorOpen = ( data.rearleft_door_open != 0 )
      if ( gameIsActive && !rearLeftDoorOpenedInPlay ) {
        rearLeftDoorOpenedInPlay = true
      }
  }
  if ( 'rearright_door_open' in data ) {
      rearRightDoorOpen = ( data.rearright_door_open != 0 )
      if ( gameIsActive && !rearRightDoorOpenedInPlay ) {
        rearRightDoorOpenedInPlay = true
      }
  }

  console.log(driverDoorOpen + " / " + passengerDoorOpen + " / " + rearLeftDoorOpen + " / " + rearRightDoorOpen)
}

function allDoorsOpen() {
  return driverDoorOpen &&
         passengerDoorOpen && 
         rearLeftDoorOpen &&
         rearRightDoorOpen
}

function allDoorsClosed() {
  return !driverDoorOpen &&
         !passengerDoorOpen && 
         !rearLeftDoorOpen &&
         !rearRightDoorOpen
}