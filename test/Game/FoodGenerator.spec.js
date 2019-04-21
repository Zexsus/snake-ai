var expect = require("chai").expect;
const engine = require('../mock/mock-engine.js');
;
const Grid = require("../../app/Game/GameObjects/Grid.js");
const Vector2D = require("../../app/Engine/Vector2D.js");
const FoodGenerator = require('../../app/Game/FoodGenerator.js');

before(() => {
    foodGenerator = new FoodGenerator(engine.getState('food'));
    grid = new Grid(engine, new Vector2D(0, 0), new Vector2D(10, 10));
    grid.setupWalls().clear();
});
