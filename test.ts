// tests go here; this will not be compiled when this package is used as an extension.
runkit.setSpeedRatio(50)

basic.forever(function () {
    runkit.moveForwardFor(1000)
    runkit.rotateCwFor(1000)
    runkit.moveBackwardFor(1000)
    runkit.rotateCcwFor(1000)
    runkit.stopFor(1000)
})
