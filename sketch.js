var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime = 0;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  // creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  //create food and obstacle Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();

}


function draw() {
  background (255);
  
  stroke ("white");
  textSize(20);
  fill ("white");
  text ("Score : " + score, 500, 500);
  
  stroke ("black");
  textSize(20);
  fill("black");
  survivalTime= Math.ceil(frameCount/frameRate());
  text ("Survival Time:"+survivalTime, 100, 50);
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.X = ground.width/2;
  //console.log(ground.X);
  
  //making monkey jump
  if(keyDown("space") && monkey.y >= 200) {
    monkey.velocityY = -12;
  }
    
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //spawn banana;
  createBanana()
  
  //spawn obstacles on the ground
  createObstacles()
  
  
  //stop monkey from falling down
  monkey.collide(ground);
  
  drawSprites();
  
}

function createBanana() {
  //write code here to create the bananas
  if (frameCount % 80 === 0) {
    var banana = createSprite(300,Math.round(random(120,200)),40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
    }
}

function createObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400, 325, 20, 20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(6 + survivalTime/100);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}