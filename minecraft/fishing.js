const classDo = require('./utils');
class classFishing {
	constructor(bot, config) {
		this.throw_time = 0;
		this.playerBobberEntity = undefined;
		this.timer;
		this.bot = bot;
       		this.config = config;
       		this.Do = new classDo(this.bot);
	}
	equip_rod() {
		var window = this.bot.inventory;

		if (this.bot.heldItem != null && this.bot.heldItem.name == 'fishing_rod') {
			this.Do.log('[FishBot]: Holding fishing rod');
			return;
		}
		var fishingRod = this.bot.inventory.findItemRangeName(this.bot.inventory.inventoryStart, this.bot.inventory.inventoryEnd, 'fishing_rod');
		if (fishingRod) { // have fishing rod
			this.Do.log('[FishBot]: Changing to fishing rod');
			this.bot.moveSlotItem(fishingRod.slot, this.bot.inventory.hotbarStart + this.bot.quickBarSlot);
		} else { // no fishing rod
			this.Do.log('[FishBot]: Warning! No fishing rod in inventory')
		}

		if (this.bot.heldItem != null && this.bot.heldItem.name == 'fishing_rod') {
			this.Do.log('[FishBot]: Having changed item to fishing rod')
		} else {
			this.Do.log('[FishBot]: Someting went wrong when changing the fishing rod')
		}
	}

	setupListeners() {
		this.bot.on('entitySpawn', entity => {
			if (entity.mobType == 'Fishing Bobber') {
				if (this.Do.getDistanceByVec3(entity.position, this.bot.player.entity.position) < this.config.bobberDistance) {//close to player
					this.playerBobberEntity = entity;
				}
			}
		});

		this.bot.on('entityUpdate', entity => {
			if (!entity || this.playerBobberEntity == undefined) return;
			if (entity.uuid == this.playerBobberEntity?.uuid) {
				if (entity.velocity.y < this.config.bobberYVelocity) {
					this.bot.activateItem();
					this.Do.log('[FishBot]: Hooked!');
					this.playerBobberEntity = undefined;
					setTimeout(() => {
						this.bot.activateItem();
						this.throw_time = new Date().getTime();
					}, 2000);
				}
			}
		});
		this.Do.log(`listeners setup is done`)
	}
    async setup() {
        await this.setupListeners();
        await this.equip_rod()
        setTimeout(() => {
            this.bot.activateItem();
            this.throw_time = new Date().getTime();
        }, 3000);
        this.timer = setInterval(() => {
            var tnow = new Date().getTime();
            if (tnow > this.throw_time && tnow - this.throw_time >= this.config.auto_rethrow) {
                this.bot.activateItem();
                this.playerBobberEntity = undefined;
                this.Do.log('[FishBot]: Rethrow');
                this.throw_time = tnow;
                this.bot.activateItem();
            }
        }, 1000);
    }
}

module.exports = classFishing