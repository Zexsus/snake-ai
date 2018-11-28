var expect = require("chai").expect;
let engine = require('./mock/mock-engine.js');

describe("Engine", function () {
    it('Create canvas with properties', function () {
        let canvas = engine.canvas;

        expect(canvas).to.exist;
        expect(canvas.width).to.be.equal(400);
        expect(canvas.height).to.be.equal(400);
        expect(canvas.style.margin).to.be.equal('10px');
    });

    it('Create rectangle', function () {
        let rectangle = engine.createRectangle({
            x: 0, y: 10, width: 100, height: 300,
            state: engine.getState('default')
        });

        expect(rectangle).to.be.a('object');
    });

    it('Centeralize GameObjects to themselves', function () {
        let rectangle1 = engine.createRectangle({
            x: 0, y: 0, width: 100, height: 300,
            state: engine.getState('default')
        });

        let rectangle2 = engine.createRectangle({
            x: 500, y: 500, width: 20, height: 20,
            state: engine.getState('default')
        });

        engine.centeralize(rectangle2, rectangle1);

        expect(rectangle2.position).to.be.eql({
            x: 40,
            y: 140
        })
    });

    it('Centeralize GameObjects to canvas', function () {
        let rectangle1 = engine.createRectangle({
            x: 0, y: 0, width: 100, height: 300,
            state: engine.getState('default')
        });

        engine.centeralize(rectangle1, engine.canvas);

        expect(rectangle1.position).to.be.eql({
            x: 150,
            y: 50
        })
    });
});