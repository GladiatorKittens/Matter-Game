class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        console.log(this.scene);
        this.sprite = scene.matter.add
        .sprite(0, 0, "player", 0)
        .setBody({type: "circle", radius: 14})
        .setScale(2)
        .setFixedRotation()
        .setPosition(x, y)
        .setBounce(0.1)
        .setFriction(0.01);
        
        // Create the animations we need from the player spritesheet
        this.isTouching = false;
        this.touchData = {};
    }
    create() {
        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.scene.input.on("pointerdown", this.handlePointerDown, this);
        this.scene.input.on("pointerup", this.handlePointerUp, this);
    }
    handlePointerDown(pointer) {
        this.touchData.startX = pointer.x;
        this.touchData.startY = pointer.y;
    }
    handlePointerUp(pointer) {
        this.touchData.endX = pointer.x;
        this.touchData.endY = pointer.y;
        this.handleTouch();
    }
    handleTouch() {
        const distX = this.touchData.endX - this.touchData.startX;
        const distY = this.touchData.endY = this.touchData.startY;
        this.touchData = {};
        const tolerance = 1;
        if (distX > 0) {
            this.moveRight = true;
        } else if (distX < 0) {
            this.moveLeft = true;
        }
        if (distY < 0 - tolerance) {
            this.jumpUp = true;
        }
    }
    freeze() {
        this.sprite.setStatic(true);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
            this.moveRight = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
            this.moveLeft = true;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
            this.jumpUp = true;
        }

        //touch code
        const xForce = 0.1;
        const yForce = 0.2;

        if (this.moveRight) {
            this.sprite.applyForce({
                x: xForce,
                y: 0
            })
        } else if (this.moveLeft) {
            this.sprite.applyForce({
                x: -xForce,
                y: 0
            })
        }
        if (this.jumpUp) {
            this.sprite.applyForce({
                x: 0,
                y: -yForce
            })
        }
        //clamp velocity
        if (this.sprite.body.velocity.x > 7) {
            this.sprite.setVelocityX(7);
        } else if (this.sprite.body.velocity.x < - 7) {
            this.sprite.setVelocityX(-7);
        }
        this.moveRight = this.moveLeft = this.jumpUp = false;
    }

    destroy() {
    }
}