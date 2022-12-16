import data from "./data.js";

const container = document.querySelector(".container");
let score = 0;
let moves = document.querySelector(".moves");
const restart = document.querySelector("button");
const winMsg = document.querySelector("h2");
const bestScore = document.querySelector("h3 span");

start();

restart.addEventListener("click", () => {
  container.innerText = "";
  document.body.style.backgroundColor = "aquamarine";
  score = 0;
  moves.textContent = 0;
  winMsg.style.display = "none";
  start();
});

function start() {
  restart.disabled = true;
  bestScore.textContent = JSON.parse(localStorage?.getItem("bestScore")) || 0;
  data
    .sort(() => Math.random() - 0.5)
    .forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      const face = document.createElement("img");
      face.className = "face";
      const back = document.createElement("div");
      back.className = "back";

      face.src = item.imgPath;
      face.alt = item.name;

      card.appendChild(back);
      card.appendChild(face);
      container.appendChild(card);
      card.setAttribute("name", item.name);

      card.addEventListener("click", (e) => {
        card.classList.toggle("toggle-card");

        checkCards(e);
      });
    });
}

const checkCards = (e) => {
  const clickedCards = e.target;
  clickedCards.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const matchedCards = document.querySelectorAll(".toggle-card");

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((i) => {
        i.classList.remove("flipped");
        i.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((i) => {
        i.classList.remove("flipped");
        setTimeout(() => i.classList.remove("toggle-card"), 1000);
      });
    }
    score++;
    console.log(score);
    moves.textContent = score;
  }

  if (matchedCards.length === 12) {
    console.log("win");
    document.body.style.backgroundColor = "lightgreen";
    restart.disabled = false;
    winMsg.style.display = "inline";
    bestScore.textContent = score;
    localStorage.setItem("bestScore", score);
  }
};
