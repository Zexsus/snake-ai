const GameObjectState = require("./GameObjectState.js");

module.exports = [
    new GameObjectState('default', '#a4f2ff', false),
    new GameObjectState('wall', '#003b62', true),
    new GameObjectState('food', '#fffa00', false),
    new GameObjectState('body', '#00a842', true),
    new GameObjectState('head', '#d75600', false),
];