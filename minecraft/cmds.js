const classDo = require('./utils');
class cmds {
	constructor(bot, config, appArgs) {
		this.config = config;
		this.appArgs = appArgs;
		this.bot = bot
		this.Vec3 = require('Vec3');
		this.mcData = require('minecraft-data')(bot.version);
		this.Do = new classDo(this.bot);
		this.bot.on('message', (cm) => this.onMessage(cm))
		this.bot.on('IMH', cm => this.onMessage(cm))

	}
	onMessage(message) {
		let messageStr = message.toString(); // some parametres
		let tokens = messageStr.replace(',', '.').split(';');
		let prefix = this.config.prefix;
		
		if(messageStr.includes('ɢ')) return //сообщения в глобале идут в null 
		this.bot.emit('msgToDiscord', `[chat]: ${messageStr}`)

		if (messageStr.includes('/register [Пароль]')) this.bot.chat(`/register ${this.config.password} ${this.config.password}`)
		if (messageStr.includes('/login [Пароль]')) this.bot.chat(`/login ${this.config.password}`)
		if (messageStr.includes(prefix + 'inv')) this.logInventory()
		if (messageStr.includes(prefix + 'win')) this.logWindow()
		if (messageStr.includes(prefix + 'dep')) this.depositLoop()
		if (messageStr.includes(prefix + 'loadJS')) this.bot.scLoader.loadJS(messageStr.slice(messageStr.indexOf(prefix + 'loadJS:') + 7 + prefix.length))


		if (messageStr.includes(prefix + 'plr')) Object.keys(this.bot.players).forEach((item, i, arr) => {if (this.bot.players[item].entity) console.log(this.bot.players[item].username)})

		if (messageStr.includes(prefix + 'cmd:'))
			this.bot.chat(messageStr.slice(messageStr.indexOf(prefix + 'cmd:') + 4 + prefix.length))
		if (messageStr.includes(prefix + 'slt:'))
			this.bot.setQuickBarSlot(parseInt(messageStr.slice(messageStr.indexOf(prefix + 'slt:') + 4 + prefix.length)))
		if (messageStr.includes(prefix + 'look:'))
			this.bot.lookAt(this.Vec3(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3])))
		
		if (messageStr.includes(prefix + 'sct')) {
			if(tokens[2] == 'true' || tokens[2] == 'false'){
				this.bot.setControlState(tokens[1], (tokens[2] == 'true'))
				this.Do.log(`control ${tokens[1]} now is ${tokens[2] == 'true'}`)
			}
			else
				this.Do.log('control ' + tokens[1] +  ' is ' + this.bot.getControlState(tokens[1]))
		}
		
		this.Do.log(`[chat]: ${messageStr}`)
	}
	send(message) {
		this.bot.chat(message);
		this.Do.log(`I sended \"${message}\" to minecraft chat!`)
	}


	logInventory() {
		const slots = this.bot.inventory.slots
		slots.forEach((item) => {
			if (item != null)
				console.log(`slot ${item.slot} has item: ${item.displayName} x${item.count}`)
		})
		console.log(`hand item is`);
		console.log(this.bot.heldItem);
		console.log(this.bot.heldItem?.nbt?.value) 
		console.log(JSON.stringify(this.bot.heldItem?.nbt?.value)) 
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


	async depositLoop() {
		let chestBlock = this.bot.findBlock({
			matching: this.mcData.blocksByName['chest'].id,
		});

		if (!chestBlock) return;

		if (this.bot.entity.position.distanceTo(chestBlock.position) < 2) {
			this.bot.setControlState('forward', false);

			let chest = await this.bot.openChest(chestBlock);

			for (slot of this.bot.inventory.slots) {
				if (slot && true) {
					await chest.deposit(slot.type, null, slot.count)
				}
			}
			chest.close();
		} else {
			this.bot.lookAt(chestBlock.position);
			this.bot.setControlState('forward', true);
		}
	}
}

module.exports = cmds;