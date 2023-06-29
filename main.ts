runkit.setSpeedRatio(50)
basic.forever(function () {
    runkit.moveForward(1000)
    runkit.rotateCw(1000)
    runkit.moveBackward(1000)
    runkit.rotateCcw(1000)
    runkit.stop(1000)
})
