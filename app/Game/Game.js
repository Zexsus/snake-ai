const gameObjectStates = require("../Engine/GameObjectStates.js");
const Engine = require("../Engine/Engine.js");
const Grid = require("./GameObjects/Grid.js");
const Vector2D = require("../Engine/Vector2D.js");
const gameConfig = require('./game-config.json');
const config = require('../config.js');
const GridSnakeInterface = require('../Snake/GridSnakeInterface.js');
const Population = require('../Brain/Population.js');
const GameState = require('../Statistics/GameState.js');
const FoodGenerator = require('./FoodGenerator.js');


class Game {

    /**
     * @param {HTMLDocument} document
     */
    constructor(document){
        this.isRunning = false;
        this.document = document;
        this.gameStats = new GameState(this);
        this.foodItem = null;
        this.movesWithoutGrow = 0;
        if (!this.gameAwaken) this.awake();
        this.isStillTraining = config.trainingCondition;
    }

    awake(){
        this.setupEngine();
        this.setupGrid();
        this.setupFoodGenerator();
        this.generateFood();
        this.initPopulation();

        if(!this.gameAwaken){
            this.gameAwaken = true;
        }
    }

    setupEngine(){
        this.engine = new Engine({
            document: this.document,
            containerSelector: 'engine',
            fps: 60,
            states: gameObjectStates,
            canvasSettings: {
                width: gameConfig.canvas.width,
                height: gameConfig.canvas.height,
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

    setupFoodGenerator() {
        this.foodGenerator = new FoodGenerator(this.engine.getState('food'));
        this.foodGenerator.setGrid(this.grid);
    }

    baseTraining() {
        while (this.isStillTraining()) {
            this.trainingUpdate()
        }
    }

    trainingUpdate() {
        this.handleMotion();
    }

    start(){
        this.isRunning = true;
        // this.baseTraining();
        this.onBaseLearningEnd();
        this.engine.update(() => {
            if(this.isRunning)
                this.update();
        });
    }

    getSnake() {
        return this.population.generation.actualSnake;
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
        this.foodGenerator.foodCount = 0;
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
        let input = this.gameStats.getStatisticsArray(this.getSnake().direction);
        this.getSnake().decideDirection(input);
        this.getSnake().move();
        this.handleCollisions(this.getSnake(), this.grid, this.engine);
        this.movesWithoutGrow += 1;
        if (this.movesWithoutGrow > config.snakeMaxNoFoodMoves) {
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
        this.grid.resetStatesWithout(['wall']);
        this.foodItem = this.foodGenerator.getFoodItem();
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

        if (item.getState().isCollidable()) {
            this.snakeDie()
        }

        if(item.hasState('food')){
            this.onFoodCollision();
        }
    }

    onFoodCollision(){
        this.getSnake().grow();
        this.generateFood();
        this.movesWithoutGrow = 0;
    }

    onBaseLearningEnd() {
    }

    isStillTraining() {
    }
}

module.exports = Game;