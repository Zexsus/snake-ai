const Matrix = require('./Matrix.js');
const Vector2D = require('../Engine/Vector2D.js');

class NeuralNet {
    /**
     * @param {Number} inputs
     * @param {Number} hidden
     * @param {Number} output
     */
    constructor(inputs, hidden, output) {
        this.size = {inputs, hidden, output};
        this.lastValues = null;
        this.bias = 0;
        this.differences = [];

        // Create weights with bias
        this.weights = {
            hiddenToInput: new Matrix(new Vector2D(this.size.hidden, this.size.inputs)),
            hiddenToHidden: new Matrix(new Vector2D(this.size.hidden, this.size.hidden)),
            outputToHidden: new Matrix(new Vector2D(this.size.output, this.size.hidden)),
        };

        this.randomizeWeights();
    }

    randomizeWeights() {
        this.forEachWeights((item) => {
            item.randomize();
        });
        return this;
    }

    /**
     * @param {function(Matrix, String)} callback
     * @returns {NeuralNet}
     */
    forEachWeights(callback) {
        for (let key in this.weights) {
            let item = this.weights[key];
            callback(item, key)
        }
        return this;
    }

    /**
     * @param {Array<Number>} inputsArray
     * @returns {Matrix}
     */
    output(inputsArray) {
        //convert array to matrix
        let inputsNeurons = Matrix.getSingleColumnMatrixFromArray(inputsArray);

        let hiddenNeurons = this.weights.hiddenToInput.getDotsMatrix(inputsNeurons, this.bias);
        let hiddenNeuronsActivated = hiddenNeurons.getActivated();

        let secHiddenNeurons = this.weights.hiddenToHidden.getDotsMatrix(hiddenNeuronsActivated, this.bias);
        let secHiddenNeuronsActivated = secHiddenNeurons.getActivated();

        let outputNeurons = this.weights.outputToHidden.getDotsMatrix(secHiddenNeuronsActivated, this.bias);
        return outputNeurons.getActivated();
    }

    /**
     * @param {Number} rate
     * @returns {NeuralNet}
     */
    mutate(rate) {
        this.forEachWeights(item => item.mutate(rate));
        return this;
    }

    /**
     * @param {NeuralNet} partner
     * @returns {NeuralNet}
     */
    crossover(partner) {
        let child = new NeuralNet(this.size.inputs, this.size.hidden, this.size.output);
        child.weights.hiddenToInput = this.weights.hiddenToInput.crossover(partner.weights.hiddenToInput);
        child.weights.hiddenToHidden = this.weights.hiddenToHidden.crossover(partner.weights.hiddenToHidden);
        child.weights.outputToHidden = this.weights.outputToHidden.crossover(partner.weights.outputToHidden);
        return child;
    }

    clone() {
        let clone = new NeuralNet(this.size.inputs, this.size.hidden, this.size.output);
        this.forEachWeights((item, key) => {
            clone.weights[key] = item;
        });
        return clone;
    }
}

module.exports = NeuralNet;