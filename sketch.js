import Ball from './Ball.js';
import Paddle from './Paddle.js';

// Canvas dimensions
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

// Ball properties
const BALL_DIAMETER = 35;
const BALL_COLOR = [255, 255, 255];
const BALL_INITIAL_VX = 5;
const BALL_INITIAL_VY = 5;
let ballImg; // Variável para armazenar a imagem da bola

// Paddle properties
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 3;
const PADDLE_COLOR = [255, 255, 255];
const LEFT_PADDLE_X = 30;
const RIGHT_PADDLE_X = CANVAS_WIDTH - 40;
let leftPaddleImg; // Variável para armazenar a imagem da raquete esquerda
let rightPaddleImg; // Variável para armazenar a imagem da raquete direita

// Background image
let bgImg; // Variável para armazenar a imagem de fundo

// Create instances
let ball;
let leftPaddle;
let rightPaddle;

function preload() {
    ballImg = loadImage('bola.png'); // Carrega a imagem da bola
    leftPaddleImg = loadImage('barra01.png'); // Carrega a imagem da raquete esquerda
    rightPaddleImg = loadImage('barra02.png'); // Carrega a imagem da raquete direita
    bgImg = loadImage('fundo.png'); // Carrega a imagem de fundo
}

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    ball = new Ball(200, 200, BALL_INITIAL_VX, BALL_INITIAL_VY, BALL_DIAMETER, BALL_COLOR, ballImg);
    leftPaddle = new Paddle(LEFT_PADDLE_X, CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_COLOR, leftPaddleImg);
    rightPaddle = new Paddle(RIGHT_PADDLE_X, CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_COLOR, rightPaddleImg);
}

function draw() {
    if (bgImg) {
        background(bgImg); // Desenha a imagem de fundo
    } else {
        background(0); // Fundo preto se a imagem não estiver carregada
    }
    ball.update(leftPaddle, rightPaddle);
    ball.display();
    
    // Update left paddle position based on mouseY
    leftPaddle.y = mouseY - leftPaddle.height / 2;
    leftPaddle.y = constrain(leftPaddle.y, 0, height - leftPaddle.height);
    leftPaddle.display();
    rightPaddle.update(ball); // Passa a bola para a raquete direita
    rightPaddle.display();
}

// Make functions global for p5.js
window.preload = preload;
window.setup = setup;
window.draw = draw;