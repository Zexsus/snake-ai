var expect = require("chai").expect;
const engine = require('./mock/mock-engine.js');
const CollisionDistance = require("../app/Statistics/CollisionDistance.js");
const Grid = require("../app/Game/GameObjects/Grid.js");
const Vector2D = require("../app/Engine/Vector2D.js");


before(() => {
    collisionDistance = new CollisionDistance();
    grid = new Grid(engine, new Vector2D(0, 0), new Vector2D(10, 10));
    grid.setupWalls().clear();
});

beforeEach(() => {
    collisionDistance.initStartDistances();
})

describe('Collision distance', () => {
    describe('Straight snake distances', () => {
        before(() => {
            let snakeHeadPosition = {
                x: 4,
                y: 4
            };
            let gridStates = [
                'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', '0', 'B', 'B', 'H', '0', '0', '0', '0', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
            ];
            grid.setupGridStatesByArray(gridStates);

            distances = collisionDistance.get(snakeHeadPosition, grid);
        });
        it('Right distance', () => {
            expect(distances.right).to.be.equal(5);
        });

        it('Left distance', () => {
            expect(distances.left).to.be.equal(1);
        });

        it('Up distance', () => {
            expect(distances.up).to.be.equal(4);
        });

        it('Down distance', () => {
            expect(distances.down).to.be.equal(5);
        });
    });

    describe('Snake after the turn', () => {
        before(() => {
            let gridState = [
                'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', '0', '0', '0', 'B', 'B', 'B', '0', '0', 'W',
                'W', '0', '0', '0', '0', '0', 'B', '0', '0', 'W',
                'W', '0', '0', '0', 'H', '0', 'B', '0', '0', 'W',
                'W', '0', '0', '0', 'B', 'B', 'B', '0', '0', 'W',
                'W', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
                'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
            ];
            let snakeHeadPosition = {
                x: 4,
                y: 6
            };
            grid.setupGridStatesByArray(gridState);

            distances = collisionDistance.get(snakeHeadPosition, grid);
        });
        it('Right distance', () => {
            expect(distances.right).to.be.equal(2);
        });

        it('Left distance', () => {
            expect(distances.left).to.be.equal(4);
        });

        it('Up distance', () => {
            expect(distances.up).to.be.equal(2);
        });

        it('Down distance', () => {
            expect(distances.down).to.be.equal(1);
        });
    });
});