function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const pageColor = document.querySelector('body');

buttonStart.addEventListener('click', pushStart);
buttonStop.addEventListener('click', pushStop);

let intervalID = 0;

function changeColor() {    
    pageColor.style.background = getRandomHexColor();
}

function pushStart(evt) {
    changeColor();

    buttonStart.setAttribute('disabled', 'true');
    intervalID = setInterval(() => {
    changeColor();
    }, 1000);
}

function pushStop(evt) {
    clearInterval(intervalID);
    buttonStart.removeAttribute('disabled');
}
