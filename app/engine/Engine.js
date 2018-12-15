const Loop = require('./Loop.js');
const GameObject = require('../gameObjects/GameObject.js');
const Vector2D = require('./Vector2D.js');

class Engine {

    /**
     * @param {Object} params - params to setup engine
     * @param {Array.<GameObjectState>} params.states
     * @param {HTMLDocument} params.document
     * @param {int} params.fps
     */
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

    /**
     * @param {string} name
     * @returns {GameObjectState}
     */
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

    /**
     * @param {GameObject} object
     * @param {GameObject | HTMLCanvasElement} toObject
     */
    centeralize(object, toObject) {
        let position  = new Vector2D(0, 0);
        if (object instanceof GameObject && !(toObject instanceof GameObject)) {
            let x = ((toObject.width) - object.getDisplaySize().x) / 2;
            let y = ((toObject.height) - object.getDisplaySize().y) / 2;
            position = new Vector2D(x, y);
        } else {
            let x = ((toObject.getDisplaySize().x) - object.getDisplaySize().x) / 2;
            let y = ((toObject.getDisplaySize().y) - object.getDisplaySize().y) / 2;
            position = new Vector2D(x, y);
        }
        object.setPosition(position);

    }
}

module.exports = Engine;