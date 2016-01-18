
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
    
    this.spaces = initialize();

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

    function initialize(){
        if (this.spaces !== undefined) {
            var spaces = new Array(this.row);
            
            for (i = 0; i < this.row; i++) {
                spaces[i] = new Array(this.col);
            }
            
            var min = 1;
            var max = this.row * this.col;
            var bombCount = Math.random() * (max - min) + min;
            for (i = 0; i < bombCount; i++) {
                var bombIndex = Math.random() * max;
                spaces[bombIndex / this.row][bombIndex % this.col] = -1;
            }
            
            for (i = 0; i < this.row; i++) {
                for (j = 0; j < this.col; j++) {
                    spaces[i][j] = bombCount(i,j);
                }
            }

            return spaces;
        }
    }

    function bombCount(row, col) {
        var sum = 0;

        if (this.spaces[row][col] == -1) {
            return -1;
        }
        
        sum += valueAt(row - 1, col - 1) + valueAt(row - 1, col) + valueAt(row - 1, col + 1) 
            + valueAt(row, col - 1)                 +               valueAt(row, col + 1) 
            + valueAt(row + 1, col - 1) + valueAt(row + 1, col) + valueAt(row + 1, col + 1);
        
        return sum;
    }

    function valueAt(row, col){
        if (row - 1 < 0 || row + 1 >= this.row || col - 1 < 0 || col + 1 >= this.col) {
            return 0;
        } else {
            return this.spaces[row][col];
        }
    }

    this.render = function (row,col) {
        var spaces = "";        
        for (i = 1; i <= row; i++) {
            for (j = 1; j <= col; j++) {
                spaces = spaces.concat('<div class="space" data-row="' + i + '" data-col="' + j + '">&nbsp;</div>');
            }
            spaces = spaces.concat('<br />');
        }
        $('#board').append(spaces);
    }
}