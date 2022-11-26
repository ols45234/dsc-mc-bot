
class script {
	constructor(bot, config, appArgs) {
		this.bot = bot
		this.config = config
		this.appArgs = appArgs
		this.fs = require('fs')
		this.mcData = require('minecraft-data')(this.bot.version);
		this.bot.on('message', msg => this.onMessage(msg))
		this.bot.on('IMH', msg => this.onMessage(msg))
	}
	
	check() {
		const window = this.bot.currentWindow
		const slots = window?.slots
		if(!slots) return
		var items = [slots[38], slots[39], slots[40]]
		items.forEach((item, i, arr) => {
			let nbt = item.nbt.value
			let display = nbt.display.value
			
			let name = JSON.parse(display.Name.value) //в объекте
				.extra.map(item => item.text).join('') //в человечьем виде
			let lore =  display.Lore.value.value
				.map(i => JSON.parse(i).extra.map(j => j.text).join(''))
				.filter((elem, i) => i<4 && i>0)

			//console.log(display)
			//console.log(JSON.stringify(display))
			console.log(`${name} \n ${lore.join('\n')} \n\n`)
			this.fs.appendFile(`${name.slice(0, name.indexOf('|'))}.csv`, `${this.bot.username};${lore[1]}`, () => {})
		})
		//console.log(items)
		//console.log(JSON.stringify(items))
	}

	onMessage(msg) {
		let messageStr = msg.toString(); // some parametres
		let tokens = messageStr.replace(',', '.').split(';');
		let prefix = this.config.prefix;
		
		console.log('chat')
		if(messageStr.includes(prefix + 'get'))
			this.check()
		if(messageStr.includes(prefix + 'win'))
			this.logWindow()
	}
	
	logWindow() {
		const window = this.bot.currentWindow
		const slots = this.bot.currentWindow?.slots
		console.log(slots)
		slots.forEach(function(item, i, arr) {
			if(item != null && i <= window.inventoryStart)
				console.log(`slot ${item.slot} has item: ${item.displayName} x${item.count}`)
		})
	}

}

module.exports = script