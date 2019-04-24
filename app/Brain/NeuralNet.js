const Matrix = require('./Matrix.js');
const Vector2D = require('../Engine/Vector2D.js');
const clone = require('lodash.clonedeep');

class NeuralNet {
    /**
     * @param {Object} args
     * @param {number} args.bias
     * @param {Array<Object>} args.layers
     * @param {Array<Object>} args.weights
     */
    constructor(args) {
        this.layers = args.layers;
        this.bias = args.bias;
        this.weights = clone(args.weights);
        if (args.weights.length > 0 && typeof args.weights[0].matrix === "undefined") {
            this.setupWeightsMatrixes();
            this.randomizeWeights();
        }
    }

    getLayer(name) {
        for (let index = 0; index < this.layers.length; index++) {
            let layer = this.layers[index];
            if (layer.name === name) return layer;
        }
    }

    getLastLayer() {
        return this.layers[this.layers.length - 1];
    }

    setupWeightsMatrixes() {
        this.weights.forEach((item, index) => {
            let layers = [this.getLayer(item['from']), this.getLayer(item['to'])];
            let size = new Vector2D(layers[1].size, layers[0].size);
            this.weights[index].matrix = new Matrix(size);
        });
    }

    randomizeWeights() {
        this.forEachWeights((matrix) => {
            matrix.randomize();
        });
        return this;
    }

    /**
     * @param {function(Matrix, Object, String)} callback
     * @returns {NeuralNet}
     */
    forEachWeights(callback) {
        for (let index = 0; index < this.weights.length; index++) {
            let weight = this.weights[index];
            callback(weight.matrix, weight, index);
        }
        return this;
    }

    /**
     * @param {Array<Number>} inputsArray
     * @returns {Matrix}
     */
    output(inputsArray) {
        let inputsNeurons = Matrix.getSingleColumnMatrixFromArray(inputsArray);
        this.layers[0].values = inputsNeurons;

        for (let i = 0; i < this.weights.length; i++) {
            let weight = this.weights[i];
            let layer = this.layers[i + 1];
            layer.values = weight.matrix.getDotsMatrix(this.layers[i].values, this.bias);
            layer.values = layer.values.getActivated();
        }

        return this.getLastLayer().values;
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
        let child = new NeuralNet({
            layers: clone(this.layers),
            weights: clone(this.weights),
            bias: clone(this.bias),
        });
        for (let i = 0; i < this.weights.length; i++) {
            let thisMatrix = this.weights[i].matrix;
            let partnerMatrix = partner.weights[i].matrix;
            child.weights[i].matrix = thisMatrix.crossover(partnerMatrix);
        }
        return child;
    }

    clone() {
        return clone(this);
    }

    displayTable() {
        console.table(this.weights[0].matrix.matrix);
        console.table(this.weights[1].matrix.matrix);
        console.table(this.weights[2].matrix.matrix);
        console.table(this.weights[3].matrix.matrix);
    }
}

module.exports = NeuralNet;