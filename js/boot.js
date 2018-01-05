

var boot = {
	preload: function(){
		game.load.image('background','assets/background1.png');
		game.load.image('playArea','assets/playArea.png');
		game.load.image('brick','assets/brick.png');
		game.load.image('player','assets/player.png');
		game.load.image('ball','assets/ball.png');
		game.load.image('gameOver','assets/gameOver.png');
	},

	create: function(){
		game.add.image(0,0,'background');
		game.add.image(0,0,'playArea');

		var style = { font: "bold 32px Courier", fill: "#ffffff"}  
		
		startMessage = game.add.text(game.world.centerX,game.world.centerY,'Click to start',style);
		startMessage.anchor.setTo(0.5);

		game.input.onDown.add(startGame,this);
	}
}

function startGame(){
	game.state.start('mainState');
}