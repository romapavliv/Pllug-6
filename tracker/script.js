class Tracker {
  static trackerList = [];
  static dataFromLocalStorage = [];
  name = "";
  id = "";
  pause = false;
  startTime;
  seconds = 0;
  time = 0;
  timer = "";
  lsMode;

  constructor(
    name,
    seconds = 0,
    pause = false,
    startTime = "",
    lsMode = false
  ) {
    this.name = name;
    this.seconds = seconds;
    this.pause = pause;
    this.startTime = new Date(startTime);
    this.lsMode = lsMode;
    this.id = this.btnIdgen();
    this.createTimer();

    if (pause) {
      this.lsMode = false;
      this.startTime = new Date();
    } else {
      this.startTimer();
    }
    this.formatTime(seconds);
  }

  btnIdgen() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  static saveToLS() {
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(Tracker.trackerList));
  }

  static loadFromLS() {
    const save = JSON.parse(localStorage.getItem("data"));
    if (save) {
      Tracker.dataFromLocalStorage = save.reverse();
      if (Tracker.trackerList) {
        Tracker.trackerList.map((tracker) => {
          tracker.deleteTracker();
        });
      }
      Tracker.dataFromLocalStorage.map((tracker) => {
        this.createNewTimer(
          tracker.name,
          tracker.seconds,
          tracker.pause,
          tracker.startTime,
          true
        );
      });
    }
  }
  static createNewTimer(name, seconds, pause, startTime, lsMode) {
    const newTracer = new Tracker(name, seconds, pause, startTime, lsMode);
    Tracker.trackerList.unshift(newTracer);
  }

  formatTime() {
    const currentTime = new Date();
    this.time =
      +((currentTime.getTime() - this.startTime.getTime(0)) / 1000).toFixed(0) +
      this.seconds;

    let hh = Math.floor(this.time / 3600);
    let mm = Math.floor((this.time - hh * 3600) / 60);
    let ss = this.time - hh * 3600 - mm * 60;

    const message = `${(hh = hh < 10 ? "0" + hh : hh)}:${(mm =
      mm < 10 ? "0" + mm : mm)}:${(ss = ss < 10 ? "0" + ss : ss)}`;
    this.span.innerHTML = message;
  }

  startTimer() {
    if (this.timer) return;

    if (!this.lsMode) this.startTime = new Date();

    this.pause = false;
    this.lsMode = false;
    this.timer = setInterval(() => {
      this.formatTime(this.time);
      if (this.time >= 360000) this.deleteTracker();
    }, 1000);
  }

  createTimer() {
    const trackers = document.querySelector("#trackers");
    this.tracker = this.createEl(trackers, "div", "timerItem", 1);

    const p = this.createEl(this.tracker, "p");
    this.span = this.createEl(this.tracker, "span");

    const buttons = this.createEl(this.tracker, "div", "btns");

    this.pauseBtn = this.createEl(buttons, "button", "btnPause");
    this.pauseBtn.innerText = "pause";
    this.removeBtn = this.createEl(buttons, "button", "btnRemove");
    this.removeBtn.innerText = "delete";

    this.pauseBtn.dataset["id"] = this.id;
    this.removeBtn.dataset["id"] = this.id;

    p.innerHTML = this.name;
    this.span.innerHTML = "00:00:00";
  }

  stopTimer() {
    this.pause = true;
    this.seconds = this.time;
    clearInterval(this.timer);
    this.timer = "";
  }

  createEl(fatherEl, selector, classEl = null, mode = 0) {
    const newEl = document.createElement(selector);
    classEl ? newEl.classList.add(classEl) : null;
    mode === 0 ? fatherEl.append(newEl) : fatherEl.prepend(newEl);
    return newEl;
  }

  deleteTracker() {
    this.tracker.remove();
    this.constructor.trackerList = this.constructor.trackerList.filter(
      (tracker) => tracker.id !== this.id
    );
    clearInterval(this.timer);
  }
}

const form = document.forms["form"],
  trackers = document.querySelector("#trackers"),
  btnStart = document.querySelector("#add");
console.log(form);

Tracker.loadFromLS();

trackers.addEventListener("click", (event) => {
  const currentId = event.target.dataset["id"];
  if (event.target.classList.contains("btnPause")) {
    Tracker.trackerList.map((tracer) => {
      if (tracer.id === currentId) {
        tracer.pause ? tracer.startTimer() : tracer.stopTimer();
        Tracker.saveToLS();
      }
    });
  }

  if (event.target.classList.contains("btnRemove")) {
    Tracker.trackerList.map((tracer) => {
      if (tracer.id === currentId) {
        tracer.deleteTracker();
        Tracker.saveToLS();
      }
    });
  }
  Tracker.loadFromLS();
});

btnStart.addEventListener("click", (event) => {
  event.preventDefault();
  Tracker.createNewTimer(
    form.elements.name.value
      ? form.elements.name.value
      : new Date().toLocaleString()
  );
  form.elements.name.value = null;
  Tracker.saveToLS();
  console.log("1", form.target.value);
});

window.addEventListener("unload", Tracker.saveToLS);

window.onstorage = () => {
  Tracker.loadFromLS();
};
Завдання виконано
