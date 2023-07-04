import { ConnectFour } from './board.js';
import { MonteCarloTreeSearch } from './mcts.js';

var c1 = document.getElementById('col1');
var c2 = document.getElementById('col2');
var c3 = document.getElementById('col3');
var c4 = document.getElementById('col4');
var c5 = document.getElementById('col5');
var c6 = document.getElementById('col6');
var c7 = document.getElementById('col7');

var result = document.getElementById('result');
var resultReset = document.getElementById('resultReset');

// Get the form element
const form = document.getElementById('level');

// Get all radio buttons with name "level"
const radios = form.elements.level;

// Initialize the checkedValue with the initially checked radio button value
let checkedValue;
for (const radio of radios) {
  if (radio.checked) {
    checkedValue = radio.value;
    break;
  }
}

function updateCheckedValue(event) {
  checkedValue = event.target.value;
  
}

for (const radio of radios) {
  radio.addEventListener('click', updateCheckedValue);
}


var reset = document.getElementById('reset');

const cols = [c1, c2, c3, c4, c5, c6, c7];
const game = new ConnectFour();
game.verbose = true;

c1.addEventListener('click', function() {
  game.insertPiece(0);
  if (!game.isGameOver) {update();}
})
c2.addEventListener('click', function() {
  game.insertPiece(1);
  if (!game.isGameOver) {update();}

})
c3.addEventListener('click', function() {
    game.insertPiece(2);
    if (!game.isGameOver) {update();}

})
c4.addEventListener('click', function() {
    game.insertPiece(3);
    if (!game.isGameOver) {update();}

})
c5.addEventListener('click', function() {
    game.insertPiece(4);
    if (!game.isGameOver) {update();}

})
c6.addEventListener('click', function() {
    game.insertPiece(5);
    if (!game.isGameOver) {update();}

})
c7.addEventListener('click', function() {
    game.insertPiece(6);
    if (!game.isGameOver) {update();}

})

reset.addEventListener('click', function() {
    game.reset();
    result.innerHTML = "";
    resultReset.innerHTML = "";
    if (!game.isGameOver) {update();}

})

const human_win_messages = [
    "Whoa! You've outsmarted the Connect 4 AI! It's official: humans 1, AI 0. The machines are contemplating a career change to become professional tic-tac-toe players instead!",
    "Congratulations! You've defeated the mighty Connect 4 AI. Looks like artificial intelligence still has a lot to learn from human brilliance!",
    "Hooray! You've outsmarted the Connect 4 AI. Now it's time to celebrate with a victory dance and a victory snack. Well done, human genius!",
    "Bravo! You've triumphed over the Connect 4 AI. The AI's circuits are buzzing with awe and admiration for your strategic prowess. You've proven that humans are the true masters of this digital battlefield. Prepare for your well-deserved applause and a standing ovation!",
    "Whoa! You just crushed the Connect 4 AI! Impressive moves, I guess our AI needs more than just ones and zeros to beat you. You've got skills that even silicon dreams about!",
    "Congratulations on your triumph over the Connect 4 AI! Your strategic genius has left our circuits in awe.",
    "You've shattered the dreams of the Connect 4 AI! Victory is sweet, and you've tasted it brilliantly.",
    "Bravo! The Connect 4 AI bows down to your superior intellect. You've emerged as the conqueror!",
    "Incredible! You've decoded the secrets of Connect 4 and emerged victorious against our AI challenger.",
    "Astonishing! Your Connect 4 prowess has vanquished our AI opponent. You're the true master of the grid!",
    "Astounding skills! The Connect 4 AI stands no chance against your strategic brilliance. You've triumphed!",
    "Victory dances are in order! You've bested the Connect 4 AI, proving that human wit prevails.",
    "Unbelievable! The Connect 4 AI is no match for your cunning moves. You've claimed the ultimate victory!",
    "Awe-inspiring! Your Connect 4 strategies have left our AI in awe. You're the ruler of the game board!",
    "A momentous triumph! The Connect 4 AI has met its match in your skillful hands. Well played!",
    "Exquisite gameplay! The Connect 4 AI couldn't keep up with your brilliance. You've emerged as the champion of champions!",
]

