site.scenes = site.scenes || {};
site.scenes.titleScreen = (function() {


	function startGame(){
		site.changeScene(site.scenes.intro);
	}

	return{
		init:function(){
			document.getElementById('gameCanvas').onmouseup = startGame;
		},
		frame:function(ctx, timeDelta){

		},
		deinit:function(){
			document.getElementById('gameCanvas').removeEventListener('onmouseup', startGame);
		}
	}
}());