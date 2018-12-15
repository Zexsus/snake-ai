const GameObjectState = require("../engine/GameObjectState.js");
const Engine = require("../engine/Engine.js");
const Grid = require("../gameObjects/Grid.js");
const Vector2D = require("../engine/Vector2D.js");
const config = require('./game-config.json');
const directions = require('./Directions.js');
const Snake = require('./Snake.js');
const GridSnakeInterface = require('./GridSnakeInterface.js');


class Game {

    /**
     * @param {HTMLDocument} document
     */
    constructor(document){
       this.isRunning = false;
       this.document = document;

        /**
         * @type {GridItem}
         */
       this.foodItem = null;

       if(!this.gameAwaken) this.awake();
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
            fps: 30,
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
        let gridSize = new Vector2D(32, 32);
        this.grid = new Grid(this.engine, new Vector2D(0, 0), gridSize);
        this.grid.setupWalls().clear();
        this.engine.centeralize(this.grid, this.engine.canvas);
        this.grid.draw();
    }

    start(){
        this.snake = this.initSnake();
        this.isRunning = true;
        this.counter = 0;

        this.engine.update(() => {
            if(this.isRunning)
                this.update();
        });

    }

    /**
     * @returns {Snake}
     */
    initSnake(){
        let snake = new Snake();
        snake.head.setPosition(new Vector2D(10, 10));
        snake.grow().grow().grow().grow().grow().grow().grow()
            .grow().grow().grow().grow()
            .grow().grow().grow().grow()
            .grow().grow().grow().grow()
            .grow().grow().grow().grow()
            .grow().grow().grow().grow()
            .grow().grow().grow().grow()
            .grow().grow().grow().grow()
            .grow().grow().grow().grow().grow().grow().grow().grow();
        snake.setDirection(directions.right);

        return snake;
    }

    over(){
        this.isRunning = false;
        this.restart();
    }

    restart(){
        this.snake = this.initSnake();
        this.grid.resetStatesWithout(['wall']);
        this.generateFood();
        this.grid.clear();
        this.grid.draw();
        this.isRunning = true;
    }

    update(){
        if(this.counter >= this.engine.loop.fps / 3){
            this.updatePerFrame(this.snake);
            this.counter = 0;
        }
        this.counter++;
    }

    updatePerFrame() {
        this.handleMotion();
        this.resetScene();
        this.drawScene();
    }

    handleMotion(){
        this.snake.move();
        this.handleCollisions(this.snake, this.grid, this.engine);
    }

    resetScene(){
        this.grid.resetStatesWithout(['wall', 'food']);
        this.grid.clear();
    }

    drawScene(){
        let snakeBodyArrayForGrid = this.getSnakeForGrid(this.snake);
        this.grid.setMultipleItemsState(snakeBodyArrayForGrid.reverse());
        this.grid.draw();
    }

    generateFood(){
        let foodItem = this.grid.getRandomItemWithout(['wall', 'head', 'body', 'food']);
        foodItem.setState(this.engine.getState('food'));
        this.foodItem = foodItem;
    }

    /**
     *
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
        let vector = new Vector2D(this.snake.head.position.x, this.snake.head.position.y);
        let item = this.grid.getItem(vector);

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
        this.over();
    }

    onWallCollision(){
        this.over();
    }

    onFoodCollision(){
        this.snake.grow();
        this.generateFood();
    }
}



module.exports = Game;