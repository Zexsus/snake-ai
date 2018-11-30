GameObject = require("./GameObject.js");
const config = require('../modules/game-config.json');

class Grid extends GameObject {
    constructor(engine, width, height) {
        super(engine);
        this.items = [];
        this.itemsOffset = config.grid.offset;
        this.itemsSize = {
            width: config.grid.width,
            height: config.grid.height
        };

        this.createGrid(width, height);


        this.size = this.getSize();
    }

    getSize() {
        return {
            width: (this.itemsSize.width + this.itemsOffset) * this.colsCount - this.itemsOffset,
            height: (this.itemsSize.height + this.itemsOffset) * this.rowsCount - this.itemsOffset,
        }
    }

    /*
     * @returns {Rectangle}
     */
    getItems() {
        return this.items;
    }

    createGrid(width, height) {
        this.rowsCount = height;
        this.colsCount = width;

        for (var rows = 0; rows < this.rowsCount; rows++) {
            this.items[rows] = [];
            for (var cols = 0; cols < this.colsCount; cols++) {
                let rectPosition = this.getPositionForItem(rows, cols);
                let rectParams = {
                    x: rectPosition.x,
                    y: rectPosition.y,
                    width: config.grid.width,
                    height: config.grid.height,
                    state: this.engine.getState('default')
                };
                this.items[rows][cols] = this.engine.createRectangle(rectParams);
            }
        }
        return this;
    }

    getPositionForItem(row, column) {
        return {
            x: column * (this.itemsSize.width + this.itemsOffset) + this.position.x,
            y: row * (this.itemsSize.height + this.itemsOffset) + this.position.y
        }
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {*}
     */
    getItem(row, col) {
        return this.getItems()[row][col];
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;

        this.each((item, row, column) => {
            let itemPosition = this.getPositionForItem(row, column);
            item.setPosition(itemPosition.x, itemPosition.y);
        });
    }

    draw() {
        if (this.items.length < 1) {
            throw "Empty items cannot draw itself";
        }

        this.each(function (rect) {
            rect.draw();
        });
    }

    move(x, y) {
        this.clear();
        this.setPosition(this.position.x + x, this.position.y + y);
        this.draw();
    }

    clear() {
        this.each(function (item) {
            item.clear(item);
        });
    }

    resetStatesWithoutWall(){
        this.each((item) => {
            if(item.getState() !== this.engine.getState("wall"))
                item.setState(this.engine.getState("default"));
        });
    }

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
     *
     * @param {Array.<Object>} items
     */
    setMultipleItemsState(items){
        items.forEach((value) => {
            let item = this.getItem(value.position.y, value.position.x);
            item.setState(value.state);
        });
    }

    eachInRow(row, callback){
        for (var column = 0; column < this.colsCount; column++) {
            callback(this.getItem(row, column), row, column);
        }
    }

    eachInColumn(column, callback){
        for (var row = 0; row < this.rowsCount; row++) {
            callback(this.getItem(row, column), row, column);
        }
    }

    /**
     *
     * @param callback - includes {Rectangle} param
     */
    each(callback){
        for (var row = 0; row < this.rowsCount; row++) {
            for (var column = 0; column < this.colsCount; column++) {
                callback(this.getItem(row, column), row, column);
            }
        }
    }
}

module.exports = Grid;