class SceneB extends Phaser.Scene {
    constructor() {
        super("sceneB");
    }
    preload() {
        this.load.tilemapTiledJSON("level_2", "assets/tiles/level_2.json");
    }
    create() {
        const map = this.make.tilemap({ key: "level_2" });
        var tileset = map.addTilesetImage("tilesheet", "tilesheet");
        this.platforms = map.createStaticLayer("platforms", "tilesheet", 0, 0);
        this.platforms.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(this.platforms);

        this.player = new Player(this, 64, this.map.heightInPixels - 128);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);

        this.keys = this.inpuy.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        })
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            this.scene.switch("SceneA");
        }
    }
}