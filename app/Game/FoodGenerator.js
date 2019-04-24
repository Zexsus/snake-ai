class FoodGenerator {
    /**
     * @param {GameObjectState} foodState
     * @param {Grid} grid
     * @param {Array.<Vector2D>}startFoodPositions
     */
    constructor(foodState, grid, startFoodPositions) {
        this.foodState = foodState;
        this.startFoodPositions = startFoodPositions;
        this.grid = grid;
        this.foodGenerated = 0;
    }

    /**
     * @returns {GridItem}
     */
    getNewFoodItem() {
        if (this.foodGenerated < this.startFoodPositions.length) {
            this.foodItem = this.grid.getItem(this.startFoodPositions[this.foodGenerated]);
            this.foodGenerated++;
        } else {
            this.foodItem = this.getRandomFoodItem();
        }
        this.foodItem.setState(this.foodState);
        return this.foodItem;
    }

    /**
     * @returns {GridItem}
     */
    getRandomFoodItem() {
        let randomItem = this.grid.getRandomItemWithout(['wall', 'head', 'body', 'food']);
        randomItem.setState(this.foodState);
        return randomItem;
    }

    reset() {
        this.foodGenerated = 0;
    }
}

module.exports = FoodGenerator;