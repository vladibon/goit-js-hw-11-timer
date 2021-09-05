import messages from './messages.js';

export default class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.refs = {
      daysRef: document.querySelector(`${selector} [data-value="days"]`),
      hoursRef: document.querySelector(`${selector} [data-value="hours"]`),
      minsRef: document.querySelector(`${selector} [data-value="mins"]`),
      secsRef: document.querySelector(`${selector} [data-value="secs"]`),
    };

    this.startup(targetDate.getTime());
  }

  startup(targetTime) {
    if (targetTime - Date.now() <= 0) {
      title.textContent = messages.error;
      return;
    }

    const intervalId = setInterval(() => {
      const deltaTime = targetTime - Date.now();

      this.updateTimerInterface(this.getTimeComponents(deltaTime));

      if (deltaTime < 1000) {
        clearInterval(intervalId);
        title.textContent = messages.end;
      }
    }, 1000);
  }

  updateTimerInterface({ days, hours, mins, secs }) {
    const { daysRef, hoursRef, minsRef, secsRef } = this.refs;

    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minsRef.textContent = mins;
    secsRef.textContent = secs;
  }

  getTimeComponents(time) {
    return {
      days: this.pad(Math.floor(time / (1000 * 60 * 60 * 24))),
      hours: this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
      mins: this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))),
      secs: this.pad(Math.floor((time % (1000 * 60)) / 1000)),
    };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}
