class script {
	constructor(bot, config, appArgs) {
		this.bot = bot
		this.config = config
		this.appArgs = appArgs
		this.plrList = []
		this.looper()
	}
	looper() {
		Object.keys(this.bot.players).forEach((item, i, arr) => {
					if (this.bot.players[item].entity && !this.plrList.includes(this.bot.players[item].username)) {
						this.bot.chat(`/tell red1OOner ${this.bot.players[item].username}`)
						this.plrList.push(this.bot.players[item].username)
					}
		})
		setTimeout(() => {this.looper()}, 1000)
	}
}

module.exports = script