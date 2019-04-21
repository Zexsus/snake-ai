const expect = require("chai").expect;
const GameState = require("../../app/Statistics/GameState.js");
const directions = require("../../app/Game/Directions.js");

describe('GameState', () => {
    it('Returns proper distances by direction', () => {
        let distances = [
            5,  // up
            12, // right
            6,  // down
            9   // left
        ];

        let distancesByDirection = GameState.getStatsDistancesByDirection(directions.right, distances);

        expect(distancesByDirection[0]).to.be.equal(5);
        expect(distancesByDirection[1]).to.be.equal(12);
        expect(distancesByDirection[2]).to.be.equal(6);
        expect(distancesByDirection.length).to.be.equal(3);
    });


});