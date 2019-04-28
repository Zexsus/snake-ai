module.exports = {
    // as Snake
    calcFitness: function () {
        let foodDistanceWhenDead = this.diePosition.getDistanceTo(this.foodPositionWhenDie);
        this.fitness = Math.floor((1 / foodDistanceWhenDead) * 30) + (this.bodySize - 3) * 30;
        // console.log(this);
    },
    snakeMaxNoFoodMoves: 200,
    mutationRate: 0.25,
    generationSize: 10,
    howManyBestSnakesStay: 0,
    // as Game
    isBaseTraining: true,
    trainingCondition: function () {
        return (this.population.generation.getBestSnake().bodySize < 6)
            && !(this.population.generation.number > 50);
    },
    neuralNetConfig: {
        layers: [
            {name: 'input', size: 6},
            {name: 'hiddenFirst', size: 4},
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