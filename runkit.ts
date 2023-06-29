/**
 * Extensions for Switch Education's "Run Your micro:bit Kit."
 */
//% weight=100
//% color=#ff7700 icon="\uf1b9"
//% block="Run Kit"
namespace runkit {

    let speedRatio = 50
    let speedMax = 1023

    enum Motors {
        Left = 0,
        Right = 1,
        Both = 2
    }

    enum Dir {
        Forward = 0,
        Backward = 1
    }


    /**
        Move forward.
    **/
    //% blockId=move_forward
    //% weight=200
    //% block="Move forward"
    function moveForward(): void {
        motorOn(Motors.Both, Dir.Forward, speedRatio)
    }

    /**
        Move backward.
    **/
    //% blockId=move_backward
    //% weight=190
    //% block="Move backward"
    function moveBackward(): void {
        motorOn(Motors.Both, Dir.Backward, speedRatio)
    }

    /**
        Rotate clockwise.
    **/
    //% blockId=rotate_cw
    //% weight=180
    //% block="Rotate clockwise"
    function rotateCw(): void {
        motorOn(Motors.Left, Dir.Forward, speedRatio)
        motorOn(Motors.Right, Dir.Backward, speedRatio)
    }

    //% blockId=rotate_ccw
    //% weight=170
    //% block="Rotate counter-clockwise"
    function rotateCcw(): void {
        motorOn(Motors.Left, Dir.Backward, speedRatio)
        motorOn(Motors.Right, Dir.Forward, speedRatio)
    }

    //% blockId=stop
    //% weight=160
    //% block="Stop"
    function stop(): void {
        motorOff(Motors.Both)
    }

    /**
        Move forward for duration [msec].
        @param duration time [msec] move forward
    **/
    //% blockId=move_forward_for
    //% weight=100
    //% block="Move forward for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    export function moveForwardFor(duration: number): void {
        motorOn(Motors.Both, Dir.Forward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    /**
        Move backward for duration [msec].
        @param duration time [msec] move forward
    **/
    //% blockId=move_backward_for
    //% weight=90
    //% block="Move backward for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    export function moveBackwardFor(duration: number): void {
        motorOn(Motors.Both, Dir.Backward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    /**
        Rotate clockwise for duration [msec].
        @param duration time [msec] rotate clockwise
    **/
    //% blockId=rotate_cw_for
    //% weight=80
    //% block="Rotate clockwise for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    export function rotateCwFor(duration: number): void {
        motorOn(Motors.Left, Dir.Forward, speedRatio)
        motorOn(Motors.Right, Dir.Backward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    //% blockId=rotate_ccw_for
    //% weight=70
    //% block="Rotate counter-clockwise for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    export function rotateCcwFor(duration: number): void {
        motorOn(Motors.Left, Dir.Backward, speedRatio)
        motorOn(Motors.Right, Dir.Forward, speedRatio)
        basic.pause(duration)
        motorOff(Motors.Both)
    }

    //% blockId=stop_for
    //% weight=60
    //% block="Stop for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    export function stopFor(duration: number): void {
        motorOff(Motors.Both)
        basic.pause(duration)
    }



    //% blockId=set_speed_ratio
    //% weight=100
    //% block="Set speed ratio to $speed"
    //% speed.min=0 speed.max=100 speed.defl=50
    //% subcategory="Settings"
    export function setSpeedRatio(speed: number): void {
        if (speed < 0) {
            speed = 0
        } else if (speed > 100) {
            speed = 100
        }
        speedRatio = (speedMax * speed) / 100
    }

    //% blockId=set_max_speed
    //% weight=90
    //% block="Set max speed to $speed"
    //% speed.min=0 speed.max=1023 speed.defl=500
    //% subcategory="Settings"
    function setMaxSpeed(speed: number): void {
        if (speed < 0) {
            speedMax = 0
        } else if (speed > 1023) {
            speedMax = 1023
        } else {
            speedMax = speed
        }
    }



    export function motorOn(motors: Motors, direction: Dir, speed: number): void {
        /* convert 0-100 to 0-1023 by a simple multiple by (speedMax / 100) */
        let outputVal = Math.round(speed * speedMax / 100)
        if (outputVal > speedMax) {
            outputVal = speedMax
        }

        switch (motors) {
            case Motors.Left:
                pins.digitalWritePin(DigitalPin.P13, direction)
                pins.digitalWritePin(DigitalPin.P14, outputVal)
                break

            case Motors.Right:
                pins.digitalWritePin(DigitalPin.P15, direction)
                pins.digitalWritePin(DigitalPin.P16, outputVal)
                break

            case Motors.Both:
                pins.digitalWritePin(DigitalPin.P13, direction)
                pins.digitalWritePin(DigitalPin.P14, outputVal)
                pins.digitalWritePin(DigitalPin.P15, direction)
                pins.digitalWritePin(DigitalPin.P16, outputVal)
                break

            default:
            // Stop - something has gone wrong
        }
    }

    export function motorOff(motors: Motors): void {
        switch (motors) {
            case Motors.Left:
                pins.digitalWritePin(DigitalPin.P14, 0)
                break
            case Motors.Right:
                pins.digitalWritePin(DigitalPin.P16, 0)
                break
            case Motors.Both:
                pins.digitalWritePin(DigitalPin.P14, 0)
                pins.digitalWritePin(DigitalPin.P16, 0)
                break
            default:
            // Stop - something has gone wrong
        }
    }
}