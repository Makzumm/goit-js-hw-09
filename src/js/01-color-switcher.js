const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const colorOutput = document.querySelector('.hex-output');
let timerId = null;

startBtn.addEventListener('click', () => {
    intervalSetup();
})

function intervalSetup() {
    startBtn.setAttribute('disabled', true),
    stopBtn.removeAttribute('disabled');

    timerId = setInterval(() => {
        return document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    stopBtn.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled');
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


