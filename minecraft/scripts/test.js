class script {
	constructor(bot, config, appArgs) {
		this.bot = bot
		this.config = config
		this.appArgs = appArgs
		this.bot.on('message', msg => {
			let messageStr = msg.toString(); 
			if (messageStr.includes('say hello world')) this.bot.chat('Hello world!')
		})
	}
}

module.exports = script