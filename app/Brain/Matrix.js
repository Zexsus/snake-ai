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
     * @param {number} scalar
     */
    multiply(scalar){
        this.setForeach((value) => {
            return value * scalar;
        });
        return this;
    }

    /**
     * @param {Matrix} multiplier
     * @return Matrix
     */
    multiplyBy(multiplier){
        let newMatrix = new Matrix(this.size);
        multiplier.foreach((number, multiplierMatix, position) => {
            this.foreach((thisNumber, thisMultiplierMatix, thisPosition) => {
                if(position.isEqual(thisPosition)){
                    newMatrix.matrix[position.y][position.x] = number * thisNumber;
                }
            })
        });

        return newMatrix;
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
     * @param {number} number
     */
    add(number){
        this.setForeach((value) => {
            return value + number;
        });
        return this;
    }

    /**
     * @param {Matrix} matrix
     */
    addBy(matrix){
        let newMatrix = new Matrix(this.size);

        matrix.foreach((number, multiplierMatix, position) => {
            this.foreach((thisNumber, thisMultiplierMatix, thisPosition) => {
                if(position.isEqual(thisPosition)){
                    newMatrix.matrix[position.y][position.x] = number + thisNumber;
                }
            })
        });

        return newMatrix;
    }

    /**
     * @param {number} number
     */
    subtract(number){
        this.setForeach((value) => {
            return value - number;
        });
        return this;
    }

    /**
     * @param {Matrix} matrix
     */
    subtractBy(matrix){
        let newMatrix = new Matrix(this.size);

        matrix.foreach((number, multiplierMatix, position) => {
            this.foreach((thisNumber, thisMultiplierMatix, thisPosition) => {
                if(position.isEqual(thisPosition)){
                    newMatrix.matrix[position.y][position.x] = thisNumber - number;
                }
            })
        });

        return newMatrix;
    }

    /**
     * @returns {Matrix}
     */
    transpose(){
         let newMatrix = new Matrix(this.size);

         this.foreach((number, matrix, position) =>{
             newMatrix.matrix[position.y][position.x] = matrix.matrix[position.x][position.y];
         });

         return newMatrix;
    }

    /**
     * @param {Array} array
     */
    setValuesFromArray(array){
        this.setForeach((number, matrix, position)=>{
            return array[position.x + (position.y * this.size.x)];
        });
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
     * @returns {Matrix}
     */
    getSigmoidDerived(){
        let sigmoidDerivedMatrix = new Matrix(this.size);
        this.foreach((number, matrix, position) => {
            let sigmoid = Matrix.sigmoid(number);
            sigmoidDerivedMatrix.set(position, sigmoid * (1 - sigmoid))
        });
        return sigmoidDerivedMatrix;
    }

    getWithoutLastRow(){
        let matrixWithoutLastRow = new Matrix(new Vector2D(this.size.x, this.size.y - 1));
        this.foreach((number, matrix, position) => {
            if(position.y < this.size.y - 1){
                matrixWithoutLastRow.set(position, number);
            }
        });
        return matrixWithoutLastRow;
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

    clone(){
        let clone = new Matrix(this.size);
        this.foreach((value, matrix, position) => {
           clone.set(position, value);
        });
        return clone;
    }

    /**
     * @return {Array<number>}
     */
    toArray(){
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
