//animation 
//life 
//loading screen
//reset

let currentstate = 0 ;
let car;
let carimg;
let bg;
let video;
let playButton;
let lEADERBOARDButton;
var star= [];
var star1 = [];
var star2 = [];
let s = 0;
let spaceship;
let spaceshipimg;
let x = 425;
let y = 700;
let o = 15;
let a = 15;
let e = 15;
let obstacle =[];
let enemies;
let barrrier;
let obstacleimg;
let asteroid =[];
let asteroidimg;
let enemyship = [];
let enemyshipimg;
let bullets; 
let bulletimg;
let fire;
let smallexplosion;
let largeexplosion;
let gameover;
let gameoverimg;
let lead;
let limg;








function preload(){
  carimg = loadImage('ship.png')
  bg = loadImage('bg.jpg')
  video = createVideo('1.mp4');
  spaceshipimg = loadImage('ship.png')
  obstacleimg = loadImage('obstacle.jpg')
  asteroidimg = loadImage('asteroid.png')
  enemyshipimg = loadImage('enemyship.png')
  bulletimg = loadImage('bullet.png')
  fire = loadSound('fire.wav')
  smallexplosion = loadSound('bangSmall.wav')
  largeexplosion = loadSound('bangLarge.wav')
  gameoverimg = loadImage('gameover.png')
  lead = loadJSON('3.json')
  limg = loadImage('4.jpg')
  
}

function setup(){
  createCanvas(850,750);

  for( var i =0 ; i<30 ;i++){
    star[i] = new Star();
  }
  for( var i =0 ; i<30 ;i++){
    star1[i] = new Star1();
  }
  for( var i =0 ; i<30 ;i++){
    star2[i] = new Star2();
  }


  bullets = new Group();
  enemies = new Group();
  

  spaceship = createSprite(x,y);
  spaceship.addImage(spaceshipimg);
  spaceship.scale = 0.001;
  spaceship.setCollider("circle")
  spaceship.debug = true;

  barrrier = createSprite(0,-5,1700,5);
  

  for(i = 0; i<o ; i++){
  obstacle[i]= createSprite(random(0+40,width-40),random(-20,-height*5));
  obstacle[i].addImage(obstacleimg);
  obstacle[i].scale = 0.01;
  obstacle[i].addToGroup(enemies)
  }

  for(i = 0; i<a; i++){
    asteroid[i]= createSprite(random(0+20,width-20),random(-20,-height*5));
    asteroid[i].addImage(asteroidimg);
    asteroid[i].scale = 0.01;
    asteroid[i].debug = true;
    asteroid[i].setCollider("circle")
    asteroid[i].addToGroup(enemies)
  }

  for(i = 0; i<e; i++){
    enemyship[i]= createSprite(random(0+30,width-30),random(-20,-height*5));
    enemyship[i].addImage(enemyshipimg);
    enemyship[i].scale = 0.1;
    enemyship[i].debug = true;
    enemyship[i].setCollider("circle")
    enemyship[i].addToGroup(enemies)
  }

  gameover = createSprite(width/2,height/2,0.1,0.1);
  gameover.scale = 2;


  lEADERBOARDButton = createButton('LEADERBOARD');
  lEADERBOARDButton.position(width/2-50,height/2-25);
  lEADERBOARDButton.size(100,50)
  lEADERBOARDButton.hide();

  playButton = createButton('PLAY');
  playButton.position(width/2-50,height/2-125);
  playButton.size(100,50)
  playButton.hide();


  
  
}






function intro(){
  //ellipse(40,40,70,40)
  
  image(bg,0,0,width,height);
  video.hide();
  
  
  if(mouseIsPressed){
    currentstate = 1;
    
  }
}


function mainmenu(){
  image(video, 0, 0, width,height);
  video.hide();
  video.loop();
  playButton.show();
  lEADERBOARDButton.show();
  


  
 
  
  if(mouseIsPressed && dist(mouseX,mouseY,width/2,height/2-100)<50 ){
    currentstate = 3;
    playButton.hide();
    lEADERBOARDButton.hide();
    video.stop();

  }
  if(mouseIsPressed && dist(mouseX,mouseY,width/2,height/2)<50 ){
    currentstate = 2;
    playButton.hide();
    lEADERBOARDButton.hide();
    video.stop();
  }
   if(keyWentDown('b')){
     currentstate=0;
     playButton.hide();
    lEADERBOARDButton.hide();
    video.stop();
   }

}


  


