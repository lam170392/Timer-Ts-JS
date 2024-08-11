'use strict';
const elementDays = document.querySelector('.days__input');
const elementHours = document.querySelector('.hours__input');
const elementMinutes = document.querySelector('.minutes__input');
const elementSeconds = document.querySelector('.seconds__input');
const elementMessage = document.querySelector('.message-status');
const buttonStart = document.querySelector('#start');
const buttonReset = document.querySelector('#reset');
const buttonStop = document.querySelector('#stop');
let intervalId; // timer id
window.addEventListener('load', setDefaultTime);
buttonReset.addEventListener('click', resetTimer);
buttonStart.addEventListener('click', startTimer);
buttonStop.addEventListener('click', stopTimer);
function setDefaultTime() {
    stopTimer();
    elementDays.value = "00";
    elementHours.value = "00";
    elementMinutes.value = "00";
    elementSeconds.value = "00";
}
function resetTimer() {
    setDefaultTime();
    enableInputs();
    clearInterval(intervalId);
    hideMessage();
}
function getTimeValues() {
    return {
        days: parseInt(elementDays.value, 10),
        hours: parseInt(elementHours.value, 10),
        minutes: parseInt(elementMinutes.value, 10),
        seconds: parseInt(elementSeconds.value, 10),
    };
}
function isValidTime({ days, hours, minutes, seconds }) {
    return !(days < 0 || days > 31 ||
        hours < 0 || hours > 23 ||
        minutes < 0 || minutes > 59 ||
        seconds < 0 || seconds > 59);
}
function displayMessage(message) {
    elementMessage.style.display = 'inline-flex';
    elementMessage.textContent = message;
    hideMessage();
}
function disableInputs() {
    elementDays.disabled = true;
    elementHours.disabled = true;
    elementMinutes.disabled = true;
    elementSeconds.disabled = true;
}
function enableInputs() {
    elementDays.disabled = false;
    elementHours.disabled = false;
    elementMinutes.disabled = false;
    elementSeconds.disabled = false;
}
function startTimer() {
    let { days, hours, minutes, seconds } = getTimeValues();
    if (!isValidTime({ days, hours, minutes, seconds })) {
        displayMessage("Invalid Time");
        return;
    }
    if (!days && !hours && !minutes && !seconds) {
        displayMessage("Set correct Time");
        return;
    }
    disableInputs();
    intervalId = setInterval(function () {
        if (seconds > 0) {
            seconds--;
        }
        else if (minutes > 0) {
            seconds = 59;
            minutes--;
        }
        else if (hours > 0) {
            seconds = 59;
            minutes = 59;
            hours--;
        }
        else if (days > 0) {
            seconds = 59;
            minutes = 59;
            hours = 23;
            days--;
        }
        else {
            clearInterval(intervalId);
            enableInputs();
        }
        updateDisplay({ days, hours, minutes, seconds });
    }, 1000);
}
function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    enableInputs();
}
function updateDisplay({ days, hours, minutes, seconds }) {
    elementSeconds.value = String(seconds).padStart(2, '0');
    elementMinutes.value = String(minutes).padStart(2, '0');
    elementHours.value = String(hours).padStart(2, '0');
    elementDays.value = String(days).padStart(2, '0');
}
function hideMessage() {
    setTimeout(() => {
        elementMessage.style.display = 'none';
    }, 4000);
}
