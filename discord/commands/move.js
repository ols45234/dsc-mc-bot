module.exports = async (bot,message,args,argsF) => {
	message.reply({
		content: "moving...",
		ephemeral: true
	}).then(() => {
        if(args.state == true || args.state == false)
		    bot.mcBot[args.id].bot.setControlState(args.element, args.state)
        else
            message.reply({
                content: `control ${args.element} is ${bot.mcBot[args.id].bot.getControlState(args.elemet)}`,
                ephemeral: true
            })
	})
	
};
module.exports.names = ["control"]; //У неё есть название
module.exports.interaction = { //И слэш команда
	name: 'control', //И название должно быть такое, как у команды
	description: 'allows you to move bot',
	defaultPermission: true,
	options: [
		{
			name: 'id',
			description: 'bot\'s id',
			type: 4,
			required: true,
		},
		{
			name: 'control',
			description: '(forward, back, left, right, jump, sprint, sneak) you can use it to control your bot\'s movment',
			type: 3,
			required: true,
		},
        {
			name: 'state',
			description: 'state. Leave empty to get control\'s state',
			type: 5,
		},
        
	],
};