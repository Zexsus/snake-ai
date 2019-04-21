var expect = require("chai").expect;
const Vector2D = require('../../app/Engine/Vector2D.js');
const Matrix = require('../../app/Brain/Matrix.js');

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

        singleColumnMatrix = Matrix.getSingleColumnMatrixFromArray(arrayValues);

        expect(singleColumnMatrix.size.y).to.be.equal(5);
        expect(singleColumnMatrix.size.x).to.be.equal(1);
        singleColumnMatrix.foreach((value, item, position) => {
            expect(value).to.be.equal(arrayValues[position.y]);
        });
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
        let values = [
            10, 5, 12, 10,
            4, 13, 12, 11,
            14, 12, 44, 121,
            1, 111, 22, 344];
        smallMatrix.setValuesFromArray(values);
        let save = smallMatrix.clone();
        smallMatrix.mutate(0.5);
        expect(smallMatrix).to.be.not.eql(save);
    });

    it('Mutate single value', () => {
        let value = 0.2;
        let mutatedValue = matrix.getMutatedValue(value, 0.3, 0.1);
        expect(mutatedValue).to.be.not.equal(value);

        let mutatedValue2 = matrix.getMutatedValue(value, 0.3, 0.7);
        expect(mutatedValue2).to.be.equal(value);
    });

    describe('Crossover', function () {
        let matrix1 = new Matrix(new Vector2D(4, 4));
        let matrix2 = new Matrix(new Vector2D(4, 4));

        beforeEach(() => {
            matrix1.setValuesFromArray([
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ]);
            matrix2.setValuesFromArray([
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1,
            ]);
        });
        it('Child is equal to second parent when random values are lowest', function () {
            let child = matrix1.crossoverByParams(matrix2, 0);
            let expected = new Matrix(new Vector2D(4, 4));
            expected.setValuesFromArray([
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1,
                1, 1, 1, 1,
            ]);
            expect(child).to.be.eql(expected);
        });
        it('Child is equal to second parent when random values are highest', function () {
            let child = matrix1.crossoverByParams(matrix2, 16);
            let expected = new Matrix(new Vector2D(4, 4));
            expected.setValuesFromArray([
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ]);
            expect(child).to.be.eql(expected);
        });
        it('Child is half of it parents when random values are in the middle', function () {
            let child = matrix1.crossoverByParams(matrix2, 8);
            let expected = new Matrix(new Vector2D(4, 4));
            expected.setValuesFromArray([
                0, 0, 0, 0,
                0, 0, 0, 0,
                1, 1, 1, 1,
                1, 1, 1, 1,
            ]);
            expect(child).to.be.eql(expected);
        })
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
