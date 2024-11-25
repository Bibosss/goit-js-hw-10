// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const datePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const timerFields = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const timeNow = Date.now();

        if (selectedDate < timeNow) {
            iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
    });
            startButton.disabled = true;
        }
        else {
            startButton.disabled = false;
            userSelectedDate = selectedDate;
        }
  },
};

flatpickr(datePicker, options);

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

function updateTimerDisplay({ days, hours, minutes, seconds }) {
    timerFields.days.textContent = addLeadingZero(days);
    timerFields.hours.textContent = addLeadingZero(hours);
    timerFields.minutes.textContent = addLeadingZero(minutes);
    timerFields.seconds.textContent = addLeadingZero(seconds);
};

function startTimer() {
    intervalId = setInterval(() => {
        const timeDifference = userSelectedDate - Date.now();

        if (timeDifference <= 0) {
            clearInterval(intervalId);  
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            datePicker.disabled = false;
            startButton.disabled = true;
            return;
        };
        const time = convertMs(timeDifference);
        updateTimerDisplay(time);
    }, 1000)
}

startButton.addEventListener("click", () => {
    startTimer();
    datePicker.disabled = true;
    startButton.disabled = true;
})


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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
