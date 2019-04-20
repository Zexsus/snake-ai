var jsdom = require('jsdom');
const {JSDOM} = jsdom;
const gameObjectStates = require('../../app/Engine/GameObjectStates.js');
const Engine = require('../../app/Engine/Engine.js');


let dom = new JSDOM(`<!DOCTYPE html>`);
let engine = new Engine({
    document: dom.window.document,
    states: gameObjectStates,
    canvasSettings: {
        width: 400,
        height: 400,
        style: {
            margin: "10px"
        }
    }
});

module.exports = engine;