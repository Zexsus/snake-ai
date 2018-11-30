let expect = require("chai").expect;
let engine = require('./mock/mock-engine.js');
const Grid = require("../app/engine/Grid.js");
const Snake = require("../app/modules/Snake.js");
const GameStatistics = require('../app/modules/GameStatistics.js');
const directions = require('../app/modules/Directions.js');



describe('GameStatistics', function () {
    beforeEach(function(){
        snake = new Snake();
        snake.head.setPosition({x: 10, y: 10});
        snake.setDirection(directions.right);
        snake.move().move().move();
        grid = new Grid(engine, 32, 32);
        gameStats = new GameStatistics(snake, grid);
        wallDistance = gameStats.getDistancesToWall();
    });

    it('Calculate properly', function(){
        describe('Distance to wall calculations', function(){
            it('Right', function(){
                expect(wallDistance.right).to.be.equal(19);
            });

            it('Left distance', function(){
                expect(wallDistance.left).to.be.equal(13);
            });

            it('Up distance', function(){
                expect(wallDistance.up).to.be.equal(10);
            });

            it('Bottom distance', function(){
                expect(wallDistance.down).to.be.equal(22);
            });
        });

        describe('Distance to body calculations', function(){
            snake.setDirection(directions.down)
                .grow()
                .grow()
                .grow()
                .move().move().move()
                .setDirection(directions.left)
                .move();

            bodyDistance = gameStats.getDistancesToBody();


            // console.log(snake.head.position);
            // console.log(snake.getFullBody());
            // console.log(bodyDistance);
            // expect(bodyDistance.left).to.be.equal(0);
            // expect(bodyDistance.right).to.be.equal(0);
            // expect(bodyDistance.up).to.be.equal(0);
            // expect(bodyDistance.bottom).to.be.equal(0);

        });
    });
});


