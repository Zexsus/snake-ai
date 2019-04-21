var expect = require("chai").expect;
const Population = require('../../app/Brain/Population.js');
let population = null;

describe('Population', function () {
    beforeEach(() => {
        population = new Population(10);
    });
});
