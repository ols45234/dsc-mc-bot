module.exports = async (bot,message,args,argsF) => {
	message.reply({
		content: "click...",
		ephemeral: true
	}).then(() => {
		bot.mcBot[args.id].bot.clickWindow(args.slot, 0, 0)
	})
	
};
module.exports.names = ["wc"]; //У неё есть название
module.exports.interaction = { //И слэш команда
	name: 'wc', //И название должно быть такое, как у команды
	description: 'window click',
	defaultPermission: true,
	options: [
		{
			name: 'id',
			description: 'bot\'s id',
			type: 4,
			required: true,
		},
		{
			name: 'slot',
			description: 'window\'s slot id',
			type: 4,
			required: true,
		},
	],
};