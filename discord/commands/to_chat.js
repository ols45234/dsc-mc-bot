
module.exports = async (bot,message,args,argsF) => {
	message.reply({
		content: "sended",
		ephemeral: true
	}).then(() => {
		bot.mcBot[args.id].cmds.send(args.msg)
	})
	
};
module.exports.names = ["chat"]; //У неё есть название
module.exports.interaction = { //И слэш команда
	name: 'chat', //И название должно быть такое, как у команды
	description: 'send message to minecraft chat',
	defaultPermission: true,
	options: [
		{
			name: 'id',
			description: 'bot\'s id',
			type: 4,
			required: true,
		},
		{
			name: 'msg',
			description: 'msg for chat',
			type: 3,
			required: true,
		},
	],
};