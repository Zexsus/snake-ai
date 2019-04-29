const Game = require('./Game/Game.js');
const GameState = require('./Statistics/GameState.js');
const GoogleFacade = require('./Statistics/charts/GoogleFacade.js');

const game = new Game(document);
const gameStats = new GameState(game);
const googleFacade = new GoogleFacade(game);


document.getElementById('startButton').addEventListener('click', () => {
    if (!game.isRunning) {
        game.start();
    }
});

document.getElementById('skipGenerations').addEventListener('click', () => {
    // if(!game.isRunning) {
    game.skipGenerations(parseInt(document.getElementById('generationsToSkip').value));
    // }
});