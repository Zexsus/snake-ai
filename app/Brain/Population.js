const Snake = require("../Snake/Snake.js");
const Vector2D = require("../Engine/Vector2D.js");
const directions = require('../Game/Directions.js');

class Population {
    /**
     * @param {Number} size
     */
    constructor(size) {
        this.snakes = Population.getInitSnakes(size);
        this.size = size;
        this.mutationRate = 0.2;
        this.generation = 1;
        this.setupSnakesStartState();
        this.actualSnakeIndex = 0;
        this.actualSnake = this.snakes[this.actualSnakeIndex];
        this.currentBestScore = 0;
    }

    setupSnakesStartState() {
        this.snakes.forEach(snake => {
            snake.head.setPosition(new Vector2D(16, 16));
            snake.grow().grow().grow();
            snake.setDirection(directions.right);
        });
    }

    getNextSnake() {
        if (this.actualSnakeIndex < this.snakes.length - 1) {
            this.actualSnakeIndex += 1;
        } else {
            this.endPopulation();
        }

        this.actualSnake = this.snakes[this.actualSnakeIndex];
    }

    /**
     * @returns {Snake}
     */
    endPopulation() {
        let fitnessSum = 0;
        this.snakes.forEach((snake, index) => {
            snake.calcFitness();
            console.clear();
            console.log({
                'snake': index,
                'bodySize': snake.bodySize,
                'moves': snake.moves,
                'fitness': snake.fitness
            });
            fitnessSum += snake.fitness;
        });
        this.naturalSelection(fitnessSum);
        this.generation += 1;
        this.currentBestScore = (this.currentBestScore < this.bestSnake.moves) ? this.bestSnake.moves : this.currentBestScore;
        this.actualSnake = 0;
        this.actualSnakeIndex = 0;
        this.setupSnakesStartState();
        console.log(this.getPopulationData());

    }

    naturalSelection(fitnessSum) {
        let newSnakes = [];
        this.setBestSnakeAndMaxFitness();
        newSnakes.push(this.bestSnake.clone());

        for (let i = 0; i < this.size - 1; i++) {
            let parent1 = this.selectRandomSnake(fitnessSum);
            let parent2 = this.selectRandomSnake(fitnessSum);
            let child = parent1.crossover(parent2);
            child.mutate(this.mutationRate);
            newSnakes.push(child);
        }

        this.snakes = newSnakes;
    }

    setBestSnakeAndMaxFitness() {
        let max = 0;
        let bestSnake = null;
        this.snakes.forEach(snake => {
            if (snake.fitness > max) {
                max = snake.fitness;
                bestSnake = snake;
            }
        });
        this.bestFitness = max;
        this.bestSnake = bestSnake;
    }

    /**
     * @param fitnessSum
     * @returns {Snake}
     */
    selectRandomSnake(fitnessSum) {
        let runningFitness = 0;
        let randomValue = Math.random() * fitnessSum;
        let chosenSnake = null;
        this.snakes.forEach((snake) => {
            runningFitness += snake.fitness;
            if (runningFitness >= randomValue && chosenSnake === null) {
                chosenSnake = snake;
            }
        });

        return chosenSnake;
    }

    /**
     * @param {Number} size
     * @returns {Array.<Snake>}
     */
    static getInitSnakes(size) {
        let snakes = [];
        for (let i = 0; i < size; i++) {
            let snake = new Snake();
            snakes.push(snake);

        }
        return snakes;
    }

    getPopulationData() {
        return {
            name: 'Population log',
            bestSnakeBrain: this.bestSnake.brain,
            bestScore: this.currentBestScore,
            snakes: this.snakes,
            generation: this.generation,
        };
    }
}

module.exports = Population;