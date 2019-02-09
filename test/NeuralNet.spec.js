var expect = require("chai").expect;
const Matrix = require('../app/Brain/Matrix.js');
const NeuralNet = require('../app/Brain/NeuralNet.js');

let neuralNet = new NeuralNet(0, 0, 0);

describe('NeuralNet', function () {
    beforeEach(() => {
        neuralNet = new NeuralNet(12, 16, 4);
    });

    it('Has proper sizes', () => {
        expect(neuralNet.size.inputs).to.be.equal(12);
        expect(neuralNet.size.hidden).to.be.equal(16);
        expect(neuralNet.size.output).to.be.equal(4);
    });

    describe('Weights', function () {
        it('Has proper sizes after constructor', function () {
            expect(neuralNet.weights.hiddenToInput.size).to.be.eql({x: 16, y: 12});
            expect(neuralNet.weights.hiddenToHidden.size).to.be.eql({x: 16, y: 16});
            expect(neuralNet.weights.outputToHidden.size).to.be.eql({x: 4, y: 16});
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
            matrix.setForeach((number) => {
                return 3;
            });
        });

        for (let key in neuralNet.weights) {
            let item = neuralNet.weights[key];
            item.foreach((number) => {
                expect(number).to.be.equal(3);
            });
        }
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

    it('Clones', () => {
        let clone = neuralNet.clone();
        expect(neuralNet).to.be.eql(clone);
    });
});
