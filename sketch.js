var paddle

var ball,Ball

var FORM = 0
var PLAY = 1
var END = 2
var gameState = FORM


///backgrounds
var backgroundImg1,backgroundImg2,backgroundImg3,backgroundImg4
var backgroundImg5,backgroundImg6,backgroundImg7,backgroundImg8, backgroundImg
/// Bricks 
var brick1,brick2
var brick3,brick4,brick5,brick6


var BrickGroup
var timeline = 120
var score = 0
var coin = 0

function preload(){
// for backgrounds
backgroundImg1 = loadImage("Images/CrossHill.bg.png")
backgroundImg2 = loadImage("Images/HalloweenImage.jpg")
backgroundImg3 = loadImage("Images/HalloweenImage2.jpg")
backgroundImg4 = loadImage("Images/happy-halloween.jpg")
backgroundImg5 = loadImage("Images/MoonBg.jpg")
backgroundImg6 = loadImage("Images/spacebg.jpg")
backgroundImg7 = loadImage("Images/WarImage.jpg")
backgroundImg8 = loadImage("Images/spaceImg.jpg")

// For Bricks
brick1 = loadImage("Images/DARKBLACKBRICK.png")
brick2 = loadImage("Images/OrangishBrick.png")
brick3 = loadImage("Images/RED.BRICK.png")
brick4 = loadImage("Images/stickIMG.png")
brick5 = loadImage("Images/WhiteBrick.png")
brick6 =  loadImage("Images/Yellowbrick.png")

// for paddle 
p1 = loadImage("Images/PADDLE1.png")
p2 = loadImage("Images/PADDLE2.png")

////remaning
Restart = loadImage("Images/restartButton.png")
Play =  loadImage("Images/playButton.png")
Ball = loadImage("Images/SilverBall.png")
Ufo = loadImage("Images/UfO.png")
GameOver = loadImage("Images/gameOver.png")
Back = loadImage("Images/BackGroundChange.png")
}

function setup() {

createCanvas(displayWidth,displayHeight);
//(1366,768)
backgroundImg = createSprite(displayWidth/8 - 20,displayHeight/2 - 84,40,50)
backgroundImg.addImage("back",Back)
backgroundImg.scale = 0.4
backgroundImg.visible = false;


BrickGroup = new Group();

// Creating a ball 
ball  = createSprite(displayWidth/2 - 83,displayHeight/2 - 34,10,10)
ball.addImage("Balls",Ball)

ball.velocityX = -5
ball.velocityY = 5

ball.scale = 0.140;
ball.visible = false;
ball.setCollider("circle",0,0,20) 

//creating a paddle
paddle = createSprite(displayWidth/2 ,displayHeight - 128,20,20)

var Paadle = Math.round(random(1,2))
switch(Paadle) {
        case 1: paddle.addImage(p1);
                break;
        case 2: paddle.addImage(p2);
                break;
       
        default: break;
      }
paddle.scale = 0.3
paddle.visible = false;

// Play sprite
play = createSprite(displayWidth/2 - 20 ,displayHeight/2 - 45,40,30)
play.addImage("play",Play)
play.visible = false;
play.scale = 0.3


// sprite objects for gameState = 2

gameOver = createSprite(displayWidth/2 - 20,displayHeight/4 ,30,30)
gameOver.addImage("game",GameOver)
gameOver.scale = 0.8;


restart = createSprite(displayWidth/2 - 20,displayHeight/2 + 40,30,30)
restart.addImage("restart",Restart)
restart.scale = 0.2;
restart.visible = false;
gameOver.visible = false;


// Ufo's  in the first image of the programme
ufo1 = createSprite(displayWidth/3 - 40,displayHeight/3 - 34 ,20,20)
ufo1.addImage("ufo1",Ufo)

ufo2 = createSprite(displayWidth/2 - 20,displayHeight/4 + 5,20,20)
ufo2.addImage("ufo2",Ufo)

ufo3 = createSprite(displayWidth - 500,displayHeight/3 - 34,20,20)
ufo3.addImage("ufo2",Ufo)

ufo4 = createSprite(displayWidth - 500,displayHeight/4 - 42,20,20)
ufo4.addImage("ufo2",Ufo)

ufo1.visible = false;
ufo2.visible = false;
ufo3.visible = false;
ufo4.visible = false;

ufo1.scale = 0.2;
ufo2.scale = 0.2;
ufo3.scale = 0.2;
ufo4.scale = 0.2;

}

