class GameStatistics{

    /**
     *
     * @param {Game} game
     */
    constructor(snake, grid){
        this.grid = grid;
        this.snake = snake;
    }

    getStatistics(){
        let dataStats = {
            direction : this.snake.direction,
            wallDistances: this.getDistancesToWall(),
            bodyDistances: this.getDistancesToBody(),
            foodDistances: this.getDistancesToFood(),
        };

        return dataStats;
    }

    getDistancesToWall(){
        let distances = {
            right: this.grid.colsCount - this.snake.head.position.x,
            left: this.snake.head.position.x,
            up: this.snake.head.position.y,
            down: this.grid.rowsCount - this.snake.head.position.y
        };

        return distances;
    }

    getDistancesToBody(){
        let nextBodyUp = null;
        let nextBodyDown = null;
        let nextBodyRight = null;
        let nextBodyLeft = null;

        this.grid.eachInColumn(this.snake.head.position.x, (item, row, column) => {
            if(row < this.snake.head.position.y){
                if(item.hasState("body")){
                    nextBodyUp = row;
                }
            }else{
                if(item.hasState("body")){
                    nextBodyDown = row;
                }
            }
        });

        this.grid.eachInRow(this.snake.head.position.y, (item, r0w, column) => {
            if(column < this.snake.head.position.x){
                if(item.hasState("body")){
                    nextBodyLeft = column;
                }
            }else{
                if(item.hasState("body")){
                    nextBodyRight = column;
                }
            }
        });

        let distances = {
            right: (nextBodyRight !== null) ? nextBodyRight - this.snake.head.position.x : 0,
            left: (nextBodyLeft !== null) ? this.snake.head.position.x - nextBodyLeft : 0,
            top: (nextBodyUp !== null) ? this.snake.head.position.y - nextBodyUp : 0,
            bottom: (nextBodyDown !== null) ? this.snake.head.position.y - nextBodyDown : 0
        };

        return distances;
    }

    getDistancesToFood(){
        let distances = {
            right: 0,
            left: 0,
            up: 0,
            down: 0
        };

        return distances;
    }

}

module.exports = GameStatistics;