var expect = require("chai").expect;
const FoodDistance = require("../../app/Statistics/FoodDistance.js");

describe('Food distance distance', () => {
    before(() => {
        let snakeHeadPosition = {
            x: 4,
            y: 4
        };

        let foodPosition = {
            x: 7,
            y: 8
        };
        distances = FoodDistance.get(foodPosition, snakeHeadPosition);
    });

    it('Right distance', () => {
        expect(distances.right).to.be.equal(3);
    });

    it('Left distance', () => {
        expect(distances.left).to.be.equal(-3);
    });

    it('Up distance', () => {
        expect(distances.up).to.be.equal(-4);
    });

    it('Down distance', () => {
        expect(distances.down).to.be.equal(4);
    });
});