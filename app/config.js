module.exports = {
    // as Snake
    calcFitness: function () {
        this.fitness = (this.moves) * (this.bodySize - 2) ** 2;
    },
    snakeMaxNoFoodMoves: 200,
    mutationRate: 0.2,
    generationSize: 12,
    howManyBestSnakesStay: 0.3,
    // as Game
    trainingCondition: function () {
        // console.log(this.population.generation.getFitnessSum());
        return (
            this.population.generation.getBestSnake().bodySize < 6)
            && !(this.population.generation.number > 1
            );
    },
    neuralNetConfig: {
        layers: [
            {name: 'input', size: 6},
            {name: 'hiddenFirst', size: 8},
            {name: 'output', size: 3},
        ],
        weights: [
            {'from': 'input', to: 'hiddenFirst'},
            // {'from': 'hiddenFirst', to: 'hiddenSecond'},
            {'from': 'hiddenFirst', to: 'output'},
        ],
        bias: 0,
    },
};