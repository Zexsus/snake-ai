var expect = require("chai").expect;
let engine = require('./mock/mock-engine.js');
const Rectangle = require('../app/engine/Rectangle.js');
const Vector2D = require('../app/engine/Vector2D.js');

describe("Engine", function () {
    it('Create canvas with properties', function () {
        let canvas = engine.canvas;

        expect(canvas).to.exist;
        expect(canvas.width).to.be.equal(400);
        expect(canvas.height).to.be.equal(400);
        expect(canvas.style.margin).to.be.equal('10px');
    });


    it('Centeralize GameObjects to themselves', function () {
        let rectangle1 = new Rectangle(engine, new Vector2D(0, 0), new Vector2D(100, 300), engine.getState('default'));
        let rectangle2 = new Rectangle(engine, new Vector2D(500, 500), new Vector2D(20, 20), engine.getState('default'));

        engine.centeralize(rectangle2, rectangle1);

        expect(rectangle2.position).to.be.eql({
            x: 40,
            y: 140
        })
    });

    it('Centeralize GameObjects to canvas', function () {
        let rectangle1 = new Rectangle(engine, new Vector2D(0, 0), new Vector2D(100, 300), engine.getState('default'));

        engine.centeralize(rectangle1, engine.canvas);
        expect(rectangle1.position).to.be.eql({
            x: 150,
            y: 50
        })
    });
});