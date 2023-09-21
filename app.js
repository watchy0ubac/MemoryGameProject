const cards = document.querySelectorAll(".card");

let hasFlipped = false;
let lock = false;
let firstCard, secondCard;

function flipCard() {
  if (lock) return;
  if (this === firstCard) return;
  console.log("Flipped a card!");
  console.log(this);
  this.classList.toggle("flip");

  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let matching = firstCard.dataset.type === secondCard.dataset.type;

  matching ? disableCard() : unflipCards();
}

function disableCard() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}
function unflipCards() {
  lock = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lock = false;
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 10);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
