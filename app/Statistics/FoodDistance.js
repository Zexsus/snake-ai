class FoodDistance {
    static get(foodPosition, headPosition) {
        let distances = {
            right: foodPosition.x - headPosition.x,
            left: headPosition.x - foodPosition.x,
            up: headPosition.y - foodPosition.y,
            down: foodPosition.y - headPosition.y,
        };
        return distances;
    }
}

module.exports = FoodDistance;