var expect = require("chai").expect;
var directions = require('../../app/Game/Directions');

var BodyPart = require('../../app/Snake/BodyPart');

describe('BodyPart', function () {

    beforeEach(function () {
        head = new BodyPart({
            x: 0,
            y: 0
        });

        bodyPart1 = head.recreate();
        bodyPart2 = bodyPart1.recreate();
    });

    describe('Move', function () {
        it('Right', function () {
            head.move(directions.right);
            expect(head.position).to.be.eql({x: 1, y: 0});
        });

        it('Down', function () {
            head.move(directions.down);
            expect(head.position).to.be.eql({x: 0, y: 1});
        });

        it('Left', function () {
            head.move(directions.left);
            expect(head.position).to.be.eql({x: -1, y: 0});
        });


        it('Up', function () {
            head.move(directions.up);
            expect(head.position).to.be.eql({x: 0, y: -1});
        });

        it('In sequence', function () {
            head.move(directions.down)
                .move(directions.right)
                .move(directions.right)
                .move(directions.down)
                .move(directions.up)
                .move(directions.up)
                .move(directions.down);

            expect(head.position).to.be.eql({x: 2, y: 1});
        });

    });

    describe('Body follow', function () {
        it('First move not follow', function () {
            head.move(directions.right);
            expect(head.position).to.be.eql({x:1, y:0});
            expect(bodyPart1.position).to.be.eql({x: 0, y: 0});
            expect(bodyPart2.position).to.be.eql({x: 0, y: 0});
        });

        it('Second move first item of body has last position of head, second item still in the same place', function () {
            head.move(directions.right).move(directions.right);
            expect(head.position).to.be.eql({x:2, y:0});
            expect(bodyPart1.position).to.be.eql({x: 1, y: 0});
            expect(bodyPart2.position).to.be.eql({x: 0, y: 0});
        });

        it('Third move first item of body has last position of head and second item get last position of first item', function () {
            head.move(directions.right).move(directions.right).move(directions.down);
            expect(head.position).to.be.eql({x:2, y:1});
            expect(bodyPart1.position).to.be.eql({x: 2, y: 0});
            expect(bodyPart2.position).to.be.eql({x: 1, y: 0});
        });

        it('Next move items has proper positions', function () {
            head.move(directions.right)
                .move(directions.right)
                .move(directions.down)
                .move(directions.right);

            expect(bodyPart1.position).to.be.eql({x: 2, y: 1});
            expect(bodyPart2.position).to.be.eql({x: 2, y: 0});
        });
    });

    describe('Recreate', function () {
        it('Recreate in last particle', function () {
            var bodyPart3 = head.recreate();
            expect(bodyPart2.next).to.be.equal(bodyPart3);
        });

        it('Has the same position after recreate', function(){
            head.recreate();
            expect(bodyPart2.next.position).to.be.eql(head.position);
        })
    });
});