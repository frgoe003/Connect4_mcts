import { ConnectFour } from './board.js';
import { MonteCarloTreeSearch } from './mcts.js';

var c1 = document.getElementById('col1');
var c2 = document.getElementById('col2');
var c3 = document.getElementById('col3');
var c4 = document.getElementById('col4');
var c5 = document.getElementById('col5');
var c6 = document.getElementById('col6');
var c7 = document.getElementById('col7');

var reset = document.getElementById('reset');

const cols = [c1, c2, c3, c4, c5, c6, c7];
const game = new ConnectFour();
game.verbose = true;

c1.addEventListener('click', function() {
  game.insertPiece(0);
  update();
})
c2.addEventListener('click', function() {
  game.insertPiece(1);
  update();
})
c3.addEventListener('click', function() {
    game.insertPiece(2);
    update();
})
c4.addEventListener('click', function() {
    game.insertPiece(3);
    update();
})
c5.addEventListener('click', function() {
    game.insertPiece(4);
    update();
})
c6.addEventListener('click', function() {
    game.insertPiece(5);
    update();
})
c7.addEventListener('click', function() {
    game.insertPiece(6);
    update();
})

reset.addEventListener('click', function() {
    game.reset();
    update();
})

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
            console.log("Player wins!");
        }
        else if (game.winner === 2) {
            console.log("AI wins!");
        }
        else {
            console.log("It's a draw!");
        }
        return;
    }

    let clone = game.clone();
    //clone.verbose = false;
    clone.currentPlayer = 2;
    MCTS.state = clone;

    if (game.currentPlayer === 2) { // AI's turn
        //let move = MCTS.getRandomMove();
        let move = MCTS.selectBestMove();
        console.log('AI move: ' + move);
        game.insertPiece(move);

    }
  requestAnimationFrame(update);
}



