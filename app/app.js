const Game = require('./Game/Game.js');
const directions = require('./Game/Directions.js');
const GameState = require('./Statistics/GameState.js');
const StatsDisplayer = require('./Game/StatsDisplayer.js');
const Chart = require('./Statistics/Chart.js');

let game = new Game(document);
let chart = new Chart({
    container: 'chart',
    game,
    population: game.population,
});
game.start();
let gameStats = new GameState(game);
let statsDisplayer = new StatsDisplayer(gameStats, document);
initUserInput(game);


/**
 *
 * @param {Game} game
 */
function initUserInput(game){
    document.onkeydown = function(e){
        e = e || window.event;
        if (e.keyCode === 38) {
            // up arrow
            game.getSnake().setDirection(directions.up);
        } else if (e.keyCode === 40) {
            // down arrow
            game.getSnake().setDirection(directions.down);
        } else if (e.keyCode === 37) {
            // left arrow
            game.getSnake().setDirection(directions.left);
        } else if (e.keyCode === 39) {
            // right arrow
            game.getSnake().setDirection(directions.right);
        }
    }
}
