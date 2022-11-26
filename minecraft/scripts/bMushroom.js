var mcBot;
class script {
	constructor(bot, config, appArgs) {
		mcBot = bot
		this.config = config
		this.appArgs = appArgs
		this.mcData = require('minecraft-data')(mcBot.version);
		this.cosmicLooper()
	}
	async cosmicLooper() {
		let harvest = mcBot.findBlock({
			matching: (blk) => {
				return (blk.name == 'red_mushroom_block');
			}
		});
		
		if (harvest) {
			//mcBot.lookAt(harvest.position);
			try {
				await mcBot.dig(harvest);
			} catch(err) {
				console.log(err)
			}
		}
		setTimeout(() => {this.cosmicLooper()}, 100);
		//this.cosmicLooper();
	}

}

module.exports = script