const classMcBot = require('../../minecraft/main')

module.exports = async (bot,message,args,argsF) => {
	console.log(`user ${message.user.username}#${message.user.discriminator} on server \"${message?.member?.guild?.name}\" want to tell \"${args.msg}\"`)
	message.reply({
		content: "sended",
		ephemeral: true
	})
	
};
module.exports.names = ["send"]; //У неё есть название
module.exports.interaction = { //И слэш команда
	name: 'send', //И название должно быть такое, как у команды
	description: 'send message to console',
	defaultPermission: true,
	options: [
		{
			name: 'msg',
			description: 'msg for console',
			type: 3,
			required: true,
		},
	],
};