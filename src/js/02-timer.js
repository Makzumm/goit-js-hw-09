import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const datePickerField = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]')

startBtn.disabled = true;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (Date.now() >= selectedDates[0]) {
          Notiflix.Notify.failure("Please choose a date in the future");
      } else {
          startBtn.disabled = false;
      }
      console.log(selectedDates[0])
    },
};

flatpickr(datePickerField, options);
startBtn.addEventListener('click', timeCalculation);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function timeCalculation() {
    startBtn.disabled = true;
    intervalId = setInterval(() => {
        let deltaTime = new Date(datePickerField.value) - Date.now();
        
        if (deltaTime >= 0) {
            const {days, seconds, hours, minutes} = convertMs(deltaTime);
           
            daysEl.textContent = addLeadingZero(days);
            hoursEl.textContent = addLeadingZero(hours);
            minsEl.textContent = addLeadingZero(minutes);
            secondsEl.textContent = addLeadingZero(seconds);

            if(deltaTime === 0) {
                Notiflix.Notify.success('Timer has ended the count!')
                clearInterval(intervalId);
            }
        }
    }, 1000)
}
