class script {
	constructor(bot, config, appArgs) {
		this.bot = bot
		this.config = config
		this.appArgs = appArgs
		this.bot.on('spawn', () => {
			setTimeout(() => {this.bot.chat('/home')}, 3000)
		})
		this.bot.on('message', msg => {
			let messageStr = msg.toString(); 
			if (messageStr.includes('home')) this.bot.chat('/home')
		})
	}
}

module.exports = script