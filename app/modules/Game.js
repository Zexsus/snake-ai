const GameObjectState = require("../engine/GameObjectState.js");
const Engine = require("../engine/Engine.js");
const Grid = require("../engine/Grid.js");
const config = require('./game-config.json');
const directions = require('./Directions.js');
const Snake = require('./Snake.js');

class Game {
    constructor(){
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
        this.grid.draw();

        if(!this.gameAwaken){
            this.gameAwaken = true;
        }
    }

    start(){
        this.snake = this.initSnake();
        this.counter = 0;

        this.engine.update(() => {
            this.update();
        });
    }

    over(){
        debugger;
        reset();
    }

    restart(){
        initFunction();
        delete this.snake;
        grid.clear();
    }

    initSnake(){
        let snake = new Snake();
        snake.head.setPosition({x: 10, y: 10});
        snake.setDirection(directions.right);
        return snake;
    }



    update(){
        if(this.counter >= this.engine.loop.fps / 3){
            this.updatePerFrame(this.snake);
            this.counter = 0;
        }
        this.counter++;
    }

    updatePerFrame(){
        this.snake.move();
        this.handleCollisions(this.snake, this.grid, this.engine);
        let headRect = this.grid.getItem(this.snake.head.position.y, this.snake.head.position.x);
        headRect.state = this.engine.getState('head');
        this.grid.clear();
        this.grid.draw();
    }

    handleCollisions(){
        let item = this.grid.getItem(this.snake.head.position.y, this.snake.head.position.x);
        console.log(item.state, item.position, this.snake.head.position,item.position == this.snake.head.position );
        if(item.state === this.engine.getState('wall')){
            onWallCollision();
        }
    }

    onWallCollision(){
        this.over();
    }
}



module.exports = Game;