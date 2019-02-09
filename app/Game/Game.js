const GameObjectState = require("../Engine/GameObjectState.js");
const Engine = require("../Engine/Engine.js");
const Grid = require("./GameObjects/Grid.js");
const Vector2D = require("../Engine/Vector2D.js");
const config = require('./game-config.json');
const GridSnakeInterface = require('../Snake/GridSnakeInterface.js');
const Population = require('../Brain/Population.js');
const GameStatistics = require('./GameStatistics.js');


class Game {

    /**
     * @param {HTMLDocument} document
     */
    constructor(document){
        this.isRunning = false;
        this.document = document;
        this.gameStats = new GameStatistics(this);
        this.foodItem = null;
        this.movesWithoutGrow = 0;
        if (!this.gameAwaken) this.awake();
        this.start();
    }

    awake(){
        this.setupEngine();
        this.setupGrid();
        this.generateFood();

        if(!this.gameAwaken){
            this.gameAwaken = true;
        }
    }

    setupEngine(){
        this.engine = new Engine({
            document: this.document,
            fps: 20,
            states: [
                new GameObjectState('default', '#a4f2ff'),
                new GameObjectState('wall', '#003b62'),
                new GameObjectState('food', '#fffa00'),
                new GameObjectState('body', '#00a842'),
                new GameObjectState('head', '#d75600'),
            ],
            canvasSettings: {
                width: config.canvas.width,
                height: config.canvas.height,
                style: {
                    border: "2px solid black",
                    padding: "2px",
                    margin: "10px"
                }
            }
        });
    }

    setupGrid(){
        let gridSize = new Vector2D(33, 33);
        this.grid = new Grid(this.engine, new Vector2D(0, 0), gridSize);
        this.grid.setupWalls().clear();
        this.engine.centeralizeToCanvas(this.grid);
        this.grid.draw();
    }

    baseTraining() {
        while (this.getSnake().moves < 30) {
            this.trainingUpdate()
        }
    }

    trainingUpdate() {
        this.handleMotion();
    }

    start(){
        this.initPopulation();
        this.isRunning = true;
        this.baseTraining();
        this.engine.update(() => {
            if(this.isRunning)
                this.update();
        });
    }

    getSnake() {
        return this.population.actualSnake;
    }

    /**
     * @returns {Population}
     */
    initPopulation() {
        this.population = new Population(10);
    }

    snakeDie() {
        this.getSnake().die();
        this.population.getNextSnake();
        this.isRunning = false;
        this.restartGame();
    }

    restartGame() {
        this.grid.resetStatesWithout(['wall']);
        this.generateFood();
        this.grid.clear();
        this.grid.draw();
        this.movesWithoutGrow = 0;
        this.isRunning = true;
    }

    update(){
        this.handleMotion();
        this.redrawScene();
    }

    handleMotion(){
        let input = this.gameStats.getStatisticsArray();
        this.getSnake().decideDirection(input);
        this.getSnake().move();
        this.handleCollisions(this.getSnake(), this.grid, this.engine);
        this.movesWithoutGrow += 1;
        if (this.movesWithoutGrow > 300) {
            this.snakeDie();
        }

    }

    redrawScene() {
        this.grid.resetStatesWithout(['wall', 'food']);
        this.grid.clear();
        let snakeBodyArrayForGrid = this.getSnakeForGrid(this.getSnake());
        this.grid.setMultipleItemsState(snakeBodyArrayForGrid.reverse());
        this.grid.draw();
    }

    generateFood(){
        let randomItem = this.grid.getRandomItemWithout(['wall', 'head', 'body', 'food']);
        randomItem.setState(this.engine.getState('food'));
        this.foodItem = randomItem;
    }

    /**
     * @param {Snake} snake
     * @returns {Array.<GridSnakeInterface>}
     */
    getSnakeForGrid(snake) {
        let preparedGridSnake = [ new GridSnakeInterface(snake.head.position, this.engine.getState("head")) ];

        snake.getFullBody().forEach((value, index) => {
            if(index === 0) return;
            preparedGridSnake.push(new GridSnakeInterface(value.position, this.engine.getState("body")))
        });

       return preparedGridSnake;
    }

    handleCollisions(){
        let item = this.grid.getItem(this.getSnake().head.position);

        if(item.hasState('wall')){
            this.onWallCollision();
        }

        if(item.hasState('body')){
            this.onBodyCollision();
        }

        if(item.hasState('food')){
            this.onFoodCollision();
        }
    }

    onBodyCollision(){
        this.snakeDie();
    }

    onWallCollision(){
        this.snakeDie();
    }

    onFoodCollision(){
        this.getSnake().grow();
        this.generateFood();
        this.movesWithoutGrow = 0;
    }
}

module.exports = Game;