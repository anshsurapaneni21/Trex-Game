var trex, trex_running, trex_collided;

var ground , ground_image, invisible_ground;

var cloud_image;

var cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var count = 0;

var gameOver, restart, gameOver_img, restart_img;

var cloudGroup, obstacleGroup;


function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png","trex4.png");
  
  ground_image = loadImage("ground2.png");
  
  cloud_image = loadImage("cloud.png");
  
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  
  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
  
  trex_collided = loadAnimation("trex_collided.png");
  
}


function setup() {
  createCanvas(600, 200);
  
  //creating trex
  trex = createSprite(50,150);
  trex.addAnimation("running_trex",trex_running);
  trex.addAnimation("collided trex",trex_collided);
  trex.scale = 0.5;
  
  //creating ground
  ground = createSprite(300,180,600,10);
  ground.addImage("Ground image",ground_image);
  ground.x = ground.width/2;
  ground.velocityX = -(6 + 3*count/100);
  
  //creating invisible ground
  invisible_ground = createSprite(300,190,600,10);
  invisible_ground.visible = false;
  
  //creating restart and gameOver
  restart = createSprite(300,150);
  restart.addImage(restart_img);
  restart.scale = 0.5;
  restart.visible = false;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOver_img);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  //creating Groups
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  background(255);
  
  text("Score: " + count, 480,50);
  
  trex.collide(invisible_ground);
  
  if(mousePressedOver(restart)){
     reset();
    
  }
  
  if(gameState == PLAY){
    
    //trex jump
    if(keyDown("space") && trex.y >= 161.5){
      trex.velocityY = -10;
    }
    
    //adding gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //infinite scrolling ground
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
  
    //spawning clouds
    spawnClouds();
  
    //spawning obstacles
    spawnObstacles();
    
    //score
    if(frameCount % 5 == 0){
      count++;
    }
    
    
    
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
    }
      
  
  }
  else if(gameState == END){
    ground.velocityX = 0;
    
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided trex",trex_collided);
    
    cloudGroup.setLifetimeEach();
    obstacleGroup.setLifetimeEach();
    
    gameOver.visible = true;
    restart.visible = true;
    
    trex.velocityY = 0;
  }
  
  
  
  drawSprites();
}
function spawnClouds(){
  if(frameCount % 60 == 0){
  var cloud = createSprite(600,120);
  cloud.y = random(80,120);
  cloud.addImage(cloud_image);
  cloud.velocityX = -(3 + 3*count/100);
  cloud.scale = 0.5;
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloudGroup.add(cloud);
  cloud.lifetime = 200;
  }
}
function spawnObstacles(){
  if(frameCount % 80 == 0){
  var cactus = createSprite(600,170);
  var randomNumber = Math.round(random(1,6));
  switch(randomNumber){
    case 1 : 
      cactus.addImage(cactus1);
      break;
    case 2 : 
      cactus.addImage(cactus2);
      break;
    case 3 : 
      cactus.addImage(cactus3);
      break;
    case 4 : 
      cactus.addImage(cactus4);
      break;
    case 5 : 
      cactus.addImage(cactus5);
      break;
    case 6 : 
      cactus.addImage(cactus6);
      break;
    default:
      break;
  }
  obstacleGroup.add(cactus);
  cactus.velocityX = -(6 + 3*count/100);
  cactus.scale = 0.5;
  cactus.lifetime = 100;
  }
}
function reset(){
  gameState = PLAY;
  count = 0;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running_trex", trex_running );
  gameOver.visible = false;
  restart.visible = false;
}