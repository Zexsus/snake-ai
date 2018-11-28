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

    eachInRow(row, callback){}

    each(calback) {
        for (var row = 0; row < this.rowsCount; row++) {
            for (var column = 0; column < this.colsCount; column++) {
                calback(this.getItem(row, column), row, column);
            }
        }
    }
}

module.exports = Grid;