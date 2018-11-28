var jsdom = require('jsdom');
const {JSDOM} = jsdom;
const GameObjectState = require('../../app/engine/GameObjectState.js');
const Engine = require('../../app/engine/Engine.js');


let dom = new JSDOM(`<!DOCTYPE html>`);
let engine = new Engine({
    document: dom.window.document,
    states: PrepareStates(),
    canvasSettings: {
        width: 400,
        height: 400,
        style: {
            margin: "10px"
        }
    }
});


function PrepareStates() {
    return [
        new GameObjectState('default', '#00FFFF'),
        new GameObjectState('wall', '#003b62'),
        new GameObjectState('body', '#00a842'),
        new GameObjectState('head', '#d75600'),
    ]
}

module.exports = engine;