site.classes = site.classes || {};

site.classes.HealthGauge = (function() {

	var HealthGauge = function(){
		this.max = 100;
		this.current = 100;
		this.colour = 'rgb(125, 210, 242)';

		this.left = true;
	};


	HealthGauge.prototype.draw = function(ctx, x, y, width){
		ctx.save();
		ctx.globalAlpha = 0.5;

		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.strokeStyle = this.colour;

		ctx.lineWith = 2;
		ctx.fillRect(x,y, width, 30);

		ctx.strokeRect(x,y, width, 30);

		ctx.fillStyle = this.colour;

		var currentX = ((width-6) / this.max)*this.current;

		ctx.fillRect(x+3,x+3, currentX, 24);
		ctx.restore();
	}
	return HealthGauge;
}());