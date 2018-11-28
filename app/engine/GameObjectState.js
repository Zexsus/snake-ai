class GameObjectState {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    getName() {
        return this.name;
    }

    getColor() {
        return this.color;
    }

}

module.exports = GameObjectState;