function learderboard(){
  image(limg,0,0,width,height);

  textSize(35);
  fill(127)
  textFont('Inconsolata');

  text('Rank',200,100)
  text('Name',400,100)
  text('Highest Score',600,100)

  text(lead.Players[0].rank.number[0],200,200)
  text(lead.Players[0].details.name[0],400,200)
  text(lead.Players[0].Score.highestScore[0],600,200)

  text(lead.Players[1].rank.number[0],200,300)
  text(lead.Players[1].details.name[0],400,300)
  text(lead.Players[1].Score.highestScore[0],600,300)

  text(lead.Players[2].rank.number[0],200,400)
  text(lead.Players[2].details.name[0],400,400)
  text(lead.Players[2].Score.highestScore[0],600,400)

  text(lead.Players[3].rank.number[0],200,500)
  text(lead.Players[3].details.name[0],400,500)
  text(lead.Players[3].Score.highestScore[0],600,500)

  text(lead.Players[4].rank.number[0],200,600)
  text(lead.Players[4].details.name[0],400,600)
  text(lead.Players[4].Score.highestScore[0],600,600)
  
}



function game(){

  
  textSize(50);
  textFont('Secular One');
  fill(255,250,0)
  text('score',680,50);
  text(s,680,100);
  
  spaceship.scale = 1;

  for(i = 0; i<o ; i++){
    obstacle[i].scale =0.3
    obstacle[i].setSpeed(5,90);
    if(obstacle[i].position.y>height+50){
      obstacle[i].position.y = random(0,-height*5)
    }
  }

  for(i = 0; i<a ; i++){
    asteroid[i].scale =0.1
    asteroid[i].setSpeed(3,90);
    asteroid[i].rotationSpeed = 3;
    if(asteroid[i].position.y>height+20){
      asteroid[i].position.y = random(0,-height*5)
    }
  }

  for(i = 0; i<e ; i++){
    enemyship[i].scale =0.1
    enemyship[i].setSpeed(2,90);
    enemyship[i].attractionPoint(2,spaceship.position.x,spaceship.position.y)
    if(enemyship[i].position.y>height){
      enemyship[i].position.y = random(0,-height*5)
    }
  }





  for (let h = 0; h <enemies.length; h++){
    if(spaceship.overlap(enemies[h])) {
     largeexplosion.play();
     largeexplosion.setVolume(3)
     spaceship.remove();
     enemies.removeSprites (); 
     gameover.addImage(gameoverimg);
  
    }
  }

  for (let h = 0; h <enemies.length; h++){
    if(bullets.overlap(enemies[h])) {
      bullet.remove();
      enemies[h].remove();
      s+=10;      
    }
  } 

  if(bullets.overlap(barrrier)) {
    bullet.remove();
  }

  
 

      

  if(spaceship.position.x < 25){
    spaceship.position.x =25;
  }
  if(spaceship.position.x > 825){
    spaceship.position.x = 825
  }
  if(keyWentDown(RIGHT_ARROW)){
    spaceship.setSpeed(+7,0)   
  }
  if(keyWentUp(RIGHT_ARROW)){ 
    spaceship.setSpeed(0)
  }
  if(keyWentDown(LEFT_ARROW)){
    spaceship.setSpeed(-7,0)
  }
  if(keyWentUp(LEFT_ARROW)){ 
    spaceship.setSpeed(0)
  }

  if(keyWentDown('x')){
    bullet = createSprite(spaceship.position.x, spaceship.position.y -24,5,5);
    bullet.setSpeed(10+spaceship.getSpeed(), 270); 
    bullets.add(bullet);
    bullet.addImage(bulletimg);
    fire.play();
  }
  
  
  
  
}

function Star(){
  this.x = random(0 ,width);
  this.y =random(0 ,height);
    this.show = function(){
      fill(255)
      ellipse(this.x,this.y,3,3)
    }
    this.update = function(){
      this.y = this.y + 1;
        if(this.y>height){
          this.y = random(0,-height)
        }
    }
}
function Star1(){
  this.x = random(0 ,width);
  this.y =random(0 ,height);
    this.show = function(){
      fill(255)
      ellipse(this.x,this.y,3,3)
    }
    this.update = function(){
      this.y = this.y + 3;
        if(this.y>height){
          this.y = random(0,-height)
        }
    }
}
function Star2(){
  this.x = random(0 ,width);
  this.y =random(0 ,height);
    this.show = function(){
      fill(255)
      ellipse(this.x,this.y,3,3)
    }
    this.update = function(){
      this.y = this.y + 5;
        if(this.y>height){
          this.y = random(0,-height)
        }
    }
}



function draw(){
  background(0);

  
  switch(currentstate){
    case 0:
      intro();
    break;
    case 1:
      mainmenu();
    break;
    case 2:
      learderboard();
    break;
    case 3:

      for( var i =0 ; i<30 ;i++){
        star[i].show();
        star[i].update();
      }
      for( var i =0 ; i<30 ;i++){
        star1[i].show();
        star1[i].update();
      }
      for( var i =0 ; i<30 ;i++){
        star2[i].show();
        star2[i].update();
      }
            
      game();
     
    break;
  } 
  
  drawSprites();
}