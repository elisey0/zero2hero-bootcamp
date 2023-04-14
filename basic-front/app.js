let userScore = 0;
let computerScore = 0;

const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultP = document.querySelector(".result > p");

const rockDiv = document.getElementById("r");
const paperDiv = document.getElementById("p");
const scissorsDiv = document.getElementById("s");

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const rundomNumer = Math.floor(Math.random() * 3);
  return choices[rundomNumer];
}

function convertToWord(letter) {
  if (letter === "r") return "Rock";
  if (letter === "p") return "Paper";
  return "Scissors";
}

function win(userChoise, computerChoice) {
  userScore++;
  userScoreSpan.innerHTML = userScore;
  computerScoreSpan.innerHTML = computerScore;
  resultP.innerHTML = `${convertToWord(userChoise)} beats ${convertToWord(
    computerChoice
  )}. You win!`;
}

function lose(userChoise, computerChoice) {
  computerScore++;
  userScoreSpan.innerHTML = userScore;
  computerScoreSpan.innerHTML = computerScore;
  resultP.innerHTML = `${convertToWord(userChoise)} loses to ${convertToWord(
    computerChoice
  )}. You lost...`;
}

function draw(userChoise, computerChoice) {
  resultP.innerHTML = `${convertToWord(userChoise)} equals to ${convertToWord(
    computerChoice
  )}. It's a draw.`;
}

function game(userChoise) {
  const computerChoice = getComputerChoice();

  switch (userChoise + computerChoice) {
    case "pr":
    case "rs":
    case "sp":
      win(userChoise, computerChoice);
      break;

    case "rp":
    case "sr":
    case "ps":
      lose(userChoise, computerChoice);
      break;

    case "rr":
    case "ss":
    case "pp":
      draw(userChoise, computerChoice);
      break;
  }
}

function main() {
  rockDiv.addEventListener("click", function () {
    game("r");
  });

  paperDiv.addEventListener("click", function () {
    game("p");
  });

  scissorsDiv.addEventListener("click", function () {
    game("s");
  });
}

main();
