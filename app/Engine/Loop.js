var EventEmitter = require('eventemitter3');

class Loop extends EventEmitter {
    constructor(params) {
        super();
        this.fps = params.fps;
        this.updateFunctions = [];
        this.fpsInterval = null;
        this.startTime = null;
        this.now = null;
        this.then = null;
        this.elapsed = null;

        this.engineLoop(this.fps);
    }

    pushFunction(callback) {
        this.updateFunctions.push(callback);
    };

    engineLoop(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.runUpdateFunctions();
    };

    runUpdateFunctions() {
        if (typeof requestAnimationFrame === "function") {
            requestAnimationFrame(() => {
                this.runUpdateFunctions();
            });
        }

        this.now = Date.now();
        this.elapsed = this.now - this.then;

        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.emit('update', this);
            this.updateFunctions.forEach(function (that) {
                that();
            });
        }
    }
}

module.exports = Loop;