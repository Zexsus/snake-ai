var expect = require("chai").expect;
const engine = require('../mock/mock-engine.js');
;
const Grid = require("../../app/Game/GameObjects/Grid.js");
const Vector2D = require("../../app/Engine/Vector2D.js");
const FoodGenerator = require('../../app/Game/FoodGenerator.js');

beforeEach(() => {
    foodStartPositions = [
        {
            x: 2,
            y: 2
        },
        {
            x: 8,
            y: 2
        },
        {
            x: 8,
            y: 8
        },
        {
            x: 2,
            y: 8
        }
    ];
    grid = new Grid(engine, new Vector2D(0, 0), new Vector2D(10, 10));
    grid.setupWalls().clear();
    foodGenerator = new FoodGenerator(engine.getState('food'), grid, foodStartPositions);
});

describe('Food generator', () => {
    it('Return values from array on the first get calls', () => {
        foodStartPositions.forEach((itemPosition) => {
            const item = foodGenerator.getNewFoodItem();
            expect(itemPosition).to.be.eql(item.getPositionInGrid());
        });
    });

    it('Setups returned item food state', () => {
        expect(foodGenerator.getNewFoodItem().getState()).to.be.eql(engine.getState('food'));
    });

    it('Returns values from array after reset', () => {
        const item1 = foodGenerator.getNewFoodItem();
        const item2 = foodGenerator.getNewFoodItem();
        const item3 = foodGenerator.getNewFoodItem();
        foodGenerator.reset();

        expect(foodGenerator.getNewFoodItem()).to.be.eql(item1);
    })
});
