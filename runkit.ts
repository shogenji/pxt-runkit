/**
 * Extensions for Switch Education's "Run Your micro:bit Kit."
 */
//% weight=100
//% color=#ff7700 icon="\uf1b9"
//% block="Run Kit"
namespace runkit {

    let speedMax = 1023
    let fixedSpeed = 256
 
    export enum Motors {
        //% blockId="motors_left" block="left"
        Left = 0,
        //% blockId="motors_right" block="right"
        Right = 1,
        //% blockId="motors_both" block="both"
        Both = 2
    }

    export enum Dir {
        //% blockId="dir_forward" block="forward"
        Forward = 0,
        //% blockId="dir_backward" block="backward"
        Backward = 1
    }


    /**
        Move forward.
    **/
    //% blockId=move_forward
    //% weight=100
    //% block="Move forward"
    export function moveForward(): void {
        motorOn(Motors.Both, Dir.Forward, fixedSpeed)
    }


    /**
        Move backward.
    **/
    //% blockId=move_backward
    //% weight=90
    //% block="Move backward"
    export function moveBackward(): void {
        motorOn(Motors.Both, Dir.Backward, fixedSpeed)
    }


    /**
        Rotate clockwise.
    **/
    //% blockId=rotate_cw
    //% weight=80
    //% block="Rotate clockwise"
    export function rotateCw(): void {
        motorOn(Motors.Left, Dir.Forward, fixedSpeed)
        motorOn(Motors.Right, Dir.Backward, fixedSpeed)
    }


    /**
        Rotate counter-clockwise.
    **/
    //% blockId=rotate_ccw
    //% weight=70
    //% block="Rotate counter-clockwise"
    export function rotateCcw(): void {
        motorOn(Motors.Left, Dir.Backward, fixedSpeed)
        motorOn(Motors.Right, Dir.Forward, fixedSpeed)
    }


    /**
        Stop.
    **/
    //% blockId=stop
    //% weight=60
    //% block="Stop"
    export function stop(): void {
        motorOff(Motors.Both)
    }

    /**
        Move forward for duration [ms].
        @param duration time [ms] move forward
    **/
    //% blockId=move_forward_for
    //% weight=100
    //% block="Move forward for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    export function moveForwardFor(duration: number): void {
        motorOn(Motors.Both, Dir.Forward, fixedSpeed)
        basic.pause(duration)
        motorOff(Motors.Both)
    }


    /**
        Move backward for duration [ms].
        @param duration time [ms] move forward
    **/
    //% blockId=move_backward_for
    //% weight=90
    //% block="Move backward for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    export function moveBackwardFor(duration: number): void {
        motorOn(Motors.Both, Dir.Backward, fixedSpeed)
        basic.pause(duration)
        motorOff(Motors.Both)
    }


    /**
        Rotate clockwise for duration [ms].
        @param duration time [ms] rotate clockwise
    **/
    //% blockId=rotate_cw_for
    //% weight=80
    //% block="Rotate clockwise for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    export function rotateCwFor(duration: number): void {
        motorOn(Motors.Left, Dir.Forward, fixedSpeed)
        motorOn(Motors.Right, Dir.Backward, fixedSpeed)
        basic.pause(duration)
        motorOff(Motors.Both)
    }


    /**
        Rotate counter-clockwise for duration [ms].
        @param duration time [ms] rotate counter-clockwise
    **/
    //% blockId=rotate_ccw_for
    //% weight=70
    //% block="Rotate counter-clockwise for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    export function rotateCcwFor(duration: number): void {
        motorOn(Motors.Left, Dir.Backward, fixedSpeed)
        motorOn(Motors.Right, Dir.Forward, fixedSpeed)
        basic.pause(duration)
        motorOff(Motors.Both)
    }


    /**
        Stop for duration [ms].
        @param duration time [ms] stop
    **/
    //% blockId=stop_for
    //% weight=60
    //% block="Stop for $duration"
    //% duration.min=0 duration.max=1000000 duration.defl=1000
    //% duration.shadow="timePicker"
    export function stopFor(duration: number): void {
        motorOff(Motors.Both)
        basic.pause(duration)
    }


    /**
        Set speed.
        @param speed
    **/
    //% blockId=set_speed
    //% weight=30
    //% block="Set speed to $speed"
    //% speed.min=0 speed.max=1023 speed.defl=256
    export function setSpeedRatio(speed: number): void {
        speed = Math.max(speed, 0)
        speed = Math.min(speed, speedMax)
        fixedSpeed = speed
    }


    /**
        Set the direction and speed of motors.
    **/
    //% blockId=motor_on
    //% weight=100
    //% block="Motor $motors | $direction | at speed $speed"
    //% motors.fieldEditor="gridpicker" motors.fieldOptions.columns=2
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=2
    //% speed.min=0 speed.max=1023 speed.defl=256
    //% advanced=true
    export function motorOn(motors: Motors, direction: Dir, speed: number): void {
        speed = Math.max(speed, 0)
        speed = Math.min(speed, speedMax)

        switch (motors) {
            case Motors.Left:
                pins.digitalWritePin(DigitalPin.P13, direction)
                pins.digitalWritePin(DigitalPin.P14, speed)
                break

            case Motors.Right:
                pins.digitalWritePin(DigitalPin.P15, direction)
                pins.digitalWritePin(DigitalPin.P16, speed)
                break

            case Motors.Both:
                pins.digitalWritePin(DigitalPin.P13, direction)
                pins.digitalWritePin(DigitalPin.P14, speed)
                pins.digitalWritePin(DigitalPin.P15, direction)
                pins.digitalWritePin(DigitalPin.P16, speed)
                break

            default:
            // Stop - something has gone wrong
        }
    }


    /**
        Stop motors.
    **/
    //% blockId=motor_off
    //% weight=90
    //% block="Motor $motors stop"
    //% motors.fieldEditor="gridpicker" motors.fieldOptions.columns=2
    //% advanced=true
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