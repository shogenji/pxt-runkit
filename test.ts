// tests go here; this will not be compiled when this package is used as an extension.
runkit.setSpeed(256)

basic.forever(function () {
    runkit.moveForward()
    basic.pause(500)

    runkit.rotateCw()
    basic.pause(1000)

    runkit.moveBackward()
    basic.pause(500)

    runkit.rotateCcw()
    basic.pause(1000)

    runkit.stop()
    basic.pause(1000)
})
