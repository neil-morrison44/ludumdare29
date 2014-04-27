site.scenes = site.scenes || {};
site.scenes.titleScreen = (function() {



	var titleCardImage = new Image();

	titleCardImage.src = 'images/titleCard.png';


	function startGame(){
		if (time > 500){
			site.changeScene(site.scenes.intro);
		}
	}

	function keyPress(e){
		if (e.keyCode == 32){
			startGame();
		}
	}

	var time = 0;
	return{
		init:function(){
			document.getElementById('gameCanvas').onmouseup = startGame;

			window.onkeyup = keyPress;
			time = 0;
		},
		frame:function(ctx, timeDelta){
			time += timeDelta;
			ctx.drawImage(titleCardImage, 0,0, 1000, 600);

		},
		deinit:function(){
			document.getElementById('gameCanvas').removeEventListener('onmouseup', startGame);
			window.removeEventListener('onkeyup', keyPress);
		}
	}
}());