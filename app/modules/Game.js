const GameObjectState = require("../engine/GameObjectState.js");
const Engine = require("../engine/Engine.js");
const Grid = require("../engine/Grid.js");
const config = require('./game-config.json');
const directions = require('./Directions.js');
const Snake = require('./Snake.js');

exports.init = function () {
    let engine = new Engine({
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
    let grid = new Grid(engine, 32, 32);
    grid.setupWalls();
    grid.clear();
    engine.centeralize(grid, engine.canvas);
    grid.draw();

    let snake = new Snake();
    snake.setDirection(directions.right);
    initUserInput(snake);

    let counter = 0;

    // operation per second
    engine.update(function(){
        if(counter >= engine.loop.fps / 3){
            perFrameAction();
            counter = 0;
        }
        counter++;
    });

    var perFrameAction = function(){
        snake.move();
        let headRect = grid.getItem(snake.head.position.y, snake.head.position.x);
        headRect.state = engine.getState('head');

        grid.clear();
        grid.draw();
    }

    engine.update(function () {

    });
};

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