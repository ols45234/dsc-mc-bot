
class script {
	constructor(bot, config, appArgs) {
		this.bot = bot
		this.config = config
		this.appArgs = appArgs
		this.mcData = require('minecraft-data')(this.bot.version);
		this.bot.on('message', (msg) => {
			let messageStr = msg.toString(); // some parametres
			let tokens = messageStr.replace(',', '.').split(';');
			let prefix = this.config.prefix;
			
			console.log('chat')
			if(messageStr.includes(prefix + 'get'))
				this.check(tokens[1], tokens[2])
			if(messageStr.includes(prefix + 'win'))
				this.logWindow()
		
		})
	}
	
	check(serchingItem, maxCost) {
		const window = this.bot.currentWindow
		const slots = window?.slots
		var potion_costs = []
		slots.forEach((item, i, arr) => {
			if(item != null && i <= window?.inventoryStart && item?.name == serchingItem) {
				
				const potion_cost_string = item?.nbt?.value?.display?.value?.Lore?.value?.value[4];		
				const potion_cost_line = JSON.parse(potion_cost_string).extra			
				const potion_cost = +(potion_cost_line[potion_cost_line.length-1].text.replaceAll(' ', '').slice(0, -1))
				
				console.log(`I find a ${serchingItem} (x${item?.count}) it cost ${potion_cost}`)
				
				if(potion_cost < buyCostList[item.name])
					this.buyItem(item.slot)
				
				potion_costs.push(potion_cost)
			}
		})
		console.log(potion_costs)
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

	async buyItem(itemSlot) {
		this.bot.clickWindow(itemSlot, 0, 0);
		const [window] = await once(this.bot, 'windowOpen')
		this.bot.clickWindow(0, 0, 0);
	}

}

module.exports = script