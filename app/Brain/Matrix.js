const Vector2D = require('../Engine/Vector2D.js');

class Matrix{

    /**
     * @param {Vector2D} size
     */
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
        let result = new Matrix(new Vector2D(this.size.x, 1));
        result.setForeach((resultValue, resultItem, resultPosition) => {
            let sum = 0;
            inputs.foreach((inputValue, inputItem, inputPosition) => {
                sum += inputValue * this.get(resultPosition.x, inputPosition.x);
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
     * @returns {Matrix}
     */
    getActivated(){
        let activatedMatrix = new Matrix(this.size);
        this.foreach((number, matrix, position) => {
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
            let newValue = number;
            if (rand < mutationRate) {
                newValue += Matrix.gaussianRand() / 5;
                if (newValue > 1) newValue = 1;
                if (newValue < -1) newValue = -1;
            }
            return newValue;
        });
    }

    static gaussianRand() {
        var rand = 0;

        for (var i = 0; i < 6; i += 1) {
            rand += Math.random();
        }

        return rand / 6;
    }

    /**
     * @param {Matrix} otherMatrix
     */
    crossover(otherMatrix){
        let child = new Matrix(this.size);
        let randColumn = Math.floor(Math.random() * this.size.x);
        let randRow = Math.floor(Math.random() * this.size.y);

        this.foreach((thisNumber, thisMatrix, thisPosition) => {
            if((thisPosition.y < randRow) || (thisPosition.y === randRow && thisPosition.x <= randColumn)){
                child.set(thisPosition, thisNumber);
            }else{
                child.set(thisPosition, otherMatrix.get(thisPosition));
            }
        });

        return child;
    }

    /**
     * @param {Array<number>}array
     * @returns {Matrix}
     */
    static getSingleRowMatrixFromArray(array) {
        let matrix = new Matrix(new Vector2D(array.length, 1));

        array.forEach((value, index) => {
            matrix.matrix[0][index] = value;
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
