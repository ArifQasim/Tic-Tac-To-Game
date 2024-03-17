let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".winner-msg");
let msg = document.querySelector("#msg");
let hideGame = document.querySelector("#game-window"); 
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
]

startGame.addEventListener("click", () =>{
    for(box of boxes){
        box.innerText = "";
        box.disabled = false;
    }
    msgContainer.classList.add("hide");
    hideGame.classList.remove("hide");
});
resetGame.addEventListener("click", ()=>{
    for(box of boxes){
        box.innerText = "";
        box.disabled = false;
    }
});

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turn0){
            box.innerText = "O";
            box.style.color = "rgba(145, 5, 145, 0.856)";
            box.style.textShadow = "0 0 10px rgba(145, 5, 145, 0.856)";
            turn0 = false;
        }else{
            box.innerText = "X";
            box.style.color = "rgba(0, 7, 219, 0.856)";
            box.style.textShadow = "0 0 10px rgba(0, 7, 219, 0.856)";
            turn0 = true;
        }
        box.disabled = true;
        winchecked();
    });
});

const showWinnerMsg = (winner) => {
    msg.innerText = `CONGRATULATIONS WINNER IS ${winner}`;
    msgContainer.classList.remove("hide");
    hideGame.classList.add("hide");
};
const showDrawMsg = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    hideGame.classList.add("hide");
};

const winchecked = () =>{

    let draw = true;

    for(let pattern of winPatterns){
        let player1val = boxes[pattern[0]].innerText;
        let player2val = boxes[pattern[1]].innerText;
        let player3val = boxes[pattern[2]].innerText;
        
        if(player1val != "" && player2val !="" && player3val !=""){
            if(player1val === player2val && player2val === player3val){
                console.log("winner");
                showWinnerMsg(player1val);
                return;
            };
        }else{
            draw = false;
        };
    };

    if(draw){
        showDrawMsg();
    }
};

