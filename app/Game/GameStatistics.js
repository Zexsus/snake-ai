class GameStatistics{

    /**
     * @param {Game} game
     */
    constructor(game){
        this.game = game;
    }

    getStatistics(){
        return {
            direction: this.game.getSnake().direction,
            wallDistances: this.getDistancesToWall(),
            bodyDistances: this.getDistancesToBody(),
            foodDistances: this.getDistancesToFood(),
        };
    }

    getStatisticsArray() {
        let stats = this.getStatistics();
        return [
            stats.wallDistances.right, stats.wallDistances.left, stats.wallDistances.up, stats.wallDistances.down,
            stats.bodyDistances.right, stats.bodyDistances.left, stats.bodyDistances.up, stats.bodyDistances.down,
            stats.foodDistances.right, stats.foodDistances.left, stats.foodDistances.up, stats.foodDistances.down,
        ]
    }

    getDistancesToWall(){
        return {
            right: this.game.grid.size.x - this.game.getSnake().head.position.x - 2,
            left: this.game.getSnake().head.position.x - 1,
            up: this.game.getSnake().head.position.y - 1,
            down: this.game.grid.size.y - this.game.getSnake().head.position.y - 2
        };
    }

    getDistancesToBody(){
        let nextBodyUp = null;
        let nextBodyDown = null;
        let nextBodyRight = null;
        let nextBodyLeft = null;

        this.game.grid.eachInColumn(this.game.getSnake().head.position.x, (item) => {
            if (item.getPositionInGrid().y < this.game.getSnake().head.position.y) {
                if(item.hasState("body")){
                    nextBodyUp = item.getPositionInGrid().y;
                }
            }else{
                if(item.hasState("body") && nextBodyDown === null){
                    nextBodyDown = item.getPositionInGrid().y;
                }
            }
        });

        this.game.grid.eachInRow(this.game.getSnake().head.position.y, (item) => {
            if (item.getPositionInGrid().x < this.game.getSnake().head.position.x) {
                if(item.hasState("body")){
                    nextBodyLeft = item.getPositionInGrid().x;
                }
            }else{
                if(item.hasState("body") && nextBodyRight === null){
                    nextBodyRight = item.getPositionInGrid().x;
                }
            }
        });
        return {
            right: (typeof nextBodyRight === 'number') ? nextBodyRight - this.game.getSnake().head.position.x : 0,
            left: (typeof nextBodyLeft === 'number') ? this.game.getSnake().head.position.x - nextBodyLeft : 0,
            up: (typeof nextBodyUp === 'number') ? this.game.getSnake().head.position.y - nextBodyUp : 0,
            down: (typeof nextBodyDown === 'number') ? nextBodyDown - this.game.getSnake().head.position.y : 0
        };
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

module.exports = GameStatistics;