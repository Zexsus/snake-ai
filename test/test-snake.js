var expect = require("chai").expect;
const Snake = require('../app/modules/Snake.js');
const directions = require('../app/modules/Directions.js');

describe('Snake', function(){
    let snake = null;

    beforeEach(function(){
        snake = new Snake();
        snake.setDirection(directions.right);
        snake.head.setPosition({x: 0, y: 0});
        snake
            .grow()
            .grow()
            .grow()
            .move()
            .move()
            .move();

        fullBody = snake.getFullBody();
    });

    describe('Body parts from getFullBody()', function(){
        it('Have different positions after move', function(){
            expect(fullBody[0].position).to.be.not.eql(fullBody[1].position);
        });

        it('Have size 4 after 3 times grow', function(){
           expect(fullBody.length).to.be.equal(4);
        });
    })
});