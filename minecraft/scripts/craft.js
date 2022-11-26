
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
			if(messageStr.includes(prefix + 'craft'))
				this.craftItem(tokens[2], tokens[1])
		
		})
	}
	async craftItem (name, amount) {
		amount = parseInt(amount, 10)

		const item = this.mcData.itemsByName[name]
		const craftingTableID = this.mcData.blocksByName.crafting_table.id

		const craftingTable = this.bot.findBlock({
			matching: craftingTableID
		})

		if (item) {
			const recipe = this.bot.recipesFor(item.id, null, 1, craftingTable)[0]
			if (recipe) {
				this.bot.chat(`I can make ${name}`)
				try {
					await bot.craft(recipe, amount, craftingTable)
					this.bot.chat(`did the recipe for ${name} ${amount} times`)
				} catch (err) {
					this.bot.chat(`error making ${name}`)
				}
			} else {
				this.bot.chat(`I cannot make ${name}`)
			}
		} else {
			this.bot.chat(`unknown item: ${name}`)
		}
	}

}

module.exports = script