var expect = require("chai").expect;
const Matrix = require('../app/Brain/Matrix.js');
const NeuralNet = require('../app/Brain/NeuralNet.js');

let neuralNet = null;

describe('NeuralNet', function () {
    beforeEach(() => {
        neuralNet = new NeuralNet({
            layers: [
                {name: 'input', size: 12},
                {name: 'hiddenFirst', size: 16},
                {name: 'hiddenSecond', size: 16},
                {name: 'output', size: 4},
            ],
            weights: [
                {'from': 'input', to: 'hiddenFirst'},
                {'from': 'hiddenFirst', to: 'hiddenSecond'},
                {'from': 'hiddenSecond', to: 'output'},
            ],
            bias: 0,

        });
    });

    describe('Weights', function () {
        it('Has proper size after init', () => {
            neuralNet.forEachWeights((matrix, weight) => {
                let layer1 = neuralNet.getLayer(weight['from']);
                let layer2 = neuralNet.getLayer(weight.to);

                expect(weight.matrix.size).to.be.eql({
                    x: layer2.size,
                    y: layer1.size,
                });
            });
        });

        it('Has randomized values between -1 and 1', () => {
            neuralNet.forEachWeights((matrix) => {
                expect(matrix.get(0, 0)).is.not.equal(null);
                matrix.foreach((number) => {
                    expect(number).is.not.equal(null);
                    expect(number).to.be.within(-1, 1);
                });
            });
        });
    });

    it('Iterates through all weights by forEachWeights', () => {
        neuralNet.forEachWeights((matrix) => {
            matrix.setForeach(() => {
                return 3;
            });
        });

        neuralNet.weights.forEach((item) => {
            item.matrix.foreach((number) => {
                expect(number).to.be.equal(3);
            });
        });
    });

    it('Calculate output', () => {
        let input = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        let output = neuralNet.output(input);

        expect(output instanceof Matrix).to.be.equal(true);
        expect(output.size).to.be.eql({x: 1, y: 4});
        output.foreach((value) => {
            expect(value).to.be.within(-1, 1);
        })
    });

    it('Crossover', () => {
        neuralNet2 = new NeuralNet({
            layers: [
                {name: 'input', size: 12},
                {name: 'hiddenFirst', size: 16},
                {name: 'hiddenSecond', size: 16},
                {name: 'output', size: 4},
            ],
            weights: [
                {'from': 'input', to: 'hiddenFirst'},
                {'from': 'hiddenFirst', to: 'hiddenSecond'},
                {'from': 'hiddenSecond', to: 'output'},
            ],
            bias: 0,
        });

        let child = neuralNet.crossover(neuralNet2);

        expect(child.weights).to.not.be.eql(neuralNet.weights);
        expect(child.weights).to.not.be.eql(neuralNet2.weights);
    });

    it('Clones', () => {
        let clone = neuralNet.clone();
        expect(neuralNet).to.be.eql(clone);
        clone.weights[0].matrix.matrix[0][0] = 15;
        expect(clone.weights[0].matrix.matrix[0][0]).to.be.equal(15);
        expect(neuralNet.weights[0].matrix.matrix[0][0]).to.not.be.equal(15);
    });
});
