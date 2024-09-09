class Paddle {
    constructor(x, y, width, height, speed, color, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
        this.img = img; // Adiciona a imagem como propriedade
        this.direction = 0;
    }

    update(ball) {
        // If ball is passed, move paddle towards the ball
        if (ball) {
            this.moveTowardsBall(ball);
        } else {
            this.y += this.direction * this.speed;
        }

        // Ensure paddle stays within canvas bounds
        this.checkCollisionWithWalls();
    }

    moveTowardsBall(ball) {
        // Move the paddle towards the ball with a smooth motion
        let targetY = ball.y - this.height / 2;
        let deltaY = targetY - this.y;
        this.y += deltaY * 0.1; // Adjust the factor for smoother or faster movement
    }

    checkCollisionWithWalls() {
        this.y = constrain(this.y, 0, height - this.height);
    }

    display() {
        if (this.img) {
            image(this.img, this.x, this.y, this.width, this.height);
        } else {
            fill(this.color);
            rect(this.x, this.y, this.width, this.height);
        }
    }

    move(direction) {
        this.direction = direction;
    }
}

export default Paddle;