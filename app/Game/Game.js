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
const EventEmitter = require('eventemitter3');


class Game extends EventEmitter {

    /**
     * @param {HTMLDocument} document
     */
    constructor(document){
        super();
        this.isRunning = false;
        this.document = document;
        this.gameStats = new GameState(this);
        this.foodItem = null;
        this.isBaseTraining = config.isBaseTraining;
        this.fastLearning = false;
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
        this.foodGenerator = new FoodGenerator(this.engine.getState('food'), this.grid, [
            {
                x: 26,
                y: 6,
            },
            {
                x: 26,
                y: 26,
            },
            {
                x: 6,
                y: 26,
            },
            {
                x: 6,
                y: 6,
            },
            {
                x: 16,
                y: 16,
            },
            {
                x: 26,
                y: 26,
            },
            {
                x: 6,
                y: 6,
            },
            {
                x: 26,
                y: 6,
            },
        ]);
    }

    baseTraining() {
        this.fastLearning = true;
        while (this.isStillTraining()) {
            this.trainingUpdate()
        }
        this.fastLearning = false;
    }

    trainingUpdate() {
        this.handleMotion();
        this.resetScene();
    }

    start(){
        this.isRunning = true;
        if (this.isBaseTraining) {
            this.baseTraining();
            this.emit('onBaseLearningEnd', this);
        }
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
        this.getSnake().die(this.foodItem.getPositionInGrid());
        this.emit("snakeDie", this.getSnake());
        this.population.getNextSnake();
        this.isRunning = false;
        this.restartGame();
    }

    restartGame() {
        this.grid.resetStatesWithout(['wall']);
        this.foodGenerator.reset();
        this.generateFood();
        this.redrawScene();
        this.movesWithoutGrow = 0;
        this.isRunning = true;
    }

    update(){
        this.handleMotion();
        this.resetScene();
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
        if (!this.fastLearning) {
            this.grid.clear();
            this.grid.draw();
        }
    }

    resetScene() {
        this.grid.resetStatesWithout(['wall', 'food']);
        let snakeBodyArrayForGrid = this.getSnakeForGrid(this.getSnake());
        this.grid.setMultipleItemsState(snakeBodyArrayForGrid.reverse());
    }

    generateFood(){
        this.grid.resetStatesWithout(['wall']);
        this.foodItem = this.foodGenerator.getNewFoodItem();
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

    isStillTraining() {
    }

    skipGenerations(number) {
        this.startGenerationNumber = this.population.generation.number;
        this.fastLearning = true;
        while (this.population.generation.number < this.startGenerationNumber + number && this.getSnake().bodySize < 40) {
            this.trainingUpdate()
        }
        this.fastLearning = false;
        this.emit('fastLearningEnd', this);
    }
}

module.exports = Game;