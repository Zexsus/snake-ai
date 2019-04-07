const Vector2D = require('../Engine/Vector2D.js');
const clone = require('lodash.clonedeep');

/**
 * Matrix object
 * @param {Vector2D} size
 */
class Matrix {
    constructor(size){
        this.size = size;
        this.rows = size.y;
        this.cols = size.x;
        this.matrix = [];

        for(let r = 0; r < size.y; r++){
            this.matrix[r] = [];
            for(let c = 0; c < size.x; c++)
                this.matrix[r][c] = null;
        }
    }

    /**
     * Function is overloaded to create simpler notations. y is optional if vectorOrX is typeof Vector2D
     * @param {Vector2D|number} vectorOrX
     * @param {number} y
     * @returns {number}
     */
    get(vectorOrX, y){
        if(y !== undefined){
            return this.matrix[y][vectorOrX]
        }else{
            return this.matrix[vectorOrX.y][vectorOrX.x];
        }
    }

    /**
     * @param {Vector2D} vector
     * @param {number} value
     * @returns {number}
     */
    set(vector, value){
        this.matrix[vector.y][vector.x] = value;
        return this;
    }

    /**
     * @param {Matrix} inputs
     * @param {number} bias
     * @returns {Matrix}
     */
    getDotsMatrix(inputs, bias) {
        let result = new Matrix(new Vector2D(1, this.size.x));
        result.setForeach((resultValue, resultItem, resultPosition) => {
            let sum = 0;
            this.foreach((thisValue, thisItem, thisPosition) => {
                inputs.foreach((inputValue, inputItem, inputPosition) => {
                    if (thisPosition.x === resultPosition.y && thisPosition.y === inputPosition.y) {
                        sum += inputValue * thisValue;
                    }
                });
            });
            return sum + bias;
        });
        return result;
    }

    randomize(){
        this.setForeach(() => {
            return Math.random() * 2 - 1;
        });
        return this;
    }

    /**
     * @param {Array} array
     */
    setValuesFromArray(array) {
        this.setForeach((number, matrix, position) => {
            return array[position.x + (position.y * this.size.x)];
        });
    }

    /**
     * @returns {Matrix}
     */
    getActivated(){
        let activatedMatrix = new Matrix(this.size);
        this.setForeach((number, matrix, position) => {
           activatedMatrix.set(position, Matrix.sigmoid(number));
        });

        return activatedMatrix;
    }

    /**
     * Sigmoid function to cleaner notation.
     * @TODO move it to some "Calculations" class
     * @param {number} x
     * @returns {number}
     */
    static sigmoid(x){
        return 1 / (1 + Math.exp(-x));
    }

    /**
     * @param {number} mutationRate
     */
    mutate(mutationRate) {
        this.setForeach((number) => {
            let rand = Math.random();
            return this.getMutatedValue(number, mutationRate, rand);
        });
    }

    getMutatedValue(value, mutationRate, random) {
        let newValue = value;
        if (random < mutationRate) {
            let mutation = (Math.random() * 2 - 1);
            newValue += mutation;
            // console.log('Mutation', mutation);
        }
        return newValue;
    }

    /**
     * @param {Matrix} otherMatrix
     */
    crossover(otherMatrix){
        let random = Math.floor(Math.random() * this.size.x * this.size.y);
        // console.log('Random crossover value:', random);
        return this.crossoverByParams(otherMatrix, random);
    }

    crossoverByParams(otherMatrix, random) {
        let child = new Matrix(this.size);
        this.foreach((thisNumber, thisMatrix, thisPosition) => {
            let itemIndex = (thisPosition.y * thisMatrix.size.x) + thisPosition.x;
            if (itemIndex < random) {
                child.set(thisPosition, JSON.parse(JSON.stringify(thisNumber)));
            } else {
                child.set(thisPosition, JSON.parse(JSON.stringify(otherMatrix.get(thisPosition))));
            }
        });

        return child;
    }

    clone() {
        return clone(this);
    }

    /**
     * @return {Array<number>}
     */
    toArray() {
        let array = [];
        this.foreach((value) => {
            array.push(value);
        });

        return array;
    }

    /**
     * @param {Array<number>}array
     * @returns {Matrix}
     */
    static getSingleColumnMatrixFromArray(array) {
        let matrix = new Matrix(new Vector2D(1, array.length));

        array.forEach((value, index) => {
            matrix.matrix[index][0] = value;
        });

        return matrix;
    }

    /**
     * Runs callback on every matrix item
     * @param {function(number, Matrix, Vector2D)} callback
     */
    foreach(callback){
        for(var y = 0; y < this.rows; y++){
            for(var x = 0; x < this.cols; x++){
                callback(this.matrix[y][x], this, new Vector2D(x, y));
            }
        }
        return this;
    }

    /**
     * Set value for all numbers in matrix, returned by calcFunction
     * @param {function(number, Matrix, Vector2D)} calcFunction
     */
    setForeach(calcFunction){
        for(var y = 0; y < this.rows; y++){
            for(var x = 0; x < this.cols; x++){
                this.matrix[y][x] = calcFunction(this.matrix[y][x], this, new Vector2D(x, y));
            }
        }
        return this;
    }
}

module.exports = Matrix;
