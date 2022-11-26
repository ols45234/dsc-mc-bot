const {IntentsBitField, Partials, Client} = require('discord.js'),
    config = require('./config.json');
config.cfg = {
    ...config.cfg,
    intents: new IntentsBitField(config.cfg.intents),
    partials: [Partials.Channel]
};

    
const discordBot = new Client(config.cfg);
discordBot.login(config.token);

const DiscordDB = require('simple-discord.db'); //Память
discordBot.Memory = new DiscordDB("Memory", discordBot); //Памятная память
discordBot.Memory.save();

require('./handlers')(discordBot); //Запуск handler'ов
require('./events')(discordBot); //Запуск ивентов