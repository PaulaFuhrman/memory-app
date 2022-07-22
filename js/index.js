const symbols = [
  "fa-solid fa-cow",
  "fa-solid fa-cat",
  "fa-solid fa-dog",
  "fa-solid fa-hippo",
  "fa-solid fa-spider",
  "fa-solid fa-dove",
  "fa-solid fa-dragon",
  "fa-solid fa-fish",
  "fa-solid fa-horse",
  "fa-solid fa-kiwi-bird",
  "fa-solid fa-otter",
  "fa-solid fa-frog",
  "fa-solid fa-cow",
  "fa-solid fa-cat",
  "fa-solid fa-dog",
  "fa-solid fa-hippo",
  "fa-solid fa-spider",
  "fa-solid fa-dove",
  "fa-solid fa-dragon",
  "fa-solid fa-fish",
  "fa-solid fa-horse",
  "fa-solid fa-kiwi-bird",
  "fa-solid fa-otter",
  "fa-solid fa-frog",
];

const timeInfo = document.querySelector(".timer");
const popUp = document.querySelector(".pop-up");
const gameBoard = document.querySelector(".game");

let activeCard = "";
const activeCards = [];
const gamePairs = symbols.length / 2;
let gameResults = 0;
let active = false;
let time = 59;
let setI;

const attachListeners = () => {
  document.querySelector("#play").addEventListener("click", showGamePanel);
};

const showGamePanel = () => {
  document.querySelector(".wrapper").classList.add("hidden");

  setTimeout(() => {
    gameBoard.style.display = "flex";
  }, 600);

  setTimeout(() => {
    document.querySelector(".wrapper").style.display = "none";
    gameBoard.classList.add("visible");
    renderGameBoard();
  }, 800);
};

const renderGameBoard = () => {
  for (let i = 0; i < symbols.length; i++) {
    const boardElement = document.createElement("div");
    document.querySelector(".board").appendChild(boardElement);
  }
  renderPosition();
};

const renderPosition = () => {
  const board = [...document.querySelectorAll(".board div")];

  board.forEach((el) => {
    const positionItem = Math.floor(Math.random() * symbols.length);
    el.innerHTML = `<i class="${symbols[positionItem]}"></i>`;
    symbols.splice(positionItem, 1);

    countdownToGameStart();

    setTimeout(() => {
      const boardItem = [...el.children];

      boardItem.forEach((item) => {
        item.classList.add("hidden-card");
        item.addEventListener("click", clickCard);
      });
    }, 5000);
  });
};

const clickCard = (e) => {
  activeCard = e.target;

  let cards = [...document.querySelectorAll(".board i")];

  if (activeCard == activeCards[0]) return;
  activeCard.classList.remove("hidden-card");

  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;
  } else {
    activeCards[1] = activeCard;
    cards.forEach((card) => card.removeEventListener("click", clickCard));

    setTimeout(() => {
      if (activeCards[0].className === activeCards[1].className) {
        activeCards.forEach((card) => card.classList.add("off"));
        gameResults++;
        if (gameResults == gamePairs) {
          renderPopUpWin();
        }
      } else {
        activeCards.forEach((card) => card.classList.add("hidden-card"));
      }
      activeCard = "";
      activeCards.length = 0;
      cards.forEach((card) => card.addEventListener("click", clickCard));
    }, 300);
  }
};

const countdownToGameStart = () => {
  setTimeout(() => {
    timeInfo.textContent = "3";
  }, 2000);
  setTimeout(() => {
    timeInfo.textContent = "2";
  }, 3000);
  setTimeout(() => {
    timeInfo.textContent = "1";
  }, 4000);
  setTimeout(() => {
    timeInfo.textContent = "01:00";
    renderTimer();
  }, 5000);
};

const renderTimer = () => {
  if (!active) {
    active = !active;
    setI = setInterval(startGame, 1000);
  }
};

const startGame = () => {
  if (time < 0) {
    renderPopUpLose();
    return;
  } else if (time < 10) {
    timeInfo.textContent = `00:0${time--}`;
  } else {
    timeInfo.textContent = `00:${time--}`;
  }
};

const renderPopUpLose = () => {
  clearInterval(setI);
  popUp.style.display = "flex";
  gameBoard.style.display = "none";
  popUp.innerHTML = `
         <p>You <strong>Lose</strong>!</p>
         <i class="fa-solid fa-face-frown-open"></i>
         <button class="btn" id="play-again" onclick="playAgain()">Play again</button>
        `;
};

const renderPopUpWin = () => {
  clearInterval(setI);
  popUp.style.display = "flex";
  gameBoard.style.display = "none";
  popUp.innerHTML = `
        <i class="fas fa-trophy"></i>
         <p>You <strong>Win</strong>!</p>
         <p>Your time: <strong>${60 - time}</strong> sec</p>
         <button class="btn" id="play-again" onclick="playAgain()">Play again</button>
        `;
};

const playAgain = () => {
  location.reload();
};

attachListeners();
