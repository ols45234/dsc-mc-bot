const readline = require('readline');
const classDo = require('./utils');
const classFishing = require('./fishing');
const EventEmitter = require('events')
const PNGImage = require('pngjs-image');
const mapColors = require('./colors.json')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class utils {
    constructor(argsbot, config, appArgs) {
        this.appArgs = appArgs;
        this.config = config;
        this.bot = argsbot;

        this.MapData = '\n';
        this.FirstJoin = true;

        this.fishing = new classFishing(this.bot, this.config);
        this.Do = new classDo(this.bot);

        this.bot._client.on('map', ({ data }) => this.toFile(data));
        rl.on('close', () => {
            console.log('rl is closed.');
            process.exit(0);
        });
		this.bot.on('message', (cm) => this.onMessage(cm))
    }
	onMessage(message) {
        if (message.toString().includes('Вы были кикнуты с сервера')) this.inLobby()
		if (message.toString().includes('setupFishing')) this.setupFishing()
    }

    getColorHB(colorId) {
        if (colorId == 18 || colorId == 30 || colorId == 49) return '.'
        else return '#'
    }
    print(data) {
        if (!data) return;
        const size = Math.sqrt(data.length);
        this.MapData = '\n'
        for (let z = 0; z < size; z += 8) {
            for (let x = 0; x < size; x += 4) {
                this.MapData += this.getColorHB(data[x + (z * size)]);
            }
            this.MapData += '\n'
        }
        console.log(this.MapData);
        this.bot.emit('captcha', this.MapData)
        rl.question('Комп видит капчу, комп не может её решить. Помогите ему: ', (cap) => this.bot.chat(cap))
    }
	
	toFile(data) {
	
		if(!data) return;

		const size = Math.sqrt(data.length);
		const image = PNGImage.createImage(size, size);

		for(let x = 0; x < size; x++) {
			for(let z = 0; z < size; z++) {
				const colorId = data[x + (z * size)];
				image.setAt(x, z, this.getColor(colorId));
			}
		}
		image.writeImage(`${__dirname}/../temp/captcha.png`, (err) => {
			if (err) throw err;
			console.log('Written to the file');
			this.bot.emit('captcha', this.MapData)
		});
		if(this.appArgs.consoleMode) {
			rl.question('Комп видит капчу, комп не может её решить. Помогите ему: ', (cap) => this.bot.chat(cap))
		}
	}
    onServer() {
        this.Do.log('[FishBot]: Joined in the game');
		//this.bot.setControlState('forward', true);
        if (this.appArgs?.afk) return
		this.setupFishing()
    }
	setupFishing() {
		if (!this.FirstJoin) return this.bot.activateItem()
        this.FirstJoin = false
        this.fishing.setup();
	}
    
    async inLobby() {
		const timer = ms => new Promise(res => setTimeout(res, ms));
		if(!this.appArgs.program) { //ежли вы не хотите писать чтобы бот зашёл на сервер
			this.bot.chat('/anarchy')
			this.bot.once('windowOpen', () => {
				this.bot.clickWindow(24, 0, 0);
				setTimeout(() => this.onServer(), 2000);
			})
		} else { //тут ваша прога исполняется
			var program = this.appArgs.program.split(';')
			var work = true
			var ppos = 0;
			while(work) {
				var spl = program[ppos].indexOf(':')
				var pname = program[ppos].slice(0, spl)
				var parg = program[ppos].slice(spl+1)
				//console.log({arg: parg, name: pname}) //for debugging
				switch(pname) {
					case 'chat':
						this.bot.chat(parg);
						break;
					case 'wait':
						await timer(parg);
						break;
					case 'windowClick':
						this.bot.clickWindow(parg, 0, 0);
						break;
					case 'hotbar':
						this.bot.setQuickBarSlot(parg);
						break;
					case 'activateItem':
						this.bot.activateItem();
						break;
					case 'eq':
						if(this.bot.inventory.items().find(item => item.name.includes(parg)))
							await this.bot.equip(this.bot.inventory.items().find(item => item.name.includes(parg)), 'hand')
						break
					case 'inter':
						this.bot.emit('IMH', parg)
						break;
					case 'exit':
						this.bot.quit()
						process.exit(0)
				}
				ppos += 1;
				if(!program[ppos]){
					work = false;
					setTimeout(() => this.onServer(), 2000);
				}
			}
		}
        
    }
	getColor(colorId) {
		//какаято херня для получения цвета с карты
		colorId -= 3 // Seems to get the right color;
		if(!mapColors[colorId]) return { red:255, green: 255, blue: 255, alpha: 255 }
		else return mapColors[colorId];
	}

}

module.exports = utils;


/* 
chat:/anarchy
wait:500
windowClick:28
wait:500
chat:/kit start
wait:100
eq:pork
wait:100
chat:/ah sell 144
wait:100
chat:/hub
wait:500

chat:/anarchy
wait:500
windowClick:29
wait:500
chat:/kit start
wait:100
eq:pork
wait:100
chat:/ah sell 144
wait:100
chat:/hub
wait:500

chat:/anarchy
wait:500
windowClick:30
wait:500
chat:/kit start
wait:100
eq:pork
wait:100
chat:/ah sell 144
wait:100
chat:/hub
wait:500

chat:/anarchy
wait:500
windowClick:31
wait:500
chat:/kit start
wait:100
eq:pork
wait:100
chat:/ah sell 144
wait:100
chat:/hub
wait:500

chat:/anarchy
wait:500
windowClick:32
wait:500
chat:/kit start
wait:100
eq:pork
wait:100
chat:/ah sell 144
wait:100
chat:/hub
wait:500

chat:/anarchy
wait:500
windowClick:33
wait:500
chat:/kit start
wait:100
eq:pork
wait:100
chat:/ah sell 144
wait:100
chat:/hub
wait:500

chat:/anarchy
wait:500
windowClick:34
wait:500
chat:/kit start
wait:100
eq:pork
wait:100
chat:/ah sell 144
wait:100
chat:/hub
wait:500


chat:/anarchy
wait:500
windowClick:23

*/