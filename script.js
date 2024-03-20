var root = document.documentElement;
let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".winner-msg");
let msg = document.querySelector("#msg");
let hideGame = document.querySelector(".game-window");
let resetGame = document.querySelector("#reset-btn");
let startGame = document.querySelector("#start-btn");

let turn0 = true;

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

playerTurnVisual(turn0);

startGame.addEventListener("click", () => {
  for (box of boxes) {
    box.innerText = "";
    box.disabled = false;
  }
  msgContainer.classList.add("hide");
  hideGame.classList.remove("hide");

});
resetGame.addEventListener("click", () => {
  for (box of boxes) {
    box.innerText = "";
    box.disabled = false;
  }

});

boxes.forEach((box) => {
  box.addEventListener("mouseenter", function () {
    // Only show X or O if the cell is empty
    if (!box.textContent) {
      box.textContent = turn0 ? "O" : "X";
    }
  });

  box.addEventListener("mouseleave", function () {
    // Clear the cell when mouse leaves if it's not selected
    if (!box.getAttribute("data-selected")) {
      box.textContent = "";
    }
  });
  box.addEventListener("click", () => {
    // Check if the cell is selected or not
    if (!box.getAttribute("data-selected")) {
      box.setAttribute("data-selected", true); // Mark cell as selected
      if (turn0) {
        box.innerText = "O";
        box.classList.add("Ouser");
        turn0 = false;
      } else {
        box.innerText = "X";
        box.classList.add("Xuser");
        turn0 = true;
      }

      box.disabled = true;
      winchecked();
    }

    //Change visual if it's O or X's turn
    playerTurnVisual(turn0);
  });
});

const showWinnerMsg = (winner) => {
  msg.innerText = `CONGRATULATIONS! \n Player ${winner} is the winner.`;
  msgContainer.classList.remove("hide");
  hideGame.classList.add("hide");
};
const showDrawMsg = () => {
  msg.innerText = "It's a draw!";
  msgContainer.classList.remove("hide");
  hideGame.classList.add("hide");
};

const winchecked = () => {
  let draw = true;

  for (let pattern of winPatterns) {
    let player1val = boxes[pattern[0]].innerText;
    let player2val = boxes[pattern[1]].innerText;
    let player3val = boxes[pattern[2]].innerText;

    if (player1val != "" && player2val != "" && player3val != "") {
      if (player1val === player2val && player2val === player3val) {
        console.log("winner");
        showWinnerMsg(player1val);
        removeAtt(boxes);
        return;
      }
    } else {
      draw = false;
    }
  }

  if (draw) {
    showDrawMsg();
    removeAtt(boxes);
  }
};

function removeAtt(_boxes) {
  _boxes.forEach((_box) => {
    _box.removeAttribute("data-selected");
  });
}

function playerTurnVisual(_turnO) {
  if (_turnO) {
    document.querySelector(".playerNameO").style.opacity = 1;
    document.querySelector(".playerNameX").style.opacity = 0.1;
  } else {
    document.querySelector(".playerNameX").style.opacity = 1;
    document.querySelector(".playerNameO").style.opacity = 0.1;
  }
}
