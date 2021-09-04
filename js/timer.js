export default class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.refs = {
      daysRef: document.querySelector(`${selector} [data-value="days"]`),
      hoursRef: document.querySelector(`${selector} [data-value="hours"]`),
      minsRef: document.querySelector(`${selector} [data-value="mins"]`),
      secsRef: document.querySelector(`${selector} [data-value="secs"]`),
    };
    this.targetTime = targetDate.getTime();

    setInterval(() => {
      this.updateTimerface(this.getTimeComponents(this.targetTime - Date.now()));
    }, 1000);
  }

  updateTimerface({ days, hours, mins, secs }) {
    const { daysRef, hoursRef, minsRef, secsRef } = this.refs;

    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minsRef.textContent = mins;
    secsRef.textContent = secs;
  }

  getTimeComponents(time) {
    const { pad } = this;

    return {
      days: pad(Math.floor(time / (1000 * 60 * 60 * 24))),
      hours: pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
      mins: pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))),
      secs: pad(Math.floor((time % (1000 * 60)) / 1000)),
    };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}
