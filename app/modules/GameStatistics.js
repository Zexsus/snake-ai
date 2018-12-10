class GameStatistics{

    /**
     * @param {Snake} snake
     * @param {Grid} grid
     * @param {Game} game
     */
    constructor(game){
        this.game = game;
    }

    getStatistics(){
        let dataStats = {
            direction : this.game.snake.direction,
            wallDistances: this.getDistancesToWall(),
            bodyDistances: this.getDistancesToBody(),
            foodDistances: this.getDistancesToFood(),
        };

        return dataStats;
    }

    getDistancesToWall(){
        let distances = {
            right: this.game.grid.size.x - this.game.snake.head.position.x - 1,
            left: this.game.snake.head.position.x,
            up: this.game.snake.head.position.y,
            down: this.game.grid.size.y - this.game.snake.head.position.y - 1
        };

        return distances;
    }

    getDistancesToBody(){
        let nextBodyUp = null;
        let nextBodyDown = null;
        let nextBodyRight = null;
        let nextBodyLeft = null;

        this.game.grid.eachInColumn(this.game.snake.head.position.x, (item) => {
            if(item.getPositionInGrid().y < this.game.snake.head.position.y){
                if(item.hasState("body")){
                    nextBodyUp = item.getPositionInGrid().y;
                }
            }else{
                if(item.hasState("body")){
                    nextBodyDown = item.getPositionInGrid().y;
                }
            }
        });

        this.game.grid.eachInRow(this.game.snake.head.position.y, (item) => {
            if(item.getPositionInGrid().x < this.game.snake.head.position.x){
                if(item.hasState("body")){
                    nextBodyLeft = item.getPositionInGrid().x;
                }
            }else{
                if(item.hasState("body")){
                    nextBodyRight = item.getPositionInGrid().x;
                }
            }
        });

        let distances = {
            right: (nextBodyRight !== null) ? nextBodyRight - this.game.snake.head.position.x : 0,
            left: (nextBodyLeft !== null) ? this.game.snake.head.position.x - nextBodyLeft : 0,
            top: (nextBodyUp !== null) ? this.game.snake.head.position.y - nextBodyUp : 0,
            bottom: (nextBodyDown !== null) ? this.game.snake.head.position.y - nextBodyDown : 0
        };

        return distances;
    }

    getDistancesToFood(){
        let distances = {
            right: this.game.foodItem.getPositionInGrid().x - this.game.snake.head.position.x,
            left: this.game.snake.head.position.x - this.game.foodItem.getPositionInGrid().x,
            up: this.game.snake.head.position.y - this.game.foodItem.getPositionInGrid().y,
            down:  this.game.foodItem.getPositionInGrid().y - this.game.snake.head.position.y,
        };

        return distances;
    }

}

module.exports = GameStatistics;