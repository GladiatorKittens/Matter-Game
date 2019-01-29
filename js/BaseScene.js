class BaseScene extends Phaser.Scene {
    constructor(id, map_key) {
        super(id);
        this.id = id;
        this.map_key = map_key;
    }
    preload() {
        this.load.image("tilesheet", "assets/tiles/kenney-tileset-64px-extruded.png");
        this.load.tilemapTiledJSON(this.map_key, "assets/tiles/" + this.map_key + ".json");
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
    create() {
        const map = this.make.tilemap({ key: this.map_key });
        var tileset = map.addTilesetImage("tilesheet", "tilesheet");
        this.platforms = map.createStaticLayer("platforms", tileset, 0, 0);
        this.platforms.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(this.platforms);

        this.player = new Player(this, 64, map.heightInPixels - 256);
        this.player.create();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);

        this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        })
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            if (this.id === "SceneA") {
                this.scene.switch("SceneB");
            } else if (this.id === "SceneB") {
                this.scene.switch("SceneA")
            }
        }
        this.player.update();
    }
}