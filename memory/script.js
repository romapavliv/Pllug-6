const cards = document.querySelectorAll(".memory-card");
const inputText = document.getElementById("inp");
const singBtn = document.getElementById("sing");
const title = document.getElementById("title");
const formArea = document.querySelector(".formArea");
const wrapper = document.querySelector(".wrapper");
const counter = document.querySelector(".counter");
const counterWin = document.querySelector(".counterWin");
const timerArea = document.getElementById("timer");
const finalTime = document.querySelector(".finalTime");
const winModal = document.querySelector(".winPage");
const playAgain = document.querySelector(".playAgain");

let hasFlipCard = false;
let bordFrez = false;
let firstCard;
let secondCard;
let namePlayer = [];
let countCard = 0;
let ready = true;
let stopTimer = true;

function timerStart() {
  if (ready == true) {
    let timer = 0;
    let hour = 0;
    let minute = 0;
    let second = 0;

    window.setInterval(function () {
      ++timer;
      hour = Math.floor(timer / 3600);
      minute = Math.floor((timer - hour * 3600) / 60);
      second = timer - hour * 3600 - minute * 60;
      if (hour < 10) hour = "0" + hour;
      if (minute < 10) minute = "0" + minute;
      if (second < 10) second = "0" + second;
      timerArea.innerHTML = `${hour}  :  ${minute} : ${second}`;
      if (stopTimer) {
        timer.innerHTML = "00:00:00";
        timer = 0;
        hour = 0;
        minute = 0;
        second = 0;
        return;
      }
    }, 1000);
  }
}

singBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (inputText.value.replace(/\s/g, "").length <= 0) {
    inputText.style.border = "5px solid red";
    inputText.focus();
  } else {
    namePlayer.push(inputText.value);
    title.innerHTML += ` ${namePlayer}`;
    inputText.value = "";
    wrapper.style.display = "block";
    formArea.style.display = "none";
  }
});

const flipCard = (e) => {
  if (bordFrez) return;
  const target = e.target.parentElement;
  if (target === firstCard) return;
  console.log(target);
  target.classList.add("flip");
  console.log("data", target.dataset.name);
  stopTimer = false;
  timerStart();
  ready = false;

  if (!hasFlipCard) {
    hasFlipCard = true;
    firstCard = target;
  } else {
    hasFlipCard = false;
    secondCard = target;
    checkFromMatch();
    countCard++;
    counter.innerHTML = `Shot = ${countCard}`;
    win();
  }
};

const checkFromMatch = () => {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    blockEvent();
  } else {
    noFlipCards();
  }
};

const blockEvent = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
};

const noFlipCards = () => {
  bordFrez = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 1000);
};

const reset = () => {
  hasFlipCard = false;
  bordFrez = false;
  firstCard = null;
  secondCard = null;
};

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
  let randomize = Math.floor(Math.random() * cards.length);
  card.style.order = randomize;
});

function win() {
  let flipedCards = document.getElementsByClassName("memory-card flip");
  if (flipedCards.length == 16) {
    counterWin.innerHTML = countCard;
    finalTime.innerText = timerArea.innerText;
    stopTimer = true;
    wrapper.style.display = "none";
    winModal.classList.remove("closed");
  }
}

const refreshPage = () => {
  location.reload();
};

playAgain.addEventListener("click", refreshPage);
