const Snake = require("../Snake/Snake.js");
const Vector2D = require("../Engine/Vector2D.js");
const clone = require('lodash.clonedeep');

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
            if (snake.fitness > max) {
                max = snake.fitness;
                bestSnake = snake;
            }
        });
        return bestSnake;
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
     */
    getRandomSnake() {
        let snakes = clone(this.snakes);
        // If chosenSnakeBefore is set, remove it from array
        if (this.chosenSnakeBefore !== null) {
            for (let index = 0; index < snakes.length; index++) {
                if (this.chosenSnakeBefore === this.snakes[index].id) {
                    snakes.splice(index, 1);
                    // console.log("Removed snake id", this.chosenSnakeBefore)
                }
            }
        }

        let randomValue = Math.random() * this.getFitnessSum(snakes);
        let runningSum = 0;
        let chosenSnake = null;

        snakes.forEach((snake, index) => {
            runningSum += snake.fitness;
            if (runningSum >= randomValue && chosenSnake === null) {
                chosenSnake = snake;
                this.chosenSnakeBefore = snake.id;
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
}

module.exports = Generation;