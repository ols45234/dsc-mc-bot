const mineflayer = require('mineflayer');
const config = require('./config.json');
const classDo = require('./utils')
const classHoUtils = require('./hoWorldUtils')
const classCmds = require('./cmds')
const classLoader = require('./loader')
const EventEmitter = require('events')

class mcBot extends EventEmitter {
	constructor(appArgs, playerName) {
		super()
		this.appArgs = appArgs
		this.config = config
		this.bot = mineflayer.createBot({
			host: this.appArgs.server ? this.appArgs.server : config.ip,
			username: playerName,
			port: parseInt(this.appArgs.port ? this.appArgs.port : config.port),
			version: config.version,
		});

		this.Do = new classDo(this.bot);
		this.cmds = new classCmds(this.bot, this.config)
		this.hoWorldUtils = new classHoUtils(this.bot, this.config, this.appArgs);

		this.bot.scLoader = new classLoader(this.bot, this.config, this.appArgs)
		
		this.bot.on('captcha', captcha => this.emit('captcha', captcha))
		this.bot.on('msgToDiscord', msg => this.emit('msgToDiscord', msg))

		this.bot.once('spawn', () => { // стерлочная, чтобы this не ссылался на функцию
			setTimeout(() => {this.hoWorldUtils.inLobby()}, 5000);
		});

		this.bot.on('kicked', (err) => {
			this.Do.log(err);
			//process.exit(-1);
			this.emit('msgToDiscord', err)
		});
		this.bot.on('end', (err) => {
			this.Do.log(err);
			//process.exit(-2);
			this.emit('msgToDiscord', err)
		});
		this.bot.on('error', (err) => {
			this.Do.log('ERROR OCCURED,EXITING');
			this.Do.log(err);
			//process.exit(1);
			this.emit('msgToDiscord', err)
		});
		this.on('command', (cmd) => {
			this.Do.log(cmd)
		})
	}
	
}

module.exports = mcBot