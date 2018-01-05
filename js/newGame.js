
var ball;

var newGame = {
	preload: function(){

		//load game assets
    	game.load.tilemap('level1', 'assets/tilesjson.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.image('gameTiles', 'assets/tiles.png');

    	game.physics.arcade.checkCollision.down = true;

	},

	create: function(){
		map = game.add.tilemap('level1');

		map.addTilesetImage('tiles','gameTiles');

		layer = map.createLayer('Tile Layer 1');

		map.setCollisionBetween(1,4,true,'Tile Layer 1');

		ball = createBall();


	},

	update: function(){
		game.physics.arcade.collide(ball, layer,destroyBlock);

		console.log(map.properties);
	}
}

function destroyBlock(ball,tile){

	if (tile.index == 4){
		map.putTile(3,tile.x,tile.y);	
	}
	else{
		map.putTile(5,tile.x,tile.y);
	}
	
}