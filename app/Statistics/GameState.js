const CollisionDistance = require("./CollisionDistance.js");
const FoodDistance = require("./FoodDistance.js");

class GameState {

    /**
     * @param {Game} game
     */
    constructor(game){
        this.game = game;
        this.collisionDistance = new CollisionDistance();
    }

    getStatisticsArray(snakeDirection) {
        let stats = {
            collisionDistance: this.getCollisionDistance(),
            foodDistances: this.getDistancesToFood(),
        };

        return [
            ...GameState.getStatsDistancesByDirection(snakeDirection, stats.collisionDistance),
            ...GameState.getStatsDistancesByDirection(snakeDirection, stats.foodDistances),
        ]
    }

    getCollisionDistance() {
        this.collisionDistance.initStartDistances();
        let distances = this.collisionDistance.get(this.game.getSnake().position, this.game.grid);
        return [distances.up, distances.right, distances.down, distances.left];
    }

    getDistancesToFood() {
        let distances = FoodDistance.get(this.game.foodItem.getPositionInGrid(), this.game.getSnake().head.position);
        return [distances.up, distances.right, distances.down, distances.left];
    }

    /**
     * @param {Direction} direction
     * @param {Array<number>} stats
     */
    static getStatsDistancesByDirection(direction, stats) {

        let prevKey = direction.index - 1;
        if (prevKey < 0) prevKey = 3;

        let nextKey = direction.index + 1;
        if (nextKey > 3) nextKey = 0;

        return [
            stats[prevKey], stats[direction.index], stats[nextKey]
        ];
    }
}

module.exports = GameState;