var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameOver, gameOverImg;
var gameState = "play"


function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage("gameover.png")
}

function setup() {

  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);


  gameOver = createSprite(300, 300);
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.4
}

function draw() {
  background(200);

  if (gameState === "play") {

    if (tower.y > 400) {
      tower.y = 300
    }

    gameOver.visible = false;

    if (keyDown("right_arrow")) {
      ghost.x += 3
    }
    if (keyDown("left_arrow")) {
      ghost.x -= 3
    }
    if (keyDown("up_arrow")) {
      ghost.y -= 3
    }
    if (keyDown("down_arrow")) {
      ghost.y += 3

    }

    doors();

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
    // gameState === "end";
     
    //  End();

    }
    drawSprites()
  }
 // function End(){
   if (gameState === "end") {
   
  gameOver.visible = true;
  tower.velocityY = 0;
  invisibleBlockGroup.velocityY = 0;
  doorsGroup.velocityY = 0;
  climbersGroup.velocityY = 0;
   }
  //}
  

}




function doors() {

  if (frameCount % 200 === 0) {

    door = createSprite(200, -50)
    door.addImage(doorImg)
    door.velocityY = 1
    door.x = Math.round(random(120, 400))
    doorsGroup.add(door)
    door.lifetime = 600


    climber = createSprite(200, 10)
    climber.lifetime = 600
    climbersGroup.add(climber)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.x = door.x

    invisibleBlock = createSprite(200, 15)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.velocityY = 1
    invisibleBlock.x = door.x
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.lifetime = 600
  }

}