const GameObjectState = require("../engine/GameObjectState.js");
const Engine = require("../engine/Engine.js");
const Grid = require("../engine/Grid.js");
const config = require('./game-config.json');
const directions = require('./Directions.js');
const Snake = require('./Snake.js');

class Game {
    constructor(){
        this.isRunning = false;
       if(!this.gameAwaken) this.awake();
       this.start();
    }

    awake(){
        this.engine = new Engine({
            document: document,
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

        this.grid = new Grid(this.engine, 32, 32);
        this.grid.setupWalls().clear();
        this.engine.centeralize(this.grid, this.engine.canvas);
        this.generateFood();
        this.grid.draw();

        if(!this.gameAwaken){
            this.gameAwaken = true;
        }
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

    initSnake(){
        let snake = new Snake();
        snake.head.setPosition({x: 10, y: 10});
        snake.grow().grow().grow();
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
        let snakeBodyArrayForGrid = this.getSnakeBodyArrayForGrid(this.snake);
        this.grid.setMultipleItemsState(snakeBodyArrayForGrid.reverse());
        this.grid.draw();
    }

    generateFood(){
        let foodItem = this.grid.getRandomItemWithout(['wall', 'head', 'body', 'food']);
        foodItem.setState(this.engine.getState('food'));
    }

    getSnakeBodyArrayForGrid(snake) {
        let snakeBody = snake.getFullBody();
        let preparedGridSnake = [
            {
                position: {
                    x: snake.head.position.x,
                    y: snake.head.position.y
                },
                state: this.engine.getState('head')
            }
        ];


        snakeBody.forEach((value, index) => {
            if(index === 0) return;
            preparedGridSnake.push(
                {
                    position: {
                        x: value.position.x,
                        y: value.position.y
                    },
                    state: this.engine.getState('body')
                }
            )
        });
       return preparedGridSnake;
    }

    handleCollisions(){
        let item = this.grid.getItem(this.snake.head.position.y, this.snake.head.position.x);

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