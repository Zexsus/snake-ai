const GameObject = require("./GameObject.js");
const Vector2D = require('../../Engine/Vector2D.js');
const GridItem = require('./GridItem.js');
const config = require('../game-config.json');

class Grid extends GameObject {

    /**
     * @param {Engine} engine
     * @param {Vector2D} position
     * @param {Vector2D} size
     */
    constructor(engine, position, size) {
        super(engine, position, size);

        /**
         * @type {Array.<GridItem>}
         */
        this.items = [];

        /**
         * @type {number}
         */
        this.itemsOffset = config.grid.offset;

        /**
         * @type {Vector2D}
         */
        this.itemsSize = new Vector2D(config.grid.width, config.grid.height);
        this.createGrid(size);
    }

    /**
     * @param {Vector2D} size
     * @returns {Grid}
     */
    createGrid(size) {
        this.rowsCount = size.y;
        this.colsCount = size.x;

        for (var y = 0; y < this.rowsCount; y++) {
            this.items[y] = [];
            for (var x = 0; x < this.colsCount; x++) {
                let position = this.getPositionForItem(new Vector2D(x, y));
                let size = new Vector2D(config.grid.width, config.grid.height);
                let state = this.engine.getState('default');

                this.items[y][x] = new GridItem(new Vector2D(x, y), this.engine, position, size, state);
            }
        }
        return this;
    }

    /**
     * @param {Vector2D} itemPositionInGrid
     * @returns {GridItem}
     */
    getItem(itemPositionInGrid) {
        return this.getItems()[itemPositionInGrid.y][itemPositionInGrid.x];
    }

    /*
     * @returns {Array.<GridItem>}
     */
    getItems() {
        return this.items;
    }

    /**
     * @param {Vector2D} position
     */
    setPosition(position) {
        this.position = position;

        if(this.getItems().length)
            this.each((item) => {
                let itemPosition = this.getPositionForItem(item.getPositionInGrid());
                item.setPosition(itemPosition);
            });
    }

    /**
     * @param {Vector2D} itemPositionInGrid
     * @returns {Vector2D}
     */
    getPositionForItem(itemPositionInGrid) {
        let x = itemPositionInGrid.x * (this.itemsSize.x + this.itemsOffset) + this.position.x;
        let y = itemPositionInGrid.y * (this.itemsSize.y + this.itemsOffset) + this.position.y;
        return new Vector2D(x, y);
    }

    /**
     * @returns {Grid}
     */
    draw() {
        if (this.items.length < 1) {
            throw "Empty items cannot draw itself";
        }

        this.each(function (rect) {
            rect.draw();
        });

        return this;
    }

    /**
     * @param {Vector2D} vector
     * @return {Grid}
     */
    move(vector) {
        this.clear();
        let newPosition = this.position.add(vector);
        this.setPosition(newPosition);
        this.draw();

        return this;
    }

    /**
     * @returns {Grid}
     */
    clear() {
        this.each(function (item) {
            item.clear(item);
        });

        return this;
    }

    /**
     * @param {Array.<string>} states
     * @returns {Grid}
     */
    resetStatesWithout(states){
        this.each((item) => {
            if(states.indexOf(item.getState().name) === -1)
                item.setState(this.engine.getState("default"));
        });

        return this;
        50
    }

    /**
     * @param {Array.<GameObjectState>} states
     * @returns {Array.<GridItem>}
     */
    getItemsWithoutStates(states){
        let itemsWithoutStates = [];
        this.each((item) => {
            if (states.indexOf(item.getState().name) === -1)
                itemsWithoutStates.push(item);
        });
        if (itemsWithoutStates.length === 0) {
            debugger;
        }
        return itemsWithoutStates;
    }

    /**
     * @param {Array.<string>} states
     * @returns {GridItem}
     */
    getRandomItemWithout(states){
        let items = this.getItemsWithoutStates(states);
        let randomItemIndex = Math.floor((Math.random() * items.length));
        if (typeof items[randomItemIndex] === "undefined") {
            debugger;
        }
        return items[randomItemIndex];
    }

    /**
     * @param {Array.<GridItem>} items
     */
    setMultipleItemsState(items){
        items.forEach((value) => {
            let item = this.getItem(value.position);
            item.setState(value.state);
        });

        return this;
    }

    /**
     * Set wall state on the edges of the grid
     * @returns {Grid}
     */
    setupWalls(){
        let setWallState = (item) => {
            item.setState(this.engine.getState('wall'));
        };

        this.eachInRow(0, setWallState);
        this.eachInRow(this.rowsCount - 1, setWallState);
        this.eachInColumn(0, setWallState);
        this.eachInColumn(this.colsCount - 1, setWallState);

        return this;
    }

    /**
     * @param {number} y
     * @param {function(GridItem)}  callback
     * @returns {Grid}
     */
    eachInRow(y, callback){
        for (var x = 0; x < this.colsCount; x++) {
            let itemPosition = new Vector2D(x, y);
            callback(this.getItem(itemPosition));
        }

        return this;
    }

    /**
     * @param {number} x
     * @param {function(GridItem)} callback
     * @returns {Grid}
     */
    eachInColumn(x, callback){
        for (var y = 0; y < this.rowsCount; y++) {
            let itemPosition = new Vector2D(x, y);
            callback(this.getItem(itemPosition));
        }

        return this;
    }

    /**
     * Iterates for each Rectangle grid with callback
     * @param {function(GridItem)} callback
     */
    each(callback){
        for (var row = 0; row < this.rowsCount; row++) {
            for (var column = 0; column < this.colsCount; column++) {
                let itemPosition = new Vector2D(row, column);
                callback(this.getItem(itemPosition));
            }
        }

        return this;
    }

    /**
     * @returns {Vector2D}
     */
    getDisplaySize() {
        let width = (this.itemsSize.x + this.itemsOffset) * this.colsCount - this.itemsOffset;
        let height = (this.itemsSize.y + this.itemsOffset) * this.rowsCount - this.itemsOffset;
        return new Vector2D(width, height);
    }

    /**
     * Sets grid state by special array with signs
     * function for test purposesr
     */
    setupGridStatesByArray(array) {
        if (array.length !== this.size.x * this.size.y) {
            throw "Array of values not match size of grid";
        }
        this.each((item) => {
            let char = array[item.getPositionInGrid().x + (item.getPositionInGrid().y * this.size.x)];
            let state = this.getStateBySign(char);
            item.setState(state);
        });
    }

    getStateBySign(sign) {
        if (sign === "W") {
            return this.engine.getState('wall');
        }

        if (sign === "B") {
            return this.engine.getState('body');
        }

        if (sign === "H") {
            return this.engine.getState('head');
        }

        if (sign === "F") {
            return this.engine.getState('food');
        }

        if (sign === "0") {
            return this.engine.getState('default');
        }
    }
}

module.exports = Grid;