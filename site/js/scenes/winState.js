site.scenes = site.scenes || {};
site.scenes.winState = (function() {



	var victoryCardImage = new Image();

	victoryCardImage.src = 'images/victoryCard.png';

	var time = 0;
	function titleScreen(){
		if (time > 1000){
			site.changeScene(site.scenes.titleScreen);
		}
	}

	function keyPress(e){
		if (e.keyCode == 32){
			titleScreen();
		}
	}

	return{
		init:function(){
			document.getElementById('gameCanvas').onmouseup = titleScreen;

			window.onkeyup = keyPress;

			time = 0;
		},
		frame:function(ctx, timeDelta){
			time += timeDelta;
			ctx.drawImage(victoryCardImage, 0,0,1000, 600);

		},
		deinit:function(){
			document.getElementById('gameCanvas').removeEventListener('onmouseup', titleScreen);
			window.removeEventListener('onkeyup', keyPress);
		}
	}
}());