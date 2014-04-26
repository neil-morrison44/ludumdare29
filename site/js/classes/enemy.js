site.classes = site.classes || {};

site.classes.Enemy = (function(){

	var Enemy = function(){
		this.x = 0;
		this.y = 0;
		this.velocityX = 0;
		this.velocityY = 0;
		this.health = 10;
		this.coolDown = 10;
	};

	return Enemy;

}());