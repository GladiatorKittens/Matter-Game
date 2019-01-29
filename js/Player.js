class Player {
    constructor(scene, x, y) {
      this.scene = scene;
      this.sprite = scene.matter.add
        .sprite(0, 0, "player", 0)
        .setBody({type: "circle", radius: 14})
        .setScale(2)
        .setFixedRotation()
        .setPosition(x, y)
        .setBounce(0.01)
        .setFriction(0.001,);
    
        // Create the animations we need from the player spritesheet
        this.isTouching = false;
    }

    freeze() {
        this.sprite.setStatic(true);
    }

    update() {}

    destroy() {}
}