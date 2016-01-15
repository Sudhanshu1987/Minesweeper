
// Start New Game
function newGame(difficulty) {
    // On selection of mode, create corresponding grids.
    var board;
    switch (difficulty) {
        case 'easy':
            board = new Board(6,8);
            break;
        case 'hard':
            board = new Board(12, 15);
            break;
        case 'reg':
        default:
            board = new Board(8, 10);
            break;
    }
    board.render();    
}

// Board Object
function Board(row, col){
    this.row = row;
    this.col = col;
    
    var spaces = new Array(this.row);
    
    for (i = 0; i < this.row; i++) {
        spaces[i] = new Array(this.col);
    }

    this.render = function (){
        var spaces = "";
        for (i = 1; i <= row; i++) {
            for (j = 1; j <= col; j++) {
                spaces = spaces.concat('<div class="space" data-row="' + i + '" data-col="' + j + '">&nbsp;</div>');                
            }
            spaces = spaces.concat('<br />');
        }
        $('#board').append(spaces);
    }

    function getRandomArray(){
        var min = 1;
        var max = this.row * this.col;
        var bombCount = Math.random() * (max - min) + min;
    }
}