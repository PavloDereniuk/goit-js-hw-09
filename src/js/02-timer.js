import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { functions } from 'lodash';

const refs = {
  inputField: document.querySelector('input[type="text"]'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonReset: document.querySelector('button[data-reset]'),
  dateValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};

refs.buttonStart.setAttribute('disabled', 'true');
refs.buttonStart.addEventListener('click', pushStart);
refs.buttonReset.addEventListener('click', pushReset);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

let targetTime = 0;
let intervslID = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.buttonStart.removeAttribute('disabled');
      targetTime = selectedDates[0] - options.defaultDate;
      Notiflix.Notify.success(`Let's start the countdown`);
    }
  },
};

function pushStart() {
  refs.inputField.setAttribute('disabled', 'true');
  refs.buttonStart.setAttribute('disabled', 'true');

  intervslID = setInterval(() => {
    if (targetTime <= 0) {
      return;
    }

    let leftTime = convertMs(targetTime);
    updateTime(leftTime);
    targetTime -= 1000;
  }, 1000);
}

function pushReset() {
  refs.buttonStart.removeAttribute('disabled');
  refs.inputField.removeAttribute('disabled');
  clearTimeout(intervslID);
  updateTime(convertMs(0));
}

flatpickr(refs.inputField, options);

function updateTime({ days, hours, minutes, seconds }) {
  refs.dateValue.textContent = `${days}`;
  refs.hoursValue.textContent = `${hours}`;
  refs.minutesValue.textContent = `${minutes}`;
  refs.secondsValue.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
