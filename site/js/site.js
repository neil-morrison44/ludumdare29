var site = (function() {
	"use strict";
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
		};
	})();

	var ctx;
	function initCanvas() {
		var canvas = document.getElementById("gameCanvas");


		ctx = canvas.getContext('2d');

		ctx.fillStyle = 'rgb(120,120,255)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	var currentScene;

	function changeScene(toScene) {
		if (currentScene) {
			currentScene.deinit();
		}
		currentScene = toScene;
		currentScene.init();
	}

	var lastTime;

	var delta = 0;

	function renderFrame() {
		var now = (new Date()).getTime();
		var delta = now - lastTime;

		ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
		
		currentScene.frame(ctx, delta);



		lastTime = now;

		requestAnimFrame(renderFrame);
	}

	return {
		init: function() {
			initCanvas();
			changeScene(site.scenes.game);

			lastTime = (new Date()).getTime();
			requestAnimFrame(renderFrame);
		}
	}
}());

document.onreadystatechange = function() {
	if (document.readyState == 'complete') {
		site.init();
	}
};