

//Runner
var runner, runnerImage;

//Ground
var ground, groundImage;
var invisibleGround;

//Obstacle
var obstacleImage, obstacleGroup;

//GameOver + Restart
var gameOver, gameOverImage;
var restart, restartImage;

//GameState
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  //Runner
  runnerImage = loadImage('images/runner.png');

  //Ground
  groundImage = loadImage('images/background.jpg');

  //Obstacle
  obstacleImage = loadImage('images/obstacle.png')
  
  //GameOver + Restart
  gameOverImage = loadImage('images/GameOver.png')
  restartImage = loadImage("images/Restart.png");
}

function setup() {
  createCanvas(600, 200);

  //Runner
  runner = createSprite(50,190,20,50);
  runner.addImage('Image', runnerImage);
  runner.scale = 0.15;
  camera.position.x = runner.x;
  camera.position.y = runner.y - 90;

  //Ground
  ground = createSprite(200,200,400,20);
  ground.addImage('Image', groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200,192,400,10);
  invisibleGround.visible = false;

  //Obstacle
  obstacleGroup = new Group();

  //GameOver + Restart
  gameOver = createSprite(300,100);
  gameOver.addImage('Image', gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background(255);
  
  //GameState PLAY
  if(gameState === PLAY){
    //Runner
    runner.velocityY = runner.velocityY + 0.8;
    runner.collide(invisibleGround);

    if(keyDown("space") && runner.y >= 159) {
      runner.velocityY = -12;
    }

    //Ground
    ground.velocityX = -4;
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //Obstacle
    spawnObstacles();

    if(obstacleGroup.isTouching(runner)){
      gameState = END;
    }
  }

  //GameState END
  else if(gameState === END){

    //Runner
    runner.velocityY = 0;

    //Ground
    ground.velocityX = 0;

    //Obstacle
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);

    //GameOver + Restart
    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0){
    //Obstacle
    var obstacle = createSprite(600,165,10,10);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);  
    obstacle.scale = 0.1;
    obstacle.setCollider('rectangle',0,0,50,50)
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  //Obstacle
  obstacleGroup.destroyEach();

  //GameOver + Restart
  gameOver.visible = false;
  restart.visible = false;

  //GameState
  gameState = PLAY;
}