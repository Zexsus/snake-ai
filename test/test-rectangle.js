let expect = require("chai").expect;
let engine = require('./mock/mock-engine.js');

const Rectangle = require('../app/gameObjects/Rectangle.js');
const Vector2D = require('../app/engine/Vector2D.js');

describe("Rectangle", function () {
    let rectangle = new Rectangle(engine, new Vector2D(0, 10), new Vector2D(100, 300), engine.getState('default'));

    it('Has proper position', function () {
        expect(rectangle.position.x).to.be.equal(0);
        expect(rectangle.position.y).to.be.equal(10);
    });


    it('Has proper size', function () {
        expect(rectangle.size.x).to.be.equal(100);
        expect(rectangle.size.y).to.be.equal(300);
    });

    it("Draws itself", function () {
        rectangle.draw();
        var pixelData = rectangle.ctx.getImageData(1, 11, 1, 1);

        expect(pixelData.data.toString()).to.be.equal('0,255,255,255');
    });

    it('Have proper position after move', function () {
        rectangle.move(new Vector2D(20, 70));
        expect(rectangle.position.x).to.be.equal(20);
        expect(rectangle.position.y).to.be.equal(80);

    });

    it('Moves', function () {
        var pixelData = rectangle.ctx.getImageData(1, 11, 1, 1);
        expect(pixelData.data.toString()).to.not.equal('0,255,255,255');
    });
});