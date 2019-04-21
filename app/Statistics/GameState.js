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

    getStatistics(){
        return {
            collisionDistance: this.getCollisionDistance(),
            foodDistances: this.getDistancesToFood(),
        };
    }

    getCollisionDistance() {
        this.collisionDistance.initStartDistances();
        let distances = this.collisionDistance.get(this.game.getSnake().position, this.game.grid);
        return [distances.up, distances.right, distances.down, distances.left];
    }

    getStatisticsArray(snakeDirection) {
        let stats = this.getStatistics();

        return [
            ...this.getStatsDistancesByDirection(snakeDirection, stats.collisionDistance),
            ...this.getStatsDistancesByDirection(snakeDirection, stats.foodDistances),
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
        return FoodDistance.get(this.game.foodItem.getPositionInGrid(), this.game.getSnake().head.position);
    }

}

module.exports = GameState;