const Generation = require("./Generation.js");

class Population {
    /**
     * @param {Number} size
     */
    constructor(size) {
        this.mutationRate = 0.1;
        this.generation = new Generation(size);
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
        console.log(this.getPopulationData());
        this.naturalSelection();
        this.generation.number += 1;
    }

    naturalSelection() {
        let newSnakes = [];
        newSnakes.push(this.generation.getBestSnake().clone());
        for (let i = 0; i < this.generation.size - 1; i++) {
            let parent1 = this.generation.getRandomSnake();
            let parent2 = this.generation.getRandomSnake();
            if (parent1.id === parent2.id) {
                throw new Error('Two random snake in row are the same');
            }
            // console.log(i+' Crossover over:', parent1.fitness, parent2.fitness);
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
            name: 'Population log',
            fitnesses,
            fitnessSum: this.generation.getFitnessSum(),
            bestSnakeScore: this.generation.getBestSnake().moves,
            populationBestScore: this.currentBestScore,
            generation: this.generation,
            bestSnakeBrain: this.generation.getBestSnake().brain,
        };
    }
}

module.exports = Population;