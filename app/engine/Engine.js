const Loop = require('./Loop.js');
const Rectangle = require('./Rectangle.js');

class Engine {
    constructor(params) {
        this.canvas = this.prepareCanvas(params.document, params.canvasSettings);
        this.ctx = this.getContext();
        this.states = params.states;
        this.loop = new Loop({
            fps: (!!params.fps) ? params.fps : 1
        });
    }

    update(callback) {
        this.loop.pushFunction(callback);
    }

    getContext() {
        return this.canvas.getContext('2d');
    };

    getState(name) {
        let statesWithName = this.states.filter((item) => {
            return (item.name === name);
        });

        if (statesWithName.length > 0) {
            return statesWithName[0];
        } else {
            throw "There is no such state with name: " + name;
        }
    }

    prepareCanvas(document, params) {
        let canvas = document.createElement('canvas');
        canvas.width = params.width;
        canvas.height = params.height;
        Object.assign(canvas.style, params.style);
        document.body.appendChild(canvas);
        return canvas;
    };

    createRectangle(params) {
        let rect = new Rectangle(this, params);
        rect.draw();
        return rect;
    }

    centeralize(object, toObject) {
        if (object instanceof GameObject && !(toObject instanceof GameObject)) {
            object.setPosition(
                ((toObject.width) - object.size.width) / 2,
                ((toObject.height) - object.size.height) / 2
            )
        } else {
            object.setPosition(
                ((toObject.size.width) - object.size.width) / 2,
                ((toObject.size.height) - object.size.height) / 2
            )
        }
    }
}

module.exports = Engine;