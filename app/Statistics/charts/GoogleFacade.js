const Chart = require('./Chart.js');
const TableChart = require('./TableChart.js');

class GoogleFacade {
    constructor(game) {
        this.game = game;
        this.installCharts();
    }

    installCharts() {
        google.charts.load('current', {'packages': ['corechart', 'table']});
        google.charts.setOnLoadCallback(() => {
            this.initCharts();
            this.initDataSetting();
        });
    }

    initCharts() {
        this.chart = new Chart({
            container: 'chart',
        });

        this.tableChart = new TableChart({
            container: 'table-chart',
        });
    }

    initDataSetting() {
        this.game.population.on('populationEnd', (population) => {
            this.chart.addData([
                population.generation.number,
                population.generation.getFitnessSum(),
                population.generation.getAverageFitness(),
            ]);
            if (!this.game.fastLearning) {
                this.chart.drawChart();
            }
        });

        this.game.on('fastLearningEnd', game => {
            if (!this.game.fastLearning) {
                this.chart.drawChart();
            }
        });

        this.game.on('snakeDie', snake => {
            this.tableChart.addData([
                this.game.population.generation.number,
                snake.id,
                snake.fitness,
                snake.bodySize,
            ]);
            if (!this.game.fastLearning) {
                this.tableChart.drawChart();
            }
        });
    }
}

module.exports = GoogleFacade;