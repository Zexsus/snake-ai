const Snake = require("../Snake/Snake.js");
const Vector2D = require("../Engine/Vector2D.js");
const config = require("../config.js");
const clone = require('lodash.clonedeep');

/**
 * Contains all snakes and provides data about them
 * @param {Vector2D size}
 */
class Generation {
    constructor(size) {
        this.size = size;
        this.number = 1;
        this.setSnakes(this.getNewSnakes());
    }

    getNewSnakes() {
        let newSnakes = [];
        for (let index = 0; index < this.size; index++) {
            newSnakes.push(new Snake(index));
        }
        return newSnakes;
    }

    setSnakes(snakes) {
        this.snakes = snakes;
        this.actualSnakeIndex = 0;
        this.actualSnake = this.snakes[this.actualSnakeIndex];
        this.setupSnakesInitState(snakes);
        this.chosenSnakeBefore = null;
    }

    /**
     * @param {function(Snake, number)} callback
     */
    foreachSnake(callback) {
        this.snakes.forEach(callback);
    };

    setupSnakesInitState(snakes) {
        snakes.forEach((snake, index) => {
            snake.id = index;
            snake.head.setPosition(new Vector2D(16, 16));
            snake.grow().grow().grow();
        });
    }

    getNextSnake() {
        this.actualSnakeIndex += 1;
        this.actualSnake = this.snakes[this.actualSnakeIndex];
        return this.actualSnake;
    }

    getBestSnake() {
        let max = 0;
        let bestSnake = null;
        this.snakes.forEach(snake => {
            if (snake.fitness >= max) {
                max = snake.fitness;
                bestSnake = snake;
            }
        });
        return bestSnake;
    }

    getBestSnakes() {
        let getSnakesSorted = this.snakes.sort((a, b) => {
            return b.fitness - a.fitness
        });
        return getSnakesSorted.slice(0, this.size * config.howManyBestSnakesStay);
    }

    getMaxFitness() {
        return this.getBestSnake().fitness;
    }

    calcFitnesses(snakes) {
        if (typeof snakes === 'undefined') {
            snakes = this.snakes;
        }
        snakes.forEach(snake => snake.calcFitness());
    }

    getFitnessSum(snakes) {
        let sum = 0;
        if (snakes === undefined) {
            snakes = this.snakes;
        }
        snakes.forEach((snake) => {
            sum += snake.fitness;
        });
        return sum;
    }

    /**
     * Returns random snake, it cannot be the same snake twice in row
     * @return {Snake}
     */
    getRandomSnake() {
        let snakes = this.getSnakesFitnesses();
        // If chosenSnakeBefore is set, remove it from array
        if (this.chosenSnakeBefore !== null) {
            for (let index = 0; index < snakes.length; index++) {
                if (this.chosenSnakeBefore === this.snakes[index].id) {
                    snakes.splice(index, 1);
                }
            }
        }

        let randomValue = Math.random() * this.getFitnessSum(snakes);
        let runningSum = 0;
        let chosenSnake = null;

        snakes.forEach((snake, index) => {
            if (chosenSnake === null) {
                runningSum += snake.fitness;
                if (runningSum >= randomValue) {
                    chosenSnake = clone(this.getSnakeById(snake.id));
                    this.chosenSnakeBefore = snake.id;
                }
            }
        });

        return chosenSnake;
    }

    isDead() {
        let isDead = true;
        this.foreachSnake((snake) => {
            if (isDead && snake.alive) {
                isDead = false;
            }
        });

        return isDead;
    }

    getAverageFitness() {
        return this.getFitnessSum() / this.size;
    }

    getSnakesFitnesses() {
        const fitnesses = [];
        this.snakes.forEach((snake, index) => {
            fitnesses.push({
                id: snake.id,
                fitness: snake.fitness
            });
        });
        return fitnesses;
    }

    getSnakeById(id) {
        for (let index = 0; index < this.snakes.length; index++) {
            let snake = this.snakes[index];
            if (snake.id === id) {
                return snake;
            }
        }
        throw 'There is no snake with id: ' + id;
    }
}

module.exports = Generation;