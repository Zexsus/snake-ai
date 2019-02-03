class StatsDisplayer{

    /**
     * @param {GameStatistics} gameStatistics
     * @param {Document} document
     */
    constructor(gameStatistics, document){
        this.gameStats = gameStatistics;
        this.document = document;
    }

    display(){
        this.write('wall-distances', JSON.stringify(this.gameStats.getDistancesToWall()));
        this.write('body-distances', JSON.stringify(this.gameStats.getDistancesToBody()));
        this.write('food-distances', JSON.stringify(this.gameStats.getDistancesToFood()));
    }

    /**
     * @param {string} id
     * @param {string} content
     */
    write(id, content){
        this.clear(id);
        let item = this.document.getElementById(id);
        item.innerHTML = content;
    }

    /**
     * @param {string} id
     */
    clear(id){
        let item = this.document.getElementById(id);
        item.innerHTML = '';
    }
}

module.exports = StatsDisplayer;