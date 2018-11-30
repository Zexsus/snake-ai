const BodyPart = require('./BodyPart.js');

class Snake {
    constructor() {
        this.setDefaults();
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
        return this;
    }

    moveToDirection(direction){
        this.setDirection(direction);
        this.move();
        return this;
    }

    setDirection(direction){
        if(!this.isProperDirection(direction))
            console.error("You are trying to move snake in the oposite direction");
        else
            this.direction = direction;

        return this;
    }

    isProperDirection(direction){
        return (this.direction === null || ( direction.x + this.direction.x !== 0 && direction.y + this.direction.y !== 0));
    }

    grow(){
        this.head.recreate();
        return this;
    }

    reset(){
        delete this.head;
        this.setDefaults();
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
}

module.exports = Snake;