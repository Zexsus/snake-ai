const BodyPart = require('./BodyPart.js');

class Snake {
    constructor() {
        this.direction = null;
        this.head = new BodyPart({
            x: 0,
            y: 0
        })
    }

    move(){
        this.head.move(this.direction);
    }

    moveToDirection(direction){
        this.setDirection(direction);
        this.move();
    }

    setDirection(direction){
        this.direction = direction;
    }
}

module.exports = Snake;