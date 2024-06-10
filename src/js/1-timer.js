// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import imageUrl2 from '../img/bi_x-octagon.svg';

const refs = {
  btnStart: document.querySelector('.btn-start'),
  inputTime: document.querySelector('#datetime-picker'),
  sectionTime: document.querySelector('.field'),
};

const timeBlock = {
  dayBlock: document.querySelector('[data-days]'),
  hoursBlock: document.querySelector('[data-hours]'),
  minutesBlock: document.querySelector('[data-minutes]'),
  secondsBlock: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
let timeInterval;

refs.btnStart.disabled = true;
const options = {
  enableTime: true, //Вмикає пікап часу
  time_24hr: true, //Відображає годинник у 24-годинному режимі без вибору AM/PM, якщо увімкнено.
  defaultDate: new Date(), //Початкове значення дати
  minuteIncrement: 1, //Регулювання кроку для введення хвилини (включно з прокруткою)
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.show({
        backgroundColor: 'red',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16',
        imageWidth: 302,
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
        progressBar: true,
        progressBarColor: '#b51b1b',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        position: 'topRight',
        iconUrl: imageUrl2,
        iconColor: '#FAFAFB',
      });
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
    }
  },
};
let ms;
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
function addLeadingZero({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  return `${days}:${hours}:${minutes}:${seconds}`;
}

flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', () => {
  timeInterval = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    const time = convertMs(diff);
    const str = addLeadingZero(time);
    timeBlock.dayBlock.textContent = str; //???
    refs.btnStart.disabled = true;
  }, 1000);
  setTimeout(() => {
    clearInterval(timeInterval);
  }, userSelectedDate - Date.now());
});
