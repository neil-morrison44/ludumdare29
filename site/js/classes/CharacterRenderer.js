site.classes = site.classes || {};

site.classes.CharacterRenderer = (function() {

		bodyImage = new Image();

		bodyImage.src = 'images/UNVbody.png';

		bodyLightsImage = new Image();

		bodyLightsImage.src = 'images/UNVbodyLights.png';

		headImage = new Image();

		headImage.src = 'images/UNVHead.png';

		headLightsImage = new Image();

		headLightsImage.src = 'images/UNVHeadLight.png';

		gunImage = new Image();

		gunImage.src = 'images/UNVGun.png';

		gunLightsImage = new Image();

		gunLightsImage.src = 'images/UNVGunLights.png';


	var CharacterRenderer = function() {
		this.headState = 0;
		this.lightsBody = 0;
		this.lightsHead = 0;
		this.gunAngle = 0;
		this.lightState = 0;

		this.hullIntegrity = 1;

		this.targetLightState = 1;

		this.targetHeadState = 1;

	};

	CharacterRenderer.prototype.update = function() {
		this.lightState += (this.targetLightState - this.lightState) / 350;

		this.headState += (this.targetHeadState - this.headState) / 200;

	}

	CharacterRenderer.prototype.draw = function(ctx, x, y) {

		this.update();
		ctx.drawImage(headImage, x + 40 + (25 * this.headState), y - (15 * this.headState), headImage.width, headImage.height);

		ctx.drawImage(bodyImage, x, y, 75, 75);

		//ctx.drawImage(this.gunImage, x, y, 75, 75);


		// save the current co-ordinate system 
		// before we screw with it
		ctx.save();

		// move to the middle of where we want to draw our image
		ctx.translate(x+37.5, y+37.5);

		// rotate around that point, converting our 
		// angle from degrees to radians 
		ctx.rotate(this.gunAngle);

		// draw it up and to the left by half the width
		// and height of the image 
		ctx.drawImage(gunImage, -(gunImage.width / 2), -(gunImage.height / 2));

		// and restore the co-ords to how they were when we began
		ctx.restore();


	}

	CharacterRenderer.prototype.drawLights = function(ctx, x, y) {
		ctx.save();

		ctx.globalAlpha = this.lightState*Math.max(this.hullIntegrity, Math.random());
		ctx.drawImage(headLightsImage, x + 40 + (25 * this.headState), y - (15 * this.headState), headLightsImage.width, headLightsImage.height);
		ctx.drawImage(bodyLightsImage, x, y, 75, 75);

		// save the current co-ordinate system 
		// before we screw with it
		ctx.save();

		// move to the middle of where we want to draw our image
		ctx.translate(x+37.5, y+37.5);

		// rotate around that point, converting our 
		// angle from degrees to radians 
		ctx.rotate(this.gunAngle);

		// draw it up and to the left by half the width
		// and height of the image 
		ctx.drawImage(gunLightsImage, -(gunLightsImage.width / 2), -(gunLightsImage.height / 2));

		// and restore the co-ords to how they were when we began
		ctx.restore();

		ctx.restore();

	}

	CharacterRenderer.prototype.acceptState = function(state) {
		this.gunAngle = state.gunAngle - (Math.PI/4) || this.gunAngle;

		this.targetHeadState = state.headState || this.targetHeadState;

		this.targetLightState = state.lightState || this.targetHeadState;

		this.hullIntegrity = state.hullIntegrity || this.hullIntegrity;
	}

	return CharacterRenderer;
}());