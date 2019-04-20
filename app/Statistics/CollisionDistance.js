class CollisionDistance {
    constructor() {
        this.initStartDistances();
    }

    initStartDistances() {
        this.distances = {
            up: 100,
            right: 100,
            down: 100,
            left: 100,
        }
    }

    /**
     * Calculate and returns distances to collisions in 4 directions
     * @param {Vector2D} snakePosition
     * @param {Grid} grid
     */
    get(snakePosition, grid) {
        this.setHorizontalValues(snakePosition, grid);
        this.setVerticalValues(snakePosition, grid);

        return this.distances;
    }

    setHorizontalValues(snakePosition, grid) {
        grid.eachInRow(snakePosition.y, (item) => {
            if (CollisionDistance.isCollidable(item)) {
                let itemPosition = item.getPositionInGrid();
                let distance = Math.abs(snakePosition.x - itemPosition.x);
                let isLeft = (snakePosition.x > itemPosition.x);
                if (isLeft) {
                    if (this.distances.left > distance) {
                        this.distances.left = distance;
                    }
                } else {
                    if (this.distances.right > distance) {
                        this.distances.right = distance;
                    }
                }
            }
        });
    }

    setVerticalValues(snakePosition, grid) {
        grid.eachInColumn(snakePosition.x, (item) => {
            if (CollisionDistance.isCollidable(item)) {
                let itemPosition = item.getPositionInGrid();
                let distance = Math.abs(snakePosition.y - itemPosition.y);
                let isUp = (snakePosition.y > itemPosition.y);
                if (isUp) {
                    if (this.distances.up > distance) {
                        this.distances.up = distance;
                    }
                } else {
                    if (this.distances.down > distance) {
                        this.distances.down = distance;
                    }
                }
            }
        });
    }

    static isCollidable(item) {
        return (item.getState().isCollidable())
    }

}


module.exports = CollisionDistance;