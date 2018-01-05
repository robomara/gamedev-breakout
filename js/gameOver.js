
var gameOverState = {
	create: function(){
		game.add.image(0,0,'gameOver');
		game.input.onDown.add(restart,this);

		gameOverText = game.add.text(game.world.centerX,game.world.centerY,'Click to restart',{font: "20px courier", fill: "#ffffff"});
		gameOverText.anchor.setTo(0.5);
	},

	update: function(){

	}
}

function restart(){
	game.state.start('mainState');
}