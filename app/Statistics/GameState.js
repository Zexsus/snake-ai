class GameState {

    /**
     * @param {Game} game
     */
    constructor(game){
        this.game = game;
    }

    getStatistics(){
        return {
            direction: this.game.getSnake().direction,
            collisionDistance: this.getCollisionDistance(),
            foodDistances: this.getDistancesToFood(),
        };
    }

    getCollisionDistance() {
        let distances = {
            up: 100,
            right: 100,
            down: 100,
            left: 100,
        };
        this.game.grid.each((item) => {
            let position = item.getPositionInGrid();
            let snakeHeadPostion = this.game.getSnake().head.position;
            let isCollider = item.hasState('wall') || item.hasState('body');
            let xDifference = Math.abs(position.x - snakeHeadPostion.x);
            let yDifference = Math.abs(position.y - snakeHeadPostion.y);
            if (isCollider) {
                if (position.y === snakeHeadPostion.y) {
                    if (position.x < snakeHeadPostion.x && distances.left > xDifference) {
                        distances.left = xDifference;
                    }
                    if (position.x > snakeHeadPostion.x && distances.right > xDifference) {
                        distances.right = xDifference;
                    }
                }
                if (position.x === snakeHeadPostion.x) {
                    if (position.y < snakeHeadPostion.y && distances.up > yDifference) {
                        distances.up = yDifference;
                    }
                    if (position.y > snakeHeadPostion.y && distances.down > yDifference) {
                        distances.down = yDifference;
                    }
                }
            }
        });

        return [distances.up, distances.right, distances.down, distances.left];

    }

    getStatisticsArray(snakeDirection) {
        let stats = this.getStatistics();

        return [
            ...this.getStatsDistancesByDirection(snakeDirection, stats.collisionDistance),
            stats.foodDistances.right, stats.foodDistances.left, stats.foodDistances.up, stats.foodDistances.down,
        ]
    }

    /**
     * @param {Direction} direction
     */
    getStatsDistancesByDirection(direction, stats) {
        let prevKey = (direction.index < 0) ? direction.index : 3;
        let nextKey = (direction.index > 3) ? direction.index : 0;
        return [
            stats[prevKey], stats[direction.index], stats[nextKey]
        ];
    }

    getDistancesToFood(){
        let distances = {
            right: this.game.foodItem.getPositionInGrid().x - this.game.getSnake().head.position.x,
            left: this.game.getSnake().head.position.x - this.game.foodItem.getPositionInGrid().x,
            up: this.game.getSnake().head.position.y - this.game.foodItem.getPositionInGrid().y,
            down: this.game.foodItem.getPositionInGrid().y - this.game.getSnake().head.position.y,
        };
        if (distances.right < 0) {
            distances.right = 0;
        }
        for (let key in distances) {
            if (distances[key] < 0) {
                distances[key] = 0;
            }
        }
        return distances;
    }

}

module.exports = GameState;