class load {
	constructor(bot, config, appArgs) {
		this.bot = bot
		this.config = config
		this.appArgs = appArgs
	}
	loadJS(scriptname){
		console.log(scriptname)
		let script = require(`./scripts/${scriptname}`)
		return new script(this.bot, this.config, this.appArgs)
	}
}

module.exports = load