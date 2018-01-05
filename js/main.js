
var bricks;
var ballLaunched;
var ballVelocity;

var lives;
var score;

var cursors;


var mainState = {

	create: function(){

		game.physics.startSystem(Phaser.ARCADE);
		game.physics.arcade.checkCollision.down = false;

		game.add.image(0,0,'background');

		player = createPlayer();

		ball = createBall();



		bricks = game.add.group();
		bricks.enableBody = true;
    	bricks.physicsBodyType = Phaser.Physics.ARCADE;

		buildBrick();

		lives = 3;

		livesText = game.add.text(10,game.world.height,'Balls: ' + lives,{ font: "bold 20px Courier", fill: "#ffffff"});

		livesText.anchor.setTo(0,1);

		cursors = game.input.keyboard.createCursorKeys();

	},

	update: function(){
		game.physics.arcade.collide(ball, bricks, destroyBrick, null, this);
		game.physics.arcade.collide(ball, player, paddleContact, null,this);

		movePlayer(game.input.x);

		newGameStart();

	}
}


function buildBrick(){
	for (j=0;j<3;j++){
		for (i=2;i<10;i++){
			brick = bricks.create(i*40+20,100+20*j,'brick');
			brick.anchor.setTo(0.5);
			brick.scale.setTo(0.75);

			brick.body.bounce.setTo(1);
            brick.body.immovable = true;
		}
	}
}


function createBall(){
	ballLaunched = false;

	ball = game.add.sprite(player.x,player.y -15-20,'ball');
	ball.anchor.setTo(0.5);
	

	game.physics.arcade.enable(ball);


    //  Player physics properties. Give the little guy a slight bounce.
    ball.body.bounce.setTo(1);
    ball.body.collideWorldBounds = true;

    ball.body.velocity.setTo(ballVelocity,ballVelocity);

    game.input.onDown.addOnce(launchBall,this);

    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(outOfBounds, this);

	return ball;
}


function destroyBrick(ball,brick){
	brick.kill();
}

function createPlayer(){
	player = game.add.sprite(game.world.centerX,game.world.height-50,'player');
	player.anchor.setTo(0.5,0.5);
	player.scale.setTo(1,1);

	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.body.immovable = true;

	player.body.bounce.setTo(1);

	return player;
}

function launchBall(){
	ball.body.velocity.setTo(500,500);
	ballLaunched = true;
}

function movePlayer(x){
	player.x = x;
}

function paddleContact(ball,player){
	ball.body.velocity.x = 250 * Math.sin( Math.PI * (ball.x-player.x)/player.width);
	ball.body.velocity.y = -250;
}

function outOfBounds(){
	if (lives>1){
		ball.kill();
		lives -= 1;
		livesText.text = 'Balls: ' + lives;
		createBall();		
	}
	else{
		game.state.start('gameOverState');
	}

}

function newGameStart(){
	if(cursors.up.isDown){
		game.state.start('newGame');	
	}
}