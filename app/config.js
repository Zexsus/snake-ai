module.exports = {
    // as Snake
    calcFitness: function () {
        let foodDistanceWhenDead = this.diePosition.getDistanceTo(this.foodPositionWhenDie);
        this.fitness = Math.floor((1 / foodDistanceWhenDead) * 40) + (this.bodySize - 3) * 40;
    },
    snakeMaxNoFoodMoves: 130,
    mutationRate: 0.2,
    generationSize: 16,
    howManyBestSnakesStay: 0,
    // as Game
    isBaseTraining: false,
    trainingCondition: function () {
        return (this.population.generation.getBestSnake().bodySize < 20)
            && !(this.population.generation.number > 50);
    },
    neuralNetConfig: {
        layers: [
            {name: 'input', size: 6},
            {name: 'hiddenFirst', size: 6},
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