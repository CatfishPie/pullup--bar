function MoveStraight (Inches: number) {
    while (true) {
        brick.showValue("Angle", sensors.gyro3.angle(), 1)
    }
}
function LineFollowRight (inches: number, speed: number) {
    motors.largeAD.setBrake(true)
    line_follow_derivative = 0
    Line_Follow_Last_Error = 0
    motors.largeAD.reset()
    while (motors.largeA.angle() / 360 >= 0 - inches / 5.35) {
        line_follow_error = sensors.color2.light(LightIntensityMode.Reflected) - 35
        line_follow_derivative = line_follow_error - Line_Follow_Last_Error
        motors.largeAD.steer(0 - (line_follow_error * 3 + line_follow_derivative * 50), 0 - speed)
        Line_Follow_Last_Error = line_follow_error
    }
    motors.largeAD.stop()
}
function TurnDegrees (Degrees: number) {
    motors.largeAD.setBrake(true)
    motors.largeAD.reset()
    TurnDegrees_TargetAngle = Degrees + sensors.gyro1.angle()
    if (Degrees > 0) {
        while (sensors.gyro1.angle() <= TurnDegrees_TargetAngle) {
            motors.largeAD.tank(-20, 20)
        }
    } else if (Degrees < 0) {
        while (sensors.gyro1.angle() >= TurnDegrees_TargetAngle) {
            motors.largeAD.tank(20, -20)
        }
    }
    motors.largeAD.stop()
}
function FindLineClose () {
    motors.largeAD.setBrake(true)
    while (sensors.color2.light(LightIntensityMode.Reflected) < 70) {
        motors.largeAD.run(-20)
    }
    while (sensors.color2.light(LightIntensityMode.Reflected) > 15) {
        motors.largeAD.run(-20)
    }
    motors.largeAD.stop()
}
function checkGyroHappiness () {
    GyroHappieness_PreviousGyroAngle = sensors.gyro1.angle()
    motors.largeAD.setBrake(true)
    pause(100)
    for (let index = 0; index < 10; index++) {
        pause(50)
        if (GyroHappieness_PreviousGyroAngle == sensors.gyro1.angle()) {
            GyroHappiness_Times_Its_worked += 1
        }
    }
    if (GyroHappiness_Times_Its_worked == 10) {
        brick.showString("Happy :D", 1)
    } else {
        brick.showString("Sad D:", 1)
        pauseUntil(() => brick.buttonEnter.isPressed())
    }
    pause(1000)
    brick.clearScreen()
}
let GyroHappiness_Times_Its_worked = 0
let GyroHappieness_PreviousGyroAngle = 0
let TurnDegrees_TargetAngle = 0
let line_follow_error = 0
let Line_Follow_Last_Error = 0
let line_follow_derivative = 0
MoveStraight(100)
