const classMcBot = require('../../minecraft/main')
module.exports = async (bot,message,args,argsF) => {
	/*message.reply({
		content: `creating bot \"${args.name}\" ...`,
		ephemeral: true
	}).then(() => {
		mcbot = new classMcBot({
			server: args?.server, 
			port: args?.port,
			prefix: args?.prefix,
			afk: args?.afk,
			}, args.name)
		bot.mcBot.push(mcbot);
		message.channel.send(
		mcbot.on('captcha', captcha => {
			message.channel.send({
				files: [{
					attachment: `${__dirname}/../../temp/captcha.png`,
					name: 'captcha.png',
					description: 'A description of the file'
				}]
			})
		})
		mcbot.on('msgToDiscord', msg => message.channel.send(msg) )
	})*/
	message.reply({
		content: `reading bot list...`,
		ephemeral: true
	}).then(() => {
		bot.mcBot.forEach((item, i) => {
			message.channel.send(`id: ${i} username: ${item.bot.username} program: ${item.appArgs.program}`)
		})
	})
	
};
module.exports.names = ["list"]; //У неё есть название
module.exports.interaction = { //И слэш команда
	name: 'list', //И название должно быть такое, как у команды
	description: 'display list of bots',
	defaultPermission: true,
};