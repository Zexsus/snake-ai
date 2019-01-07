var expect = require("chai").expect;
const Vector2D = require('../app/engine/Vector2D.js');
const Matrix = require('../app/modules/Matrix.js');

standardMatrixSize = new Vector2D(10, 10);

describe("Matrix", function () {
    beforeEach(function(){
        matrix = new Matrix(standardMatrixSize);
    });

    it('Creates array of null values on constructor', function () {
       expect(matrix.matrix.length).to.be.equal(10);
       expect(matrix.matrix[0].length).to.be.equal(10);
    });

    describe('Calculates', function(){
        beforeEach(function(){
            matrix.set(new Vector2D(0, 0), 5);
            matrix.set(new Vector2D(1, 0), 15);
            matrix.set(new Vector2D(2, 2), 25);
        });

        it('Multiplies', function(){
            matrix.multiply(2);

            expect(matrix.get(0, 0)).to.be.equal(10);
            expect(matrix.get(1, 0)).to.be.equal(30);
            expect(matrix.get(2, 2)).to.be.equal(50);
        });

        it('Add value', function() {
            matrix.add(5);

            expect(matrix.get(0, 0)).to.be.equal(10);
            expect(matrix.get(1, 0)).to.be.equal(20);
            expect(matrix.get(2, 2)).to.be.equal(30);
        });

        it('Subtract value', function() {
            matrix.subtract(5);

            expect(matrix.get(0, 0)).to.be.equal(0);
            expect(matrix.get(1, 0)).to.be.equal(10);
            expect(matrix.get(2, 2)).to.be.equal(20);
        });

        it('Transposing', function(){
            transposed = matrix.transpose();

            expect(transposed.get(0, 0)).to.be.equal(5);
            expect(transposed.get(0, 1)).to.be.equal(15);
            expect(transposed.get(1, 0)).to.be.equal(null);
        });

        describe('By other matrix', function(){
            beforeEach(function(){
                matrix2 = new Matrix(standardMatrixSize);
            });

            it('Multiplies', function(){
                matrix2.set(new Vector2D(0, 0), 2);
                matrix2.set(new Vector2D(1, 0), 3);
                matrix2.set(new Vector2D(2, 2), 2.5);

                let result = matrix.multiplyBy(matrix2);

                expect(result.get(0, 0)).to.be.equal(10);
                expect(result.get(1, 0)).to.be.equal(45);
                expect(result.get(2, 2)).to.be.equal(62.5);
            });

            it('Add', function(){
                matrix2.set(new Vector2D(0, 0), 2);
                matrix2.set(new Vector2D(1, 0), 3);
                matrix2.set(new Vector2D(2, 2), -20);

                let result = matrix.addBy(matrix2);

                expect(result.get(0, 0)).to.be.equal(7);
                expect(result.get(1, 0)).to.be.equal(18);
                expect(result.get(2, 2)).to.be.equal(5);
            });

            it('Subtract', function(){
                matrix2.set(new Vector2D(0, 0), 2);
                matrix2.set(new Vector2D(1, 0), 3);
                matrix2.set(new Vector2D(2, 2), -20);

                let result = matrix.subtractBy(matrix2);

                expect(result.get(0, 0)).to.be.equal(3);
                expect(result.get(1, 0)).to.be.equal(12);
                expect(result.get(2, 2)).to.be.equal(45);
            });
        });
    });

    it('Returns dot', function(){
        let matrix2 = new Matrix(standardMatrixSize);

        matrix.setForeach(()=>{
            return 4;
        });

        matrix2.setForeach(()=>{
            return 2;
        });
        matrix2.matrix[4][4] = 10;
        let result = matrix.dot(matrix2);

        expect(result.get(0, 0)).to.be.equal(4 * 2 * 10);
        expect(result.get(4, 0)).to.be.equal(4 * 2 * 9 + 4 * 10);
    });

    it('Returns single column matrix from array', function(){
        let arrayValues = [10, 15, 25, 30, 12];

        singleColumnMatrix = Matrix.getSingleColumnMatrixFromArray(arrayValues);

        expect(singleColumnMatrix.size.x).to.be.equal(1);
        expect(singleColumnMatrix.size.y).to.be.equal(5);
        expect(singleColumnMatrix.matrix[0][0]).to.be.equal(10);
    });

    it('Gets values from array', function(){
        let smallMatrix = new Matrix(new Vector2D(4, 4));
        let values = [  10, 5, 12, 10,
                        4, 13, 12, 11,
                        14, 12, 44, 121,
                        1, 111, 22, 344];
        smallMatrix.setValuesFromArray(values);
        expect(smallMatrix.get(0, 0)).to.be.equal(10);
        expect(smallMatrix.get(3, 1)).to.be.equal(11);
        smallMatrix.foreach((number, matrix, position) => {
            expect(number).to.be.equal(values[position.x + (position.y * smallMatrix.size.x)]);
        })
    });

    it('Returns self as array', function(){
        let smallMatrix = new Matrix(new Vector2D(4, 4));
        let values = [  10, 5, 12, 10,
                        4, 13, 12, 11,
                        14, 12, 44, 121,
                        1, 111, 22, 344];

        smallMatrix.setValuesFromArray(values);
        expect(smallMatrix.toArray()).to.be.eql(values);
    });

    it('Returns matrix with addictional bias for single row matrix', function(){
        let smallMatrix = new Matrix(new Vector2D(4, 1));
        let values = [10, 5, 12, 10];
        smallMatrix.setValuesFromArray(values);

        let matrixWithBias = smallMatrix.addBias();

        for(let i = 0; i < values.length; i++){
            expect(matrixWithBias.get(i, 0)).to.be.equal(values[i]);
        }
        expect(matrixWithBias.get(4, 0)).to.be.equal(1);
    });

    it('Randomize', function(){
        matrix.randomize();
        matrix.foreach((value) => {
            expect(value).to.be.below(1);
            expect(value).to.be.above(-1);
        })
    });
});
