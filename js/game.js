



var config = {
	type: Phaser.AUTO,
	width: 64*8,
	height: 64*12,
	pixelArt: false,
	
	physics: {
		default: 'matter',
		matter: {
			debug: false,
			gravity: {
				x: 0,
				y: 1.5
			}
		}
		
	},
	
	scene: [SceneA, SceneB],
	
	plugins: {
        scene: [{
            plugin: PhaserMatterCollisionPlugin, // The plugin class
            key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
            mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
        }]
    }
}

var game = new Phaser.Game(config);