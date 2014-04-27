site.scenes = site.scenes || {};
site.scenes.intro = (function() {


	var helicopterImage = new Image();

	helicopterImage.src = 'images/helicopter.png';

	var insideHelicopterImage = new Image();

	insideHelicopterImage.src = 'images/insideHelicopter.png';

	var shoniqaImage = new Image();

	shoniqaImage.src = 'images/shoniquaBark.png';



	function skipIntro(){
		site.changeScene(site.scenes.game);
	}

	var time = 0;

	var introText = [
	{text:"Over the North Sea,",startAt:0},
	{text:"132 miles off The People's Republic Of Independent Scotland,", startAt:1000},
	{text:"2017, 16th of Salmond, Quarter past Sturgeon.", startAt:5000}
	];

	var radio = false;

	function keyPress(e){
		if (e.keyCode == 32){
			skipIntro();
		}
	}

	return{
		init:function(){
			document.getElementById('gameCanvas').onmouseup = skipIntro;
			window.onkeyup = keyPress;
		},
		frame:function(ctx, timeDelta){
			time = time+timeDelta;
			if (time < 8000){
				
				ctx.drawImage(helicopterImage,0,0,helicopterImage.width, helicopterImage.height);

				ctx.fillStyle = 'white';

				ctx.font = '21px Helvetica, Arial';

				var textY = 500;
				for (var lineNumber in introText){
					var line = introText[lineNumber];
					if (time > line.startAt){
						var textLength = Math.min(line.text.length, Math.round(time - line.startAt)/50);
						ctx.fillText(line.text.substr(0, textLength), 30, textY);
						textY += 30;
					}
				}
			}else{
				ctx.drawImage(insideHelicopterImage,0,0,insideHelicopterImage.width, insideHelicopterImage.height);

				if (time > 10000){
					if (radio == false){
						site.audio.gameAudio.messageSound();
						radio = true;
					}
					ctx.save();

					ctx.shadowBlur = 20;
					ctx.shadowColor = 'black';
					ctx.drawImage(shoniqaImage,720,400,shoniqaImage.width, shoniqaImage.height);

					ctx.fillStyle = 'rgb(200,200,200)';

					ctx.strokeStyle = 'black';

					ctx.fillRect(100, 400, 600, 150);

					ctx.strokeRect(100, 400, 600, 150);

					ctx.restore();

					ctx.fillStyle = 'black';

					ctx.font = '21px Helvetica, Arial';

					ctx.fontWeight = 'bold';

					ctx.fillText('Shoniqua Bark, Leading Fish Scientist', 110, 430);

					ctx.font = '15px Helvetica, Arial';

					ctx.fillText('Reports from the rig say there\'s some sore of interdimensional fissure causing havok', 110, 470);

					ctx.fillText('below the surface, take the Unmaned Nautical Vehicle and intestigate.', 110, 490);

					if (time > 15000){
						ctx.font = 'bold 21px Helvetica, Arial';
						ctx.fillText('[SPACE To Continue]', 110, 520);
					}

				}
			}
		},
		deinit:function(){
			document.getElementById('gameCanvas').removeEventListener('onmouseup', skipIntro);
			window.removeEventListener('onkeyup', keyPress);
		}
	}
}());