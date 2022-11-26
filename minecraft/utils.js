class classDo {
    constructor(bot) {
        this.bot = bot;
    }
    getDistance(x1, y1, z1, x2, y2, z2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
    }
    getDistanceByVec3(v1,v2) {
        return this.getDistance(v1.x,v1.y,v1.z,v2.x,v2.y,v2.z);
    }
	getTime() {
        var now = new Date();
		return '[' + ("0" + now.getHours()).slice(-2) + ':' + ("0" + now.getMinutes()).slice(-2) + ':' + ("0" + now.getSeconds()).slice(-2) + '';
	}
    getXpLevel() {
        return ` Xp:${(this.bot.experience.level+this.bot.experience.progress).toFixed(2)}]`;
    }
    log(log) {
        console.log(this.getTime() + this.getXpLevel() + ' ' + log);
    }
    arrIncludes(arr, element) {
        arr.forEach(item => {
            if(item == element)
                return true 
        });
        return false
    }

}

module.exports = classDo