const McBot = require('./../main');
bot = new McBot({afk:true, consoleMode: true, pprogram:"wait:2000;chat:/l botbotbot;wait:1000;chat:/anarchy;wait:1000;windowClick:24;wait:1000;chat:/tpa red1OOner;wait:1000;chat:/missions;wait:1000;inter:fm#win", program:"wait:1000;chat:/l botbotbot;wait:1000;chat:/anarchy;wait:1000;windowClick:24;wait:1000;inter:fm#loadJS:burg;wait:2000;chat:/mission;wait:1000;inter:fm#get;wait:1000;exit"}, process.argv[2])
//setTimeout(() => {
//bot.emit('command', `command emitter!`)}, 10000)