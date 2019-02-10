class Chart {
    constructor(params) {
        Object.assign(this, params);
        this.wasSetup = false;
        if (typeof google !== "undefined") {
            this.setup()
        }
    }

    setup() {
        if (!this.wasSetup) {
            this.wasSetup = true;
            this.createChart();
            this.chartOptions = {
                title: 'Snakes Learning curve',
                curveType: 'function',
                width: 1300,
                legend: {position: 'bottom'}
            };
            this.data = [
                ['Generation', 'Fitness Sum', 'Best snake moves', 'Average fitness'],
            ];
            this.afterBaseLearning = false;
            this.population.onPopulationEnd = (population) => {
                this.addData([
                    population.generation.number,
                    population.generation.getFitnessSum(),
                    population.generation.getBestSnake().moves,
                    population.generation.getAverageFitness(),
                ]);
                if (this.afterBaseLearning) {
                    this.drawChart();
                }
            };

            this.game.onBaseLearningEnd = () => {
                this.afterBaseLearning = true;
                this.drawChart();
            };
        }
    }

    addData(newData) {
        if (this.data.length > 200) {
            this.data.splice(1, 1);
        }
        this.data.push(newData);
    }

    drawChart() {
        if (typeof this.chart !== 'undefined') {
            let table = google.visualization.arrayToDataTable(this.data)
            this.chart.draw(table, this.chartOptions);
        }
    }

    createChart() {
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(() => {
            this.setup();
            this.initChart()
        });
    }

    initChart() {
        this.chart = new google.visualization.LineChart(document.getElementById(this.container));
        this.drawChart();
    }
}

module.exports = Chart;