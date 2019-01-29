class BaseScene extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
    }
    preload() {
        this.load.image("tilesheet", "assets/tiles/kenney-tileset-64px-extruded.png");
        this.load.tilemapTiledJSON("level_1", "assets/tiles/level_1.json");
        this.load.spritesheet(
            "player",
            "assets/sprites/0x72-industrial-player-32px-extruded.png", {
                frameWidth: 32,
                frameHeight: 32,
                margin: 1,
                spacing: 2
            }
        );
    }
    create(map_key) {
        const map = this.make.tilemap({ key: map_key });
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
            this.scene.switch(id);//not right yet
        }
    }
}