class Chart {
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
                curveType: 'function',
                width: 1300,
                legend: {position: 'bottom'}
            };
            this.data = [
                ['Generation', 'Fitness Sum', 'Average fitness'],
            ];
            this.afterBaseLearning = false;
        }
    }

    initChart() {
        this.chart = new google.visualization.LineChart(document.getElementById(this.container));
        this.drawChart();
    }

    drawChart() {
        if (typeof this.chart !== 'undefined') {
            let table = google.visualization.arrayToDataTable(this.data);
            this.chart.draw(table, this.chartOptions);
        }
    }

    addData(newData) {
        if (this.data.length > 200) {
            this.data.splice(1, 1);
        }
        this.data.push(newData);
    }
}

module.exports = Chart;