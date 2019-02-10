var expect = require("chai").expect;
const Generation = require('../app/Brain/Generation.js');
const Snake = require("../app/Snake/Snake.js");
let generation = null;

describe('Generation', function () {
    beforeEach(() => {
        generation = new Generation(10);
    });

    it('Create set of snakes', () => {
        expect(generation.snakes.length).to.be.equal(10);
        expect(generation.actualSnake instanceof Snake).to.be.equal(true);
        generation.foreachSnake((snake) => {
            expect(snake.head.position).to.be.eql({x: 16, y: 16});
            expect(snake.bodySize).to.be.equal(3);
        });
    });

    it('Iterates through all snakes', () => {
        generation.foreachSnake((snake) => {
            snake.setDirection({x: 1, y: 0});
        });

        generation.snakes.forEach((snake) => {
            expect(snake.direction).to.be.eql({x: 1, y: 0});
        });
    });

    it('Setups snakes init state', () => {
        generation.foreachSnake((snake) => {
            expect(snake.head.position).to.be.eql({x: 16, y: 16});
            expect(snake.bodySize).to.be.equal(3);
        });
    });

    it('Returns next not dead snake', () => {
        let snake = generation.getNextSnake();
        expect(generation.actualSnakeIndex).to.be.equal(1);
        expect(snake).to.be.not.eql(generation.snakes[0]);
    });

    it('Returns best snake', () => {
        generation.foreachSnake((snake, index) => {
            snake.moves = index;
            snake.calcFitness();
        });

        let bestSnake = generation.getBestSnake();
        expect(bestSnake.moves).to.be.equal(9);
    });

    it('Returns max fitness', () => {
        generation.foreachSnake((snake, index) => {
            snake.fitness = index * 10;
        });
        let maxFitness = generation.getMaxFitness();
        expect(maxFitness).to.be.equal(90);
    });

    it('Returns fitness sum', () => {
        let sum = 0;
        generation.foreachSnake((snake, index) => {
            snake.fitness = index * 10;
            sum += snake.fitness;
        });
        expect(generation.getFitnessSum(generation.snakes)).to.be.equal(sum);
    });

    it('Returns random snake', () => {
        generation.foreachSnake((snake, index) => {
            snake.fitness = index * 10;
        });
        let randomSnake1 = null;
        let randomSnake2 = null;
        for (let i = 0; i < 10; i++) {
            randomSnake1 = generation.getRandomSnake();
            randomSnake2 = generation.getRandomSnake();
            expect(randomSnake1).to.not.be.eql(randomSnake2);
        }
        expect(randomSnake1 instanceof Snake).to.be.equal(true);
        expect(randomSnake2 instanceof Snake).to.be.equal(true);
    });

    it('Returns is generation dead', () => {
        generation.foreachSnake((snake, index) => {
            snake.fitness = index * 10;
        });

        expect(generation.isDead()).to.be.equal(false);

        generation.foreachSnake((snake, index) => {
            snake.die();
        });

        expect(generation.isDead()).to.be.equal(true);
    });

    it('Calc fitnesses', () => {
        generation.calcFitnesses();
        generation.foreachSnake(snake => {
            expect(typeof snake.fitness).to.be.equal('number');
        });
    })
});
