const BodyPart = require('./BodyPart.js');
const NeuralNet = require('../Brain/NeuralNet.js');
const directions = require('../Game/Directions.js');

class Snake {
    constructor() {
        this.setDefaults();
        this.bodySize = 0;
        this.fitness = 0;
        this.moves = 0;
        this.directionChanges = 0;
        this.alive = true;
        this.brain = new NeuralNet(12, 16, 4);
    }

    setDefaults(){
        this.direction = null;
        this.head = new BodyPart({
            x: 0,
            y: 0
        })
    }

    move(){
        if(this.head.position === null) throw "There is no head position";
        this.head.move(this.direction);
        this.moves += 1;
        return this;
    }

    moveToDirection(direction){
        this.setDirection(direction);
        this.move();
        return this;
    }

    setDirection(direction){
        if (this.direction === null) {
            this.direction = direction;
            return this;
        }

        if (this.isWrongDirection(direction)) {
            console.error("You are trying to move snake in the oposite direction");
        } else {
            this.directionChanges += 1;
            this.direction = direction;
        }

        return this;
    }

    isWrongDirection(direction) {
        return (
            (direction.x === -1 && this.direction.x === 1) ||
            (direction.x === 1 && this.direction.x === -1) ||
            (direction.y === -1 && this.direction.y === 1) ||
            (direction.y === 1 && this.direction.y === -1)
        );
    }

    grow(){
        this.head.recreate();
        this.bodySize += 1;
        return this;
    }

    reset(){
        delete this.head;
        this.setDefaults();
    }

    die() {
        // console.log(this.brain.getDifferencesAverage(this.moves));
        this.alive = false;
    }

    /**
     * @return {Array.<BodyPart>}
     */
    getFullBody(){
        let body = [];
        let actualItem = this.head;
        while(actualItem.next !== null){
            body.push(actualItem);
            actualItem = actualItem.next;
        }

        // push last element
        body.push(actualItem);

        return body;
    }

    calcFitness() {
        this.fitness = this.directionChanges + this.moves + (this.bodySize - 2) ** 4;
    }

    clone() {
        let clone = new Snake();
        clone.brain = this.brain.clone();
        return clone;
    };

    crossover(snake) {
        let child = this.clone();
        child.brain = this.brain.crossover(snake.brain);
        return child;
    }

    mutate(rate) {
        this.brain.mutate(rate)
    }

    decideDirection(input) {
        let brainOutput = this.brain.output(input);
        brainOutput = brainOutput.matrix[0];
        let maxValue = 0;
        let chosenDirection = null;
        brainOutput.forEach((value) => {
            if (maxValue < value) {
                maxValue = value;
            }
        });

        brainOutput.forEach((value, index) => {
            if (maxValue === value) {
                chosenDirection = this.getDirectionByIndex(index);
                this.setDirection(chosenDirection);
                // console.log(
                //     // 'Snake decide',
                //     // index,
                //     // input,
                //     brainOutput
                // );
            }
        });
    }

    getDirectionByIndex(index) {
        if (index === 0) return directions.right;
        if (index === 1) return directions.left;
        if (index === 2) return directions.up;
        if (index === 3) return directions.down;
    }
}

module.exports = Snake;