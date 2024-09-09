class Ball {
    constructor(x, y, vx, vy, diameter, color, img) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.diameter = diameter;
        this.color = color;
        this.img = img; // Adiciona a imagem como propriedade
        this.speedIncrement = 1.1; // Fator de incremento de velocidad
        this.rotation = 0;
        this.computerPoints = 0;
        this.playerPoints = 0;
    }

    update(leftPaddle, rightPaddle) {
        this.x += this.vx;
        this.y += this.vy;
        //rotaciona de acordo com as duas velocidades utilizando o math.sqrt
        this.rotation += Math.sqrt(this.vx * this.vx + this.vy * this.vy) / 30;

        // Check for collision with top and bottom walls
        this.checkCollisionWithWalls();

        // Check for collision with paddles
        this.checkCollisionWithPaddle(leftPaddle);
        this.checkCollisionWithRightPaddle(rightPaddle);

        // Check for collision with left and right walls (out of bounds)
        if (this.x - this.diameter / 2 < 0 || this.x + this.diameter / 2 > width) {
            if (this.x - this.diameter / 2 < 0) {
                this.computerPoints++;
            } else {
                this.playerPoints++;
            }
            this.speakPoints();
            this.reset();
        }
    }

    speakPoints() {
        //use speechapi to speak the points
        let msg = new SpeechSynthesisUtterance();
        msg.text = "Player " + this.playerPoints + " a " + this.computerPoints + " Computer";
        window.speechSynthesis.speak(msg);
    }

    checkCollisionWithWalls() {
        if (this.y - this.diameter / 2 < 0 || this.y + this.diameter / 2 > height) {
            this.vy *= -1;
        }
    }

    checkCollisionWithPaddle(paddle) {
        if (checkCollisionWithPaddle(this, paddle)) {
            this.vx *= -1;
            this.vx *= this.speedIncrement; // Incrementa a velocidade
            this.vy *= this.speedIncrement; // Incrementa a velocidade

            // Adjust the vy based on where the ball hits the paddle
            let hitPos = (this.y - paddle.y) / paddle.height;
            this.vy += (hitPos - 0.5) * 2 * this.speedIncrement; // Add spin effect

            this.x = paddle.x + paddle.width + this.diameter / 2; // Prevent sticking
        }
    }

    checkCollisionWithRightPaddle(paddle) {
        if (checkCollisionWithPaddle(this, paddle)) {
            this.vx *= -1;
            this.vx *= this.speedIncrement; // Incrementa a velocidade
            this.vy *= this.speedIncrement; // Incrementa a velocidade

            // Adjust the vy based on where the ball hits the paddle
            let hitPos = (this.y - paddle.y) / paddle.height;
            this.vy += (hitPos - 0.5) * 2 * this.speedIncrement; // Add spin effect

            this.x = paddle.x - this.diameter / 2; // Prevent sticking
        }
    }

    display() {
        //rotaciona antes de desenhar
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        image(this.img, -this.diameter / 2, -this.diameter / 2, this.diameter, this.diameter);
        pop();
    }

    changeColor() {
        this.color = [random(255), random(255), random(255)];
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = random(5, 10) * (random() > 0.5 ? 1 : -1);
        this.vy = random(5, 10) * (random() > 0.5 ? 1 : -1);
    }
}

function checkCollisionWithPaddle(ball, paddle) {
    return circleRectCollision(
        ball.x, ball.y, ball.diameter / 2,
        paddle.x, paddle.y, paddle.width, paddle.height
    );
}

function circleRectCollision(cx, cy, radius, rx, ry, rw, rh) {
    // Find the closest point to the circle within the rectangle
    let closestX = clamp(cx, rx, rx + rw);
    let closestY = clamp(cy, ry, ry + rh);

    // Calculate the distance between the circle's center and this closest point
    let distanceX = cx - closestX;
    let distanceY = cy - closestY;

    // If the distance is less than the circle's radius, an intersection occurs
    let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    return distanceSquared < (radius * radius);
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export default Ball;