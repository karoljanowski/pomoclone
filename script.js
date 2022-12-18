let time = 25 * 60
let stop = false
let startStopButton = document.getElementById('startStop')
let timeAfterStop
let breakOn = false
let whichBreak = 0
let whichFocus = 1
let x
let whichBreakEl = document.getElementById('which--break')

//buttons
let pomodoroButton = document.getElementById('button1')
let shortBreakButton = document.getElementById('button2')
let longBreakButton = document.getElementById('button3')

function setPomodoro() {
    clearInterval(x)

    whichBreakEl.textContent = "It is your " + whichFocus + "# " + "focus time"
    breakOn = false
    document.querySelector('body').style.backgroundColor = '#BA4949';
    document.querySelector('.main').style.backgroundColor = '#C15D5E';
    pomodoroButton.classList.add("button--active")
    shortBreakButton.classList.remove("button--active")
    longBreakButton.classList.remove("button--active")
    document.querySelector("body").style.transition = "all 2s";
    document.querySelector(".main").style.transition = "all 2s";
    document.getElementById("clock").innerHTML = "25" + ":" + "00";
    time = 25 * 60
    timeAfterStop = undefined
    startStopButton.onclick = function () {
        start()
    }
    startStopButton.textContent = "START"
}

function start() {
    clearInterval(x)
    startStopButton.onclick = function () {
        stopClock()
    }
    startStopButton.textContent = "STOP"
    stop = false
    if (timeAfterStop === undefined) {
        startClock(time)
    } else {
        startClock(timeAfterStop)
    }

}

function stopClock() {
    stop = true
    startStopButton.onclick = function () {
        start()
    }
    startStopButton.textContent = "START"
}



function breakChange() {
    document.querySelector('body').style.backgroundColor = '#397097';
    document.querySelector('.main').style.backgroundColor = '#5080A2';
    document.querySelector("body").style.transition = "all 2s";
    document.querySelector(".main").style.transition = "all 2s";
}

function shortBreak() {
    time = 5 * 60
    pomodoroButton.classList.remove("button--active")
    longBreakButton.classList.remove("button--active")
    shortBreakButton.classList.add("button--active")
    document.getElementById("clock").innerHTML = "05" + ":" + "00";
    startBreak()
}

function longBreak() {
    time = 15 * 60
    pomodoroButton.classList.remove("button--active")
    longBreakButton.classList.add("button--active")
    shortBreakButton.classList.remove("button--active")
    document.getElementById("clock").innerHTML = "15" + ":" + "00";
    startBreak()
}

function startBreak() {
    clearInterval(x)
    breakChange()
    breakOn = true
    whichBreakEl.textContent = "It is your " + whichBreak + "# " + "break time"
    console.log(whichBreak)
    timeAfterStop = undefined
    startStopButton.onclick = function () {
        start()
    }
    startStopButton.textContent = "START"


}

function startClock(time) {

    var countDownDuration = time;

    // Update the count down every 1 second
    x = setInterval(function () {
        if (stop) {
            timeAfterStop = countDownDuration
            clearInterval(x)
            return

        }
        // Calculate the minutes and seconds remaining
        var minutes = Math.floor(countDownDuration / 60);
        var seconds = countDownDuration % 60;

        // Format the seconds as a two-digit number (e.g. "03" instead of "3")
        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        document.getElementById("clock").innerHTML = minutes + ":" + seconds;

        // Decrement the countdown duration
        countDownDuration--;



        // If the countdown is finished, write some text
        if (countDownDuration < 0) {
            clearInterval(x);
            if (!breakOn) {
                whichBreak += 1
                if (whichBreak >= 4 && whichBreak % 4 == 0) {
                    longBreak()
                } else {
                    shortBreak()
                }
            } else {
                whichFocus += 1
                setPomodoro()
            }

        }



    }, 10);
}