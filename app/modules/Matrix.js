const Vector2D = require('../engine/Vector2D.js');

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
            return this.matrix[vector.y][vector.x];
        }
    }

    /**
     * Function is overloaded to create simpler notations. value is optional if vectorOrY is typeof Vector2D
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
     * @param {Matrix} n
     * @returns {Matrix}
     */
    dot(n){
        let result = new Matrix(new Vector2D(this.rows, n.cols));

        if(this.cols === n.rows){
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < n.cols; j++){
                    let sum = 0;
                    for(let k = 0; k < this.cols; k++){
                        sum += this.matrix[i][k] * n.matrix[k][j];
                    }
                    result.matrix[i][j] = sum;
                }
            }
        }
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
     * @param {Array<number>}array
     * @returns {Matrix}
     */
    static getSingleColumnMatrixFromArray(array){
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
