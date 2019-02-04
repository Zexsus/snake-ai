var expect = require("chai").expect;
// const Matrix = require('../app/Brain/Matrix.js');
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

    it('Has randomized weights', () => {
        neuralNet.forEachWeights((matrix) => {
            expect(matrix.get(0, 0)).is.not.equal(null);
            matrix.foreach((number) => {
                expect(number).is.not.equal(null);
            });
        });
    });

    it('Clones', () => {
        let clone = neuralNet.clone();
        expect(neuralNet).to.be.eql(clone);
    });
});
