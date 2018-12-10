var expect = require("chai").expect;
let engine = require('./mock/mock-engine.js');
const Grid = require('../app/engine/Grid.js');
const Vector2D = require('../app/engine/Vector2D.js');
const config = require('../app/modules/game-config.json');

let grid = null;

describe("Grid", function () {

    beforeEach(function () {
        grid = new Grid(engine, new Vector2D(0, 0), new Vector2D(10, 10));
        firstItem = grid.getItem(new Vector2D(0, 0));
        secondItemInRow = grid.getItem(new Vector2D(1, 0));
        secondItemInColumn = grid.getItem(new Vector2D(0, 1));
        lastItem = grid.getItem(new Vector2D(9, 9));
    });


    it('Create items of rectangles', function () {
        expect(grid.getItems().length).to.be.equal(10);
    });

    describe('Each function', function () {
        it('Iterates through all items', function () {
            grid.each(function (item) {
                item.setPosition(new Vector2D(600, 1400));
            });

            for (var row = 0; row < grid.size.y; row++) {
                for (var column = 0; column < grid.size.x; column++) {
                    expect(grid.getItem(new Vector2D(row, column)).position.x).to.be.equal(600);
                    expect(grid.getItem(new Vector2D(row, column)).position.y).to.be.equal(1400);
                }
            }
        });

        it('Iterates through all items in row', function(){
            let row = 0;
            grid.eachInRow(row, function(item){
                item.setPosition(new Vector2D(600, 1400));
            });

            for (var column = 0; column < grid.colsCount; column++) {
                expect(grid.getItem(new Vector2D(row, column)).position.x).to.be.equal(600);
                expect(grid.getItem(new Vector2D(row, column)).position.y).to.be.equal(1400);
            }
        });

        it('Iterates through all items in column', function(){
            let column = 0;
            grid.eachInColumn(column, function(item){
                item.setPosition(new Vector2D(600, 1400));
            });

            for (var row = 0; row < grid.rowsCount; row++) {
                expect(grid.getItem(new Vector2D(row, column)).position.x).to.be.equal(600);
                expect(grid.getItem(new Vector2D(row, column)).position.y).to.be.equal(1400);
            }
        });
        it('Sets multiple items states', function(){
            let items = [
                {
                    position:new Vector2D(0, 0),
                    state: engine.getState("head")
                },
                {
                    position:new Vector2D(0, 1),
                    state: engine.getState("body")
                },
                {
                    position: new Vector2D(3, 7),
                    state: engine.getState("wall")
                },
            ];

            grid.setMultipleItemsState(items);

            expect(grid.getItem(new Vector2D(0,0)).getState()).to.be.eql(engine.getState('head'));
            expect(grid.getItem(new Vector2D(0,1)).getState()).to.be.eql(engine.getState('body'));
            expect(grid.getItem(new Vector2D(3,7)).getState()).to.be.eql(engine.getState('wall'));
        });
    });

    describe('Items Positions', function () {
        it('Calculate position for first element', function () {
            let positionForFirstElement = grid.getPositionForItem(new Vector2D(0, 0));
            expect(positionForFirstElement.x).to.be.equal(0);
            expect(positionForFirstElement.y).to.be.equal(0);

            grid.setPosition(new Vector2D(100, 250));

            positionForFirstElement = grid.getPositionForItem(new Vector2D(0, 0));
            expect(positionForFirstElement.x).to.be.equal(100);
            expect(positionForFirstElement.y).to.be.equal(250);

        });

        it('Calculate position for second element in row', function () {
            let positionForSecondElementInRow = grid.getPositionForItem(new Vector2D(1, 0));
            expect(positionForSecondElementInRow.x).to.be.equal(config.grid.offset + config.grid.width);
            expect(positionForSecondElementInRow.y).to.be.equal(0);
        });

        it('Calculate position for second element in column', function () {
            let positionForSecondElementInColumn = grid.getPositionForItem(new Vector2D(0, 1));
            expect(positionForSecondElementInColumn.x).to.be.equal(0);
            expect(positionForSecondElementInColumn.y).to.be.equal(config.grid.offset + config.grid.width);
        });
    });

    describe('Moving', function () {
        beforeEach(function () {
            grid.setPosition(new Vector2D(40, 40));
            grid.setPosition(new Vector2D(20, 20));
        });

        it('Moves after set position', function () {
            expect(grid.position.x).to.be.equal(20);
            expect(grid.position.y).to.be.equal(20);
        });

        it('First item moves after set position', function () {
            expect(firstItem.position.x).to.be.equal(20);
            expect(firstItem.position.y).to.be.equal(20);
        });


        it('Second item in row moves after set position', function () {
            expect(secondItemInRow.position.x).to.be.equal(20 + grid.itemsOffset + grid.itemsSize.x);
            expect(secondItemInRow.position.y).to.be.equal(20);
        });

        it('Second item in col moves after set position', function () {
            expect(secondItemInColumn.position.x).to.be.equal(20);
            expect(secondItemInColumn.position.y).to.be.equal(20 + grid.itemsOffset + grid.itemsSize.y);
        });
    });

    it('Has proper size', function () {
        expect(grid.getDisplaySize().x).to.be.equal((config.grid.width + config.grid.offset) * 10 - config.grid.offset);
        expect(grid.getDisplaySize().y).to.be.equal((config.grid.height + config.grid.offset) * 10 - config.grid.offset);
    });


    describe('First item', function () {
        it('Has proper position', function () {
            expect(firstItem.position.x).to.be.equal(0);
            expect(firstItem.position.y).to.be.equal(0);
        });

        it('Has width from config', function () {
            expect(firstItem.size.x).to.be.equal(config.grid.width);
        });

        it('Has height from config', function () {
            expect(firstItem.size.y).to.be.equal(config.grid.height);
        });
    });

    describe('Second item in row', function () {
        it('Has proper position x', function () {
            expect(secondItemInRow.position.x).to.be.equal(config.grid.offset + config.grid.width);
        });

        it('Has proper position y', function () {
            expect(secondItemInRow.position.y).to.be.equal(0);
        });
    });

    describe('Second item in column', function () {
        it('Has proper position x', function () {
            expect(secondItemInColumn.position.x).to.be.equal(0);
        });

        it('Has proper position y', function () {
            expect(secondItemInColumn.position.y).to.be.equal(config.grid.offset + config.grid.width);
        });
    });

    describe('Last item', function () {
        it('Has proper position x', function () {
            expect(lastItem.position.x).to.be.equal((config.grid.width + config.grid.offset) * 9);
        });

        it('Has proper position y', function () {
            expect(lastItem.position.y).to.be.equal((config.grid.height + config.grid.offset) * 9);
        });
    });

    describe('Walls', function(){
        beforeEach(function(){
            grid.setupWalls();
        });

        it('Exists in top of grid', function(){
            grid.eachInRow(0, function(item){
                expect(item.state).to.be.eql(engine.getState('wall'));
            });
        });

        it('Exists in bottom of grid', function(){
            grid.eachInRow(9, function(item){
                expect(item.state).to.be.eql(engine.getState('wall'));
            });
        });

        it('Exists in left side of grid', function(){
            grid.eachInColumn(0, function(item){
                expect(item.state).to.be.eql(engine.getState('wall'));
            });
        });

        it('Exists in right side of grid', function(){
            grid.eachInColumn(9, function(item){
                expect(item.state).to.be.eql(engine.getState('wall'));
            });
        });
    });
});
