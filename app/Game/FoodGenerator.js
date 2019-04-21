class FoodGenerator {
    constructor(foodState) {
        this.foodState = foodState;
        this.startFoodPositions = [
            {
                x: 26,
                y: 6,
            },
            {
                x: 26,
                y: 26,
            },
            {
                x: 6,
                y: 26,
            },
            {
                x: 6,
                y: 6,
            },
        ];

        this.foodCount = 0;
    }

    setGrid(grid) {
        this.grid = grid;
    }

    getFoodItem() {
        if (this.foodCount < this.startFoodPositions.length) {
            this.foodItem = this.grid.getItem(this.startFoodPositions[this.foodCount]);
            this.foodCount++;
        } else {
            this.foodItem = this.getRandomFoodItem();
        }
        this.foodItem.setState(this.foodState);
        return this.foodItem;
    }

    getRandomFoodItem() {
        let randomItem = this.grid.getRandomItemWithout(['wall', 'head', 'body', 'food']);
        randomItem.setState(this.foodState);
        return randomItem;
    }
}

module.exports = FoodGenerator;