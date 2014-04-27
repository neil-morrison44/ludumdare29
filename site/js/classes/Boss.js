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
		this.health = 10;
		this.coolDown = 10;

		this.targetY = 0;

		this.targetX = 100;

		this.height = 90;

		this.width = 60;

		this.speed = Math.max(0.5,Math.random()*2.5);

		this.velocityX = 0;

		this.velocityY = -1;

		this.minDepth = waterLevel + Math.random()*400;
	};


	Boss.prototype.draw = function(ctx, x, y){

		ctx.save();
		//ctx.fillStyle = 'red';
		//ctx.fillRect(x, y, 60, 90);

		ctx.drawImage(BossImage, x, y, 60, 90);
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

		ctx.drawImage(BossLightsImage, x, y, 60, 90);
		ctx.restore();
	}

	Boss.prototype.update = function(timeDelta){
		//this.y = (this.targetY - this.y)/(10*timeDelta);

		if (this.targetY > this.y){
			if (this.y + this.height < 2400){
				this.velocityY+= 0.1;
			}
		}else{
				this.velocityY -= 0.01;
		}

		this.velocityY += (Math.random()/100) - 0.005;

		if (this.targetX > this.x){
			if (this.velocityX < 1){
				this.velocityX += 0.01;
			}
		}else{
			if (this.velocityX > -1){
				this.velocityX -= 0.01;
			}
		}

		this.velocityX += (Math.random()/100) - 0.005;

		this.x += this.velocityX*this.speed;
		this.y += this.velocityY*this.speed;

		if (this.y+this.height > 2410){
			//this.y = 2400-this.height;
			this.velocityY = -5;
		}else if (this.y < this.minDepth){
			this.velocityY = 0;
		}

		this.velocityY

	}

	Boss.prototype.takeHit = function(){
		this.speed -= 0.01;
		this.speed = Math.max(0.1, this.speed);

		this.flash = true;

		if (this.health > 0){
			this.health -= 1.5;
		}

	}
	return Boss;

}());