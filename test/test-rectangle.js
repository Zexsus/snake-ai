let expect = require("chai").expect;
let engine = require('./mock/mock-engine.js');

const Rectangle = require('../app/engine/Rectangle.js');

describe("Rectangle", function () {
    let rectangle = new Rectangle(engine, {
        x: 0, y: 10, width: 100, height: 300,
        state: engine.getState('default')
    });

    it('Has proper position', function () {
        expect(rectangle.position.x).to.be.equal(0);
        expect(rectangle.position.y).to.be.equal(10);
    });


    it('Has proper size', function () {
        expect(rectangle.size.width).to.be.equal(100);
        expect(rectangle.size.height).to.be.equal(300);
    });

    it("Draws itself", function () {
        rectangle.draw();
        var pixelData = rectangle.ctx.getImageData(1, 11, 1, 1);

        expect(pixelData.data.toString()).to.be.equal('0,255,255,255');
    });

    it('Have proper position after move', function () {
        rectangle.move(20, 70);
        expect(rectangle.position.x).to.be.equal(20);
        expect(rectangle.position.y).to.be.equal(80);

    });

    it('Moves', function () {
        var pixelData = rectangle.ctx.getImageData(1, 11, 1, 1);
        expect(pixelData.data.toString()).to.not.equal('0,255,255,255');
    });
});