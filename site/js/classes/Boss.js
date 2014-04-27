site.classes = site.classes || {};

site.classes.Boss = (function(){

	var BossImage = new Image();

	BossImage.src = 'images/BossV1.png';

	var BossLightsImage = new Image();

	BossLightsImage.src = 'images/BossV1Light.png';


	var Boss = function(waterLevel){
		this.x = 700;
		this.y = 2400;
		this.velocityX = 0;
		this.velocityY = 0;
		this.health = 50;
		this.coolDown = 10;

		this.targetY = 0;

		this.targetX = 100;

		this.height = 472;

		this.width = 388;

	};


	Boss.prototype.draw = function(ctx, x, y){

		ctx.save();
		//ctx.fillStyle = 'red';
		//ctx.fillRect(x, y, 60, 90);

		ctx.drawImage(BossImage, x, y, this.width, this.height);
		ctx.restore();
	}

	Boss.prototype.drawLights = function(ctx, x, y){
		if (this.flash){
			this.flash = false;
			return;
		}
		ctx.save();

		ctx.globalAlpha = (this.health/10);
		//ctx.fillStyle = 'red';
		//ctx.fillRect(x, y, 60, 90);

		ctx.drawImage(BossLightsImage, x, y, this.width, this.height);
		ctx.restore();
	}

	Boss.prototype.update = function(timeDelta){
		//this.y = (this.targetY - this.y)/(10*timeDelta);

	}

	Boss.prototype.takeHit = function(){
		this.speed -= 0.01;
		this.speed = Math.max(0.1, this.speed);

		this.flash = true;

		if (this.health > 0){
			this.health -= 1.5;
		}

		this

	}
	return Boss;

}());