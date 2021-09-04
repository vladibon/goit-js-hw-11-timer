export default class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.refs = {
      daysRef: document.querySelector(`${selector} [data-value="days"]`),
      hoursRef: document.querySelector(`${selector} [data-value="hours"]`),
      minsRef: document.querySelector(`${selector} [data-value="mins"]`),
      secsRef: document.querySelector(`${selector} [data-value="secs"]`),
    };

    this.intervalId = setInterval(() => {
      const deltaTime = targetDate.getTime() - Date.now();

      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        console.log(
          `Error: Target date must be in the future. Please enter valid target date.`,
        );
        return;
      }

      this.updateTimerface(this.getTimeComponents(deltaTime));
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
