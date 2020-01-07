//getting some dom elements
const hourContainer = document.querySelector("#hour");
const minContainer = document.querySelector("#min");
const secContainer = document.querySelector("#sec");

//as there is only one h1 so this won't be any problem
const header = document.querySelector("h1");

//this is the timer in seconds
let timer_set = 0;

//the hour, min and second 
let hour = 0;
let min = 0;
let sec = 0;

//this is to stor the interval to terminate it
let interval;

//if user updates these when editable then check if set >= 60 and stop them form doing that 
minContainer.addEventListener("change", () => {
    if (minContainer.value != "") {
        min = parseInt(minContainer.value)
        if (min >= 60) {
            hour = Math.floor(hour + min / 60);
            min = min % 60;
        }
    } else {
        minContainer.value = 0;
        min = 0;
    }
    updateUI();
})

secContainer.addEventListener("change", () => {
    if (secContainer.value != "") {
        sec = parseInt(secContainer.value)
        if (sec >= 60) {
            min = Math.floor(min + sec / 60);
            sec = sec % 60;
            if (min > 60) {
                hour = Math.floor(hour + min / 60);
                min = min % 60;
            }
        }
    } else {
        sec = 0;
    }
    updateUI();
})

hourContainer.addEventListener("change", () => {
    if (hourContainer.value != "") {
        hour = hourContainer.value;
    } else {
        hourContainer.value = 0
        hour = 0
    }
})

const updateUI = () => {
    hourContainer.value = hour;
    minContainer.value = min;
    secContainer.value = sec;
}

const updateHMS = () => {
    sec = timer_set % 60;
    min = Math.floor(timer_set / 60);
    min = min % 60;
    hour = Math.floor(min / 60);
    updateUI();
}

const resetTime = () => {
    hour = 0
    min = 0
    sec = 0
    timer_set = 0;
    if (interval) {
        clearInterval(interval);
    }
    hourContainer.removeAttribute("readonly");
    minContainer.removeAttribute("readonly");
    secContainer.removeAttribute("readonly");
    hourContainer.value = hour;
    minContainer.value = min / 10 > 1 ? min : '0' + min;
    secContainer.value = sec / 10 > 1 ? sec : '0' + sec;
}

const endTicking = () => {
    header.innerText = "Time's Up!!"
    var audio = new Audio('bell_sound.mp3');
    setTimeout(() => {
        header.innerText = "Timer app"
    }, 3000)
    audio.play();
    resetTime();
}

const startTicking = () => {
    if (timer_set > 0) {
        interval = setInterval(() => {
            timer_set -= 1;

            if (timer_set <= 0) {
                endTicking();
                clearInterval(interval);

            }

            updateHMS();
        }, 1000)
    } else {
        endTicking()
    }
}


const startTime = () => {
    hourContainer.setAttribute("readonly", "true");
    minContainer.setAttribute("readonly", "true");
    secContainer.setAttribute("readonly", "true");

    timer_set = hour * 24 + min * 60 + sec;
    startTicking();
}