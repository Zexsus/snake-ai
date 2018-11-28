class GameObject {
    constructor(engine) {
        this.engine = engine;
        this.position = {
            x: null,
            y: null
        };

        this.size = {
            width: null,
            height: null
        };
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    setSize(width, height) {
        this.size.width = width;
        this.size.height = height;
    }


    move(x, y) {
        this.clear(this);
        this.lastPosition = this.position;

        this.position.x += x;
        this.position.y += y;

        this.draw();
    }

    changeState(state) {
        this.clear(this);
        this.state = state;
        this.draw();
    }

    draw() {
        throw new Error('You have to implement the method draw()');
    }

    clear() {
        throw new Error('You have to implement the method clear()');
    }
}

module.exports = GameObject;