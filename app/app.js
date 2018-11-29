const Game = require('./modules/Game.js');
const directions = require('./modules/Directions.js');


let game = new Game();

initUserInput(game.snake);

function initUserInput(snake){
    document.onkeydown = function(e){
        e = e || window.event;
        if(e.keyCode == '38'){
            // up arrow

            snake.setDirection(directions.up);

        }else if(e.keyCode == '40'){
            // down arrow
            snake.setDirection(directions.down);

        }else if(e.keyCode == '37'){
            // left arrow
            snake.setDirection(directions.left);

        }else if(e.keyCode == '39'){
            // right arrow
            snake.setDirection(directions.right);

        }
    }
}
