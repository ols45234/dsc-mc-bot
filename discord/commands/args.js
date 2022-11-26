module.exports = async (bot,message,args,argsF) => {
	message.reply({
		content: "sended",
		ephemeral: true
	}).then(() => {
		console.log(bot)
		console.log(message)
		console.log(args)
		console.log(argsF)
	})
	
};
module.exports.names = ["test"]; //У неё есть название
module.exports.interaction = { //И слэш команда
	name: 'test', //И название должно быть такое, как у команды
	description: 'test',
	defaultPermission: true,
	options: [
		{
			name: 'msg',
			description: 'msg',
			type: 3,
			required: true,
		},
		{
			name: 'afk',
			description: 'if true, bot will stand afk',
			type: 5,
		},
	],
};