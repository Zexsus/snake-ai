const config = require('../../config.js');

class TableChart {
    constructor(params) {
        Object.assign(this, params);
        this.wasSetup = false;
        this.setup();
        this.initChart();
    }

    setup() {
        if (!this.wasSetup) {
            this.wasSetup = true;
            this.chartOptions = {
                title: 'Snakes Learning curve',
                pageSize: config.generationSize,
            };
            this.data = [
                ['Generation', 'ID', 'Fitness', 'Body size'],
            ];
            this.afterBaseLearning = false;
        }
    }

    initChart() {
        this.chart = new google.visualization.Table(document.getElementById(this.container));
        this.drawChart();
    }

    drawChart() {
        if (typeof this.chart !== 'undefined') {
            let table = google.visualization.arrayToDataTable(this.data);
            this.chart.draw(table, this.chartOptions);
        }
    }

    addData(newData) {
        if (this.data.length > 50) {
            this.data.splice(49, 1);
        }
        this.data.splice(1, 0, newData);
        // this.data.push(newData);
    }
}

module.exports = TableChart;