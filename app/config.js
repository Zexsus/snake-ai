module.exports = {
    // as Snake
    calcFitness: function () {
        this.fitness = this.moves;
    },
    snakeMaxNoFoodMoves: 100,
    mutationRate: 0.3,
    generationSize: 10,
    // as Game
    trainingCondition: function () {
        // console.log(this.population.generation.getFitnessSum());
        return (this.population.fitnessSum < 800) && !(this.population.generation.number > 300)
    },
    neuralNetConfig: {
        layers: [
            {name: 'input', size: 4},
            {name: 'hiddenFirst', size: 8},
            // {name: 'hiddenSecond', size: 8},
            {name: 'output', size: 4},
        ],
        weights: [
            {'from': 'input', to: 'hiddenFirst'},
            // {'from': 'hiddenFirst', to: 'hiddenSecond'},
            {'from': 'hiddenFirst', to: 'output'},
        ],
        bias: 0,
    },
};