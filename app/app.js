const Game = require('./modules/Game.js');
const directions = require('./modules/Directions.js');
const GameStatistics = require('./modules/GameStatistics.js');
const StatsDisplayer = require('./modules/StatsDisplayer.js')

let game = new Game(document);
let gameStats = new GameStatistics(game);
let statsDisplayer = new StatsDisplayer(gameStats, document);
initUserInput(game);

game.engine.update(function(){
    statsDisplayer.display();
    // console.log(gameStats.getStatistics());
});

/**
 *
 * @param {Game} game
 */
function initUserInput(game){
    document.onkeydown = function(e){
        e = e || window.event;
        if(e.keyCode == '38'){
            // up arrow
            game.snake.setDirection(directions.up);
        }else if(e.keyCode == '40'){
            // down arrow
            game.snake.setDirection(directions.down);
        }else if(e.keyCode == '37'){
            // left arrow
            game.snake.setDirection(directions.left);
        }else if(e.keyCode == '39'){
            // right arrow
            game.snake.setDirection(directions.right);
        }
    }
}
