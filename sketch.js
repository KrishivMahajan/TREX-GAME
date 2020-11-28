var trex,trex_running,trex_collided;
var ground,ground_image;
var cloud_image,cloudGroup;
var ob1,ob2,ob3,ob4,ob5,ob6,obstacleGroup;
var score;
var PLAY,END,gameState;
var gameover_img,restart_img,gameover,restart;
var jsound,cpsound,diesound;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  ground_image=loadImage("ground2.png");
  
  cloud_image=loadImage("cloud.png");
  
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  
  trex_collided=loadAnimation("trex_collided.png");
  
  gameover_img=loadImage("gameOver.png");
  restart_img=loadImage("restart.png");
  
  jsound=loadSound("jump.mp3");
  cpsound=loadSound("checkPoint.mp3");
  diesound=loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(40,160,10,10);
   trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.5;
 
  ground=createSprite(300,180,600,10);
  ground.addImage(ground_image);
  ground.x=ground.width/2;
  
  trex.debug=true;
  trex.setCollider("circle",0,0,40);
  
  gameover=createSprite(300,100,10,10);
  gameover.addImage(gameover_img);
  gameover.scale=0.5;
  
  restart=createSprite(300,150,10,10);
  restart.addImage(restart_img);
  restart.scale=0.4;
  
  
  score=0;
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  
  cloudGroup=new Group();
  
  obstacleGroup=new Group();
}

function draw() {
 background("white"); 

  trex.collide(ground);
  
  fill("black");
  text("SCORE : "+ score,300,40);
  
 if(gameState===PLAY){  
  ground.velocityX=-4;
    
  if(keyDown("space")&&trex.y>=150){
    trex.velocityY=-10;
    jsound.play();
  }
  trex.velocityY=trex.velocityY+0.8;
  //console.log(trex.y)
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  score=score+Math.round(getFrameRate()/60);
   
   if(score%100===0&&score>0){
     cpsound.play();
   }
   
  spawnObstacles();
  spawnClouds();
   
   gameover.visible=false;
   restart.visible=false;
   
    if(trex.isTouching(obstacleGroup)){
      gameState=END;
      diesound.play();
      
    }
 }
  
  
   
  else if(gameState===END){
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    trex.velocityY=0;
    trex.changeAnimation("collided",trex_collided);
    gameover.visible=true;
   restart.visible=true;
  }
 
 if(mousePressedOver(restart)){
   reset();
 }
  
  drawSprites();
  
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(60,120));
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
}

function spawnObstacles() {
 if(frameCount % 70===0){
  var obstacles=createSprite(600,160,10,10);
   var rand=Math.round(random(1,6));
   switch(rand){
     case 1:obstacles.addImage(ob1);
       break;
       
       case 2:obstacles.addImage(ob2);
       break;
       
       case 3:obstacles.addImage(ob3);
       break;
       
       case 4:obstacles.addImage(ob4);
       break;
       
       case 5:obstacles.addImage(ob5);
       break;
       
       case 6:obstacles.addImage(ob6);
       break;
       
       default:
       break;
   }
   obstacles.velocityX=-5;
   obstacles.lifetime=120;
   obstacles.scale=0.5;
   
   obstacleGroup.add(obstacles);
   
 }
}

function reset(){
  gameState=PLAY;
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score=0;
}