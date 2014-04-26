site.scenes = site.scenes || {};
site.scenes.game = (function() {


	var character = {
		x: 100,
		y: 0,
		velocityX: 0,
		velocityY: 10,
		width: 75,
		height: 75,
		oldX: 100,
		oldY: 0,
		coolDown:15,
		currentCoolDown:0
	};

	var waterLevel = 620;

	var maxDepth = 2400;

	var camera = 0;

	var pressedKeys = new Array(255);

	var rigImage = new Image();

	rigImage.src = "images/rig.png";

	var rigLegsImage = new Image();

	rigLegsImage.src = "images/riglegs.png";

	var cursorImage = new Image();

	cursorImage.src = "images/cursor.png";

	var platforms = [{
		x: 300,
		y: 410,
		width: 500,
		height: 48,
		dust: true,
		dustColour: 'black',
		name: 'rig'
	}, {
		x: 0,
		y: 2400,
		width: 1000,
		height: 200,
		name: 'seaFloor'
	}, {
		x: -200,
		y: -200,
		width: 200,
		height: 2400,
		name: 'leftWall'
	}, {
		x: 1000,
		y: -200,
		width: 200,
		height: 2400,
		name: 'rightWall'
	}, {
		x: 0,
		y: -400,
		width: 1000,
		height: 200,
		name: 'topWall'
	}];

	var particles = [];

	var myBullets = [];

	var theirBullets = [];

	var enemies = [];



	function updateBullets(timeDelta) {
		var killThese = [];
		for (var i = myBullets.length - 1; i >= 0; i--) {
			myBullets[i].oldX = myBullets[i].x;
			myBullets[i].oldY = myBullets[i].y;

			myBullets[i].x += myBullets[i].velocityX * timeDelta;
			myBullets[i].y += myBullets[i].velocityY * timeDelta;

			if (myBullets[i].y > 2400){
				killThese.push(i);
				spreadParticles(myBullets[i].x, 2400, myBullets[i].angle - Math.PI, 0.2, 100, 0.5, {
					colour: 'rgb(125,125,255',
					acceleration: 1.009,
					velocity: 0.2,
					gravity: true,
					timeToLive: 15
				});
			}

			if (myBullets[i].y > waterLevel){
				spreadParticles(myBullets[i].x, myBullets[i].y, myBullets[i].angle, 0.2, 15, 0.5, {
					colour: 'white',
					acceleration: 1,
					velocity: 0.2,
					gravity: false,
					timeToLive:15
				});
			}

		};

		killThese = killThese.sort();

		for (var i = killThese.length - 1; i >= 0; i--) {
			myBullets.splice(killThese[i], 1);
		};
	}

	function drawBullets(ctx) {
		ctx.save();
		ctx.strokeStyle = 'rgb(125,125,255';
		ctx.shadowColour = 'rgb(255,255,255';
		ctx.lineWidth = 10;
		ctx.shadowBlur = 40;
		ctx.beginPath();
		for (var i = myBullets.length - 1; i >= 0; i--) {
			ctx.moveTo(myBullets[i].oldX, myBullets[i].oldY - camera);
			ctx.lineTo(myBullets[i].x, myBullets[i].y - camera);
		};

		ctx.stroke();
		ctx.restore();
	}

	function randomBubbles() {

		if (Math.random() > 0.95) {

			spreadParticles(Math.random() * 1000, 2600, (Math.PI / 2) * -1, 0.2, 50, 0.5, {
				colour: 'white',
				acceleration: 1.009,
				velocity: 0.2,
				gravity: false,
				killAtHeight: waterLevel + 200
			});

		}
	}

	function checkForSplash() {
		if ((character.oldY + character.height) < waterLevel && (character.y + character.height) >= waterLevel) {
			spreadParticles(character.x, character.y + character.height + 10, (Math.PI / 2) * -1, 0.5, 150, 0.4, {
				colour: 'white',
				acceleration: 1,
				velocity: 0.6,
				gravity: true
			});

			spreadParticles(character.x + character.width, character.y + character.height + 10, (Math.PI / 2) * -1, 0.5, 150, 0.4, {
				colour: 'white',
				acceleration: 1,
				velocity: 0.6,
				gravity: true
			});

			spreadParticles(character.x + (character.width / 2), character.y + character.height + 10, (Math.PI / 2) * -1, 0.5, 150, 0.4, {
				colour: 'white',
				acceleration: 1,
				velocity: 0.6,
				gravity: true
			});
		}
	}


	function backgroundColour() {
		return 'hsl(200,90%,' + (2400 - camera) / 240 + '%)';
	}

	function seaColour() {
		return 'hsl(190,100%,' + (2400 - camera) / 240 + '%)';
	}

	function drawPlatforms(ctx) {
		ctx.save();
		ctx.strokeStyle = 'white';
		for (var i = platforms.length - 1; i >= 0; i--) {
			ctx.strokeRect(platforms[i].x, platforms[i].y - camera, platforms[i].width, platforms[i].height);
		};
		ctx.restore();
	}

	function updateParticles(timeDelta) {
		var killThese = [];
		for (var i = particles.length - 1; i >= 0; i--) {
			particles[i].x += particles[i].velocityX * timeDelta;
			particles[i].y += particles[i].velocityY * timeDelta;
			particles[i].velocityX *= particles[i].acceleration;
			particles[i].velocityY *= particles[i].acceleration;

			if (particles[i].gravity) {
				particles[i].velocityY += 0.005;
			}

			particles[i].timeToLive -= 1;

			if (particles[i].y > 2650 || particles[i].y < -200 || particles[i].x < -200 || particles[i].x > 1200 || particles[i].timeToLive == 0 || particles[i].y < particles[i].killAtHeight) {
				killThese.push(i);

			}

		};

		killThese = killThese.sort();

		for (var i = killThese.length - 1; i >= 0; i--) {
			particles.splice(killThese[i], 1);
		};


	}

	function drawParticles(ctx) {
		ctx.save();
		for (var i = particles.length - 1; i >= 0; i--) {
			ctx.fillStyle = particles[i].colour;
			ctx.fillRect(particles[i].x, particles[i].y - camera, 2, 2);
		};
		ctx.restore();
	}

	function emitParticle(options) {
		if (options.acceleration === undefined) {
			options.acceleration = 1;
		}
		particles.push({
			x: options.x,
			y: options.y,
			velocityX: Math.cos(options.angle) * options.velocity,
			velocityY: Math.sin(options.angle) * options.velocity,
			colour: options.colour,
			acceleration: options.acceleration,
			timeToLive: options.timeToLive,
			gravity: options.gravity,
			killAtHeight: options.killAtHeight || -200
		});
	}

	function spreadParticles(x, y, angle, spread, number, velocitySpread, particleObj) {
		while (number > 0) {
			var newAngle = ((angle + (Math.random() * (spread * 2))) - spread);
			var newVelocity = ((particleObj.velocity + (Math.random() * (velocitySpread * 2))) - velocitySpread);

			emitParticle({
				x: x,
				y: y,
				colour: particleObj.colour,
				angle: newAngle,
				velocity: newVelocity,
				acceleration: particleObj.acceleration,
				gravity: particleObj.gravity,
				timeToLive: particleObj.timeToLive,
				killAtHeight: particleObj.killAtHeight
			});
			number--;
		}
	}

	function intersects(box1, box2) {
		return (box1.x <= box2.x + box2.width &&
			box2.x <= box1.x + box1.width &&
			box1.y <= box2.y + box2.height &&
			box2.y <= box1.y + box1.height);
	}

	function whichIntersect(box1, box2) {

		if (box2.name == 'seaFloor') {
			return 4;
		}

		if (!(box1.oldY <= box2.y + box2.height)) {
			return 3
		} else if (!(box2.y <= box1.oldY + box1.height)) {
			return 4;
		} else if (!(box1.oldX <= box2.x + box2.width)) {
			return 1;
		} else if (!(box2.x <= box1.oldX + box1.width)) {
			return 2;
		}
		return 4;

	}

	function checkCollisionsAndClamp() {
		var clampY = 0;
		var clampX = 0;
		var activeClamp = false;
		for (var i = platforms.length - 1; i >= 0; i--) {
			if (intersects(platforms[i], character)) {
				activeClamp = true;

				var intersect = whichIntersect(character, platforms[i]);
				switch (intersect) {
					case 1:
						character.x = platforms[i].x + platforms[i].width;
						break;
					case 2:
						character.x = platforms[i].x - character.width;
						break;
					case 3:
						character.y = platforms[i].y + platforms[i].height;
						break;
					case 4:
						character.y = platforms[i].y - character.height;
						break;
				}
			}
		};

		if (activeClamp) {
			//character.velocityX = 0;
			if (intersect == 1 || intersect == 2) {
				character.velocityX = -(character.velocityX * 0.30);
			}
			character.velocityY = -(character.velocityY * 0.30);


			if (Math.abs(character.velocityY) > 1) {
				//emitParticle(character.x,character.y+character.height,'black', Math.PI + 1.0, 0.5);

				spreadParticles(character.x, character.y + character.height, Math.PI + 0.5, 0.6, 25, 0.1, {
					colour: 'gray',
					acceleration: 1,
					velocity: 0.2,
					gravity: true
				});

				spreadParticles(character.x + character.width, character.y + character.height, -0.5, 0.6, 25, 0.1, {
					colour: 'gray',
					acceleration: 1,
					velocity: 0.2,
					gravity: true
				});
			}
		}
	}

	function updatePhysics(timeDelta) {
		character.oldY = character.y;
		character.oldX = character.y;
		character.y += character.velocityY * (timeDelta / 100);
		character.x += character.velocityX * (timeDelta / 100);

		checkCollisionsAndClamp();

		character.velocityY += 0.98;

		//camera = character.y;
		updateParticles(timeDelta);

		if (character.y > camera + 400) {
			camera = character.y - 400;
		} else if (character.y - 100 < camera) {
			camera = character.y - 100;
		}

		checkForSplash();

		randomBubbles();

		updateBullets(timeDelta);

		emitJets();

		autoFire();
	}

	function renderScene(ctx) {

		ctx.fillStyle = 'rgb(25,35,205)';
		ctx.fillStyle = backgroundColour();
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		for (var i = 15; i >= 4; i--) {
			ctx.drawImage(rigLegsImage, 300, (i * rigLegsImage.height) - camera - 20, rigLegsImage.width, rigLegsImage.height);
		};

		drawParticles(ctx);
		ctx.fillStyle = 'brown';

		ctx.fillRect(0, 2400 - camera, ctx.canvas.width, 200);


		ctx.drawImage(rigImage, 300, 250 - camera, rigImage.width, rigImage.height);



		ctx.fillStyle = 'red';

		ctx.fillRect(character.x, character.y - camera, character.width, character.height);

		ctx.drawImage(cursorImage, mousePointX - 10, (mousePointY - 10) - camera, cursorImage.width, cursorImage.height);


		//water
		ctx.save();
		ctx.globalAlpha = 0.8;
		ctx.fillStyle = seaColour();

		//ctx.fillRect(0, waterLevel-camera, 1000, 2400 -waterLevel);

		ctx.beginPath();

		ctx.lineWidth = 2;

		ctx.moveTo(0, waterLevel - camera);

		var now = (new Date().getTime());

		for (var i = 0; i <= 100; i++) {

			var waveHeight = Math.sin((i / 2) + (now / 500)) * 5;
			waveHeight += Math.sin(i * 5);
			ctx.lineTo(i * 10, waveHeight + (waterLevel - camera));
		};

		ctx.strokeStyle = 'white';
		ctx.stroke();

		ctx.lineTo(1000, 2400);
		ctx.lineTo(0, 2400);

		ctx.closePath();
		ctx.fill();

		ctx.restore();

		drawBullets(ctx);

		drawPlatforms(ctx);
	}


	function emitJets() {
		if (character.velocityX > 0) {
			spreadParticles(character.x, character.y + character.height / 2, Math.PI, 0.5, 5, 0.4, {
				colour: 'white',
				acceleration: 1,
				velocity: 0.6,
				gravity: true
			});
		} else if (character.velocityX < 0) {
			spreadParticles(character.x + character.width, character.y + character.height / 2, 0, 0.5, 5, 0.4, {
				colour: 'white',
				acceleration: 1,
				velocity: 0.6,
				gravity: true
			});
		}


	}

	function autoFire(){
		if (mouseIsDown && character.currentCoolDown <= 0){
			fireMyBullet();
			character.currentCoolDown = character.coolDown;
		}else if (mouseIsDown){
			character.currentCoolDown--;
		}
	}


	function handleKeyUp(event) {

		pressedKeys[event.keyCode] = false;
		switch (event.keyCode) {
			case (87):
				//w
			case (32):
				//space
				//character.velocityY -= 50;
				break;
			case (68):
				//d
				character.velocityX -= 10;

				break;
			case (65):
				//a
				character.velocityX += 10;
				break;
			case (83):
				//s
				break;
		}
	}

	function handleKeyDown(event) {
		if (pressedKeys[event.keyCode]) {
			return;
		}
		pressedKeys[event.keyCode] = true;
		switch (event.keyCode) {
			case (87):
				//w
			case (32):
				//space
				if (character.y + character.height > waterLevel) {
					character.velocityY -= 25;

					spreadParticles(character.x + (character.width / 2), character.y + character.height-10, Math.PI / 2, 1, 150, 0.4, {
						colour: 'white',
						acceleration: 1,
						velocity: 0.6,
						gravity: true
					});

				}
				break;
			case (68):
				//d
				character.velocityX += 10;
				break;
			case (65):
				//a
				character.velocityX -= 10;
				break;
			case (83):
				//s
				break;
		}
	}

	var mousePointX;
	var mousePointY;

	var mouseIsDown = false;

	function handleMouseDown(event) {

		mousePointX = event.offsetX;
		mousePointY = event.offsetY + camera;
		mouseIsDown = true;

		
	}

	function handleMouseUp(event) {

		mousePointX = event.offsetX;
		mousePointY = event.offsetY + camera;
		mouseIsDown = false;
		character.currentCoolDown = 0;
	}

	function handleMouseMove(event) {
		mousePointX = event.offsetX;
		mousePointY = event.offsetY + camera;

	}

	function fireMyBullet() {
		//get angle between character and mouse point

		var startX = (character.x + character.width / 2);

		var startY = (character.y + character.height / 2);

		var angleRadians = Math.atan2(mousePointY - startY, mousePointX - startX);
		myBullets.push({
			x: startX,
			y: startY,
			velocityX: Math.cos(angleRadians) * 0.8,
			velocityY: Math.sin(angleRadians) * 0.8,
			oldX: startX,
			oldY: startY,
			angle:angleRadians
		});

	}

	return {
		init: function() {
			window.onkeydown = handleKeyDown;
			window.onkeyup = handleKeyUp;
			document.getElementById('gameCanvas').onmousedown = handleMouseDown;
			document.getElementById('gameCanvas').onmouseup = handleMouseUp;
			document.getElementById('gameCanvas').onmousemove = handleMouseMove;
		},
		deinit: function() {
			window.unbind('onkeyup', handleKeyUp);
			window.unbind('onkeydown', handleKeyDown);
			document.getElementById('gameCanvas').unbind('onmousedown', handleMouseDown);
			document.getElementById('gameCanvas').unbind('onmouseup', handleMouseUp);
			document.getElementById('gameCanvas').unbind('onmousemove', handleMouseMove);

		},
		frame: function(ctx, timeDelta) {
			updatePhysics(timeDelta);
			renderScene(ctx);

		}
	}
}());