function draw() {

 background(backgroundImg8); 
 
 
console.log(World.mouseX,World.mouseY)

if(gameState === 0) {

play.visible = true;
backgroundImg.visible = true;

// changing the gameState from 0 to 1 by clicking on play Sprite
 if(mousePressedOver(play)){
  gameState = 1

  ball.x = displayWidth/2 - 83;
  ball.y = displayHeight/2 - 34;

  }
// visibility of ufo
 ufo1.visible = true;
 ufo2.visible = true;
 ufo3.visible = true;
 ufo4.visible = true;
 

}

else if(gameState === 1){

// visibility of ufo

play.visible = false;
ufo1.visible = false;
ufo2.visible = false;
ufo3.visible = false;
ufo4.visible = false;
backgroundImg.visible = false;


textFont("Arial");
textSize(41);
fill("red");
// setting the timeline so that gameState should change 
timeline = timeline - 0.03;


spawnBricks();


// condition for changing the state when timer finishes
if(timeline === 0){
gameState = 2
}

paddle.visible = true;
ball.visible = true;
// for making the ball bounce off the edges 
edges = createEdgeSprites();
ball.bounceOff(edges[0]);
ball.bounceOff(edges[1]);
ball.bounceOff(edges[2]);

ball.bounceOff(paddle);
        

// paddle should move according to the x position of the mouse 
paddle.x = World.mouseX;

// to make the BrickGroup bounce off the ball so as to score points
if(BrickGroup.bounceOff(ball)){

score = score + 1
        
}


// condition for making the player loose
if(ball.y > displayHeight){

gameState = 2

}


}// when gameState turns 2 
else if(gameState === 2){

        BrickGroup.setVelocityXEach(0);
        BrickGroup.setLifetimeEach(-1)

        gameOver.visible = true;
        restart.visible = true;



// condition for if mouse is pressed over mouse to make the gameState = 2
if(mousePressedOver(restart)){
reset();
timeline =  120
}

}

 // collider of the group is set so as to make the group bounce off a particular distance
BrickGroup.setColliderEach("rectangle",0,0,280,40);

// condition for changing the background Image
 if(mousePressedOver(backgroundImg) ) {

    bg = createSprite(600,270,1200,550)

    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: bg.addImage(backgroundImg1);
              break;
      case 2: bg.addImage(backgroundImg2);
              break;
      case 3: bg.addImage(backgroundImg3);
              break;
      case 4: bg.addImage(backgroundImg4);
              break;
      case 5: bg.addImage(backgroundImg5);
              break;
      case 6: bg.addImage(backgroundImg6);
              break;
      case 7: bg.addImage(backgroundImg7);
              break;
      default: break;
    }
// Depth is set so that the sprites may be visible even if the background is changed 
    play.depth = bg.depth + 1
    backgroundImg.depth = bg.depth + 1
    ball.depth = bg.depth + 1
   paddle.depth= bg.depth + 1
   restart.depth =  bg.depth + 1
   gameOver.depth =  bg.depth + 1
 }
 
  drawSprites();
textSize(30)
fill("red");
// Making the score,timeline,gold visible in the form of text

text("Score::" + score,700,50)

text("Time Left ::" + Math.round(timeline),100,100)

text("Gold::" + coin,100,30)
// function for displaying the EndScore and feedbackc
feedback();
EndScore();

}

function EndScore(){

if(gameState === 2){

textFont("Arial");
textSize(21);
fill("yellow");
text("Your Score was ::" + score,700,250)
}

}

function spawnBricks(){
if(frameCount % 90 === 0){
       
var brick = createSprite(displayWidth + 20,random(100,displayHeight - 216),30,10)
brick.velocityX = -3;
//brick.debug = true;   

var Bricks = Math.round(random(1,6));
switch(Bricks) {
        case 1: brick.addImage(brick1);
                break;
        case 2: brick.addImage(brick2);
                break;
        case 3: brick.addImage(brick3);
                break;
        case 4: brick.addImage(brick4);
                break;
        case 5: brick.addImage(brick5);
                break;
        case 6: brick.addImage(brick6);
                break;
       
        default: break;
      }
   
    
   brick.scale = 0.5;
   brick.lifetime = 500;
  // brick.debug = true;             

  BrickGroup.add(brick);


}

}
function reset(){

gameState = 0 ;
ball.x = 600;
ball.y = 250;
ball.visible = false;


gameOver.visible = false;
restart.visible = false;
    
BrickGroup.destroyEach();

play.visible = true;
score = 0;
timeline = 120

coin = coin + 200
    }

function feedback(){

if(gameState === 2){



        textFont("Arial");
        textSize(21);
        fill("yellow");

        if(score > 10){

     text("Ush Don't tell anyone that you are the best",450,350)  
          }
          else if(score < 10 && score > 5){
          
          text("well done My Friend",450,350)
          
          }
          else if (score === 0){
          
          text(" A little bit of hardwork will make you perfect in no time", 450,350 )
          
          }
          else if(score > 0 && score < 5){
          
          text("wow IT'S marvellous ",450,350)
         
          }
          else if(score > 15){

        text("Super Amazing ",450,350)
          }
        }

}


