var expect = require("chai").expect;
const Vector2D = require('../app/Engine/Vector2D.js');
const Matrix = require('../app/Brain/Matrix.js');

standardMatrixSize = new Vector2D(10, 10);

describe("Matrix", function () {
    beforeEach(function(){
        matrix = new Matrix(standardMatrixSize);
    });

    it('Creates array of null values on constructor', function () {
       expect(matrix.matrix.length).to.be.equal(10);
       expect(matrix.matrix[0].length).to.be.equal(10);
    });

    it('Returns value by vector2D position', function(){
        matrix.set(new Vector2D(0, 0), 5);
        expect(matrix.get(new Vector2D(0, 0))).to.be.equal(5);
    });

    it('Returns value by parameters', function(){
        matrix.set(new Vector2D(0, 0), 5);
        expect(matrix.get(0, 0)).to.be.equal(5);
    });

    // TODO write method to test dots matrix
    it('Returns dots matrix', function () {
        let matrix1 = new Matrix(new Vector2D(6, 4));
        let inputs = new Matrix(new Vector2D(1, 4));

        matrix1.setValuesFromArray([
            1, 2, 3, 4, 5, 6,
            1, 2, 3, 4, 5, 6,
            1, 2, 3, 4, 5, 6,
            1, 2, 3, 4, 5, 6,
        ]);
        inputs.setValuesFromArray([
            2,
            2,
            2,
            2
        ]);

        let expectedDots = [8, 16, 24, 32, 40, 48];
        let dots = matrix1.getDotsMatrix(inputs, 0);
        dots.foreach((value, item, position) => {
            expect(value).to.be.equal(expectedDots[position.y]);
        });
    });

    it('Returns single column matrix from array', function(){
        let arrayValues = [10, 15, 25, 30, 12];

        singleColumnMatrix = Matrix.getSingleRowMatrixFromArray(arrayValues);

        expect(singleColumnMatrix.size.y).to.be.equal(1);
        expect(singleColumnMatrix.size.x).to.be.equal(5);
        expect(singleColumnMatrix.matrix[0][0]).to.be.equal(10);
    });

    it('Calculates sigmoid of matrix | Activate matrix', function(){
        let smallMatrix = new Matrix(new Vector2D(4, 4));
        let values = [  10, 5, 1234, 10,
                        4, 13, 12, 11,
                        14, 12, 44, -20121,
                        1, 111, 120000, 344];
        smallMatrix.setValuesFromArray(values);
        let activatedMatrix = smallMatrix.getActivated();

        activatedMatrix.foreach((number) => (
            expect(number).to.be.within(0, 1)
        ));
    });

    it('Mutate', function(){
        let smallMatrix = new Matrix(new Vector2D(4, 4));
        let values = [  10, 5, 12, 10,
            4, 13, 12, 11,
            14, 12, 44, 121,
            1, 111, 22, 344];

        smallMatrix.setValuesFromArray(values);

        smallMatrix.mutate(0.5);
    });

    it('Clone itself', function(){
        let smallMatrix = new Matrix(new Vector2D(4, 4));
        let values = [  10, 5, 12, 10,
                        4, 13, 12, 11,
                        14, 12, 44, 121,
                        1, 111, 22, 344];

        smallMatrix.setValuesFromArray(values);

        clone = smallMatrix.clone();

        clone.foreach((value, matrix, position) => {
           expect(clone.get(position)).to.be.equal(smallMatrix.get(position));
        });
    });

    it('Randomize', function(){
        matrix.randomize();
        matrix.foreach((value) => {
            expect(value).to.be.below(1);
            expect(value).to.be.above(-1);
        })
    });
});
