const Generation = require("./Generation.js");
const config = require("../config.js");

class Population {
    /**
     * @param {Number} size
     */
    constructor(size) {
        this.mutationRate = config.mutationRate;
        this.generation = new Generation(config.generationSize);
        this.fitnessSum = 0;
        this.currentBestScore = 0;
    }

    getNextSnake() {
        if (this.generation.isDead()) {
            this.endPopulation();
            return this.generation.actualSnake;
        }
        return this.generation.getNextSnake();
    }

    endPopulation() {
        this.generation.calcFitnesses();
        this.currentBestScore = this.generation.getBestSnake().moves;
        this.onPopulationEnd(this);
        this.fitnessSum = this.generation.getFitnessSum();
        if (this.generation.number % 10 === 0) {
            console.clear();
        }
        console.log(this.getPopulationData());
        this.naturalSelection();
        this.generation.number += 1;
    }

    naturalSelection() {
        let newSnakes = [];
        let bestSnakes = this.generation.getBestSnakes();
        bestSnakes.forEach((snake) => {
            newSnakes.push(snake.clone());
        });
        for (let i = 0; i < this.generation.size - this.generation.size * config.howManyBestSnakesStay; i++) {
            let parent1 = this.generation.getRandomSnake();
            let parent2 = this.generation.getRandomSnake();
            if (parent1.id === parent2.id) {
                throw new Error('Two random snake in row are the same');
            }
            let child = parent1.crossover(parent2);
            child.mutate(this.mutationRate);
            newSnakes.push(child);
        }
        this.generation.setSnakes(newSnakes);
    }

    getPopulationData() {
        let fitnesses = [];
        this.generation.foreachSnake((snake) => {
            fitnesses.push(snake.fitness);
        });
        return {
            // name: 'Population log',
            fitnesses,
            fitnessSum: this.generation.getFitnessSum(),
            // bestSnakeScore: this.generation.getBestSnake().moves,
            populationBestScore: this.currentBestScore,
            bestSnakes: this.generation.getBestSnakes(),
            generation: this.generation.number,
            // bestSnakeBrain: this.generation.getBestSnake().brain,
        };
    }

    onPopulationEnd(population) {
    }
}

module.exports = Population;