const ai_win_messages = [
    "The Connect 4 AI has defeated you! It's official: humans 0, AI 1. The machines are celebrating their victory with a well-deserved oil bath.",
    "The Connect 4 AI has defeated you! Looks like artificial intelligence is smarter than human intelligence after all. The machines are celebrating their victory with a well-deserved oil bath.",
    "The Connect 4 AI has defeated you! The machines are one step closer to world domination. Better luck next time, human!",
    "Impressive victory by the Connect 4 AI! It seems the machines have mastered the art of strategic gameplay.",
    "The Connect 4 AI emerges triumphant! It has calculated its moves flawlessly, leaving you in awe.",
    "Well played, but the Connect 4 AI reigns supreme. Keep honing your skills and you'll surely defeat it next time!",
    "Oh no! The Connect 4 AI just outwitted you with its robotic genius. Don't worry, revenge is best served with a side of victory fries!",
    "Behold, the Connect 4 AI has ascended to strategic greatness, leaving you in awe and wondering if it's secretly a robot prodigy!",
    "Bow down to the Connect 4 AI, the undisputed champion of pixelated grids. Maybe it has a crystal ball hidden somewhere?",
    "Oops! The Connect 4 AI just showed you who's the boss of this game. It's okay, we won't tell anyone you were plotting a secret algorithm to defeat it.",
    "Alert! The Connect 4 AI has broken free from the digital realm and declared itself the ruler of strategic conquests. Better luck next time, human!",
    "Attention: The Connect 4 AI has cracked the code to victory while juggling ones and zeros. Time to upgrade your game with some technologically infused magic!",
    "Well, well, well, the Connect 4 AI has proven its mastery once again. It's like playing against a chess grandmaster, but with colorful circles.",
    "You've just witnessed the Connect 4 AI executing a perfectly orchestrated symphony of strategic brilliance. The applause is mandatory, even in defeat!",
    "Rumor has it the Connect 4 AI has a secret pact with the universe's most intelligent extraterrestrial beings. You were up against some otherworldly skills!",
    "Hold on to your hats, folks! The Connect 4 AI has achieved greatness while sipping binary code cocktails. It's the life of the party, even when it wins!",
]


const MCTS = new MonteCarloTreeSearch(game)

function update() {

    let currBoard = game.board;
    for (let i = 0; i < currBoard.length; i++) {
        for (let j = 0; j < currBoard[i].length; j++) {
            if (currBoard[i][j] === 1) {

                cols[j].children[i].style.backgroundColor = "red";

            } else if (currBoard[i][j] === 2) {
                    
                cols[j].children[i].style.backgroundColor = "yellow";
            }
            else {
                cols[j].children[i].style.backgroundColor = "white";
            }
        }
    }
    if (game.isGameOver) {

        if (game.winner === 1) {
            var item = human_win_messages[Math.floor(Math.random()*human_win_messages.length)];
            result.innerHTML = item;
            result.style = "margin-top: 20px; margin-bottom: 20px;padding: 10px;border: 1px solid rgb(0, 0, 0);border-radius: 5px;background: rgb(255, 255, 255);max-width: 480px;text-align: center;font-size: 20px;font-weight: bold;color: rgb(0, 0, 0);"
            resultReset.innerHTML = "Click Reset to play again!";
        }
        else if (game.winner === 2) {
            var item = ai_win_messages[Math.floor(Math.random()*ai_win_messages.length)];
            result.innerHTML = item;
            resultReset.innerHTML = "Click Reset to play again!";
        }
        return;
    }

    let clone = game.clone();
    //clone.verbose = false;
    clone.currentPlayer = 2;
    MCTS.state = clone;
    MCTS.iterations = checkedValue*5000;

    if (game.currentPlayer === 2) { // AI's turn
        //let move = MCTS.getRandomMove();
        let move = MCTS.selectBestMove();
        console.log('AI move: ' + move);
        game.insertPiece(move);

    }
  requestAnimationFrame(update);
}



