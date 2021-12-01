const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,sword,ground;
var sword_con;
var sword_con_2;
var sword_con_3;
var rope3;

var bg_img;
var weapon;
var rabbit;

var button,button2,button3;
var chicken;
var happy,fried;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

var star_img, star, star2

var blower

var emptyStar, oneStar, twoStar, starDisplay 

function preload()
{
  bg_img = loadImage('background.png');
  weapon = loadImage('sword.png');
  rabbit = loadImage('Rabbit-01.png');
  star_img = loadImage("star.png")
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  happy = loadImage("chicken.png");
  fried = loadImage("friedChicken.png")

  emptyStar = loadAnimation("empty.png")
  oneStar = loadAnimation("one_star.png")
  twoStar = loadAnimation("stars.png")

}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(7,{x:490,y:90});


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  blower = createImg("baloon2.png")
  blower.position(260,370)
  blower.size(120,120)
  blower.mouseClicked(airBlow)
  
  ground = new Ground(300,height,width,20);

  chicken = createSprite(200,height-80,100,100);
  chicken.scale = 0.2;

  chicken.addAnimation('happiness',happy);
  chicken.addAnimation('friedChicken',fried)
  



  
  sword = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,sword);

  sword_con = new Link(rope,sword);
  sword_con_2 = new Link(rope2,sword);

  star = createSprite(320,50,20,20)
  star.addImage(star_img)
  star.scale=0.02

  star2 = createSprite(50,370,20,20)
  star2.addImage(star_img)
  star2.scale=0.02

  starDisplay = createSprite(50,20,30,30)
  starDisplay.scale = 0.2
  starDisplay.addAnimation("empty",emptyStar)
  starDisplay.addAnimation("one",oneStar)
  starDisplay.addAnimation("two",twoStar)
  starDisplay.changeAnimation("empty")



  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(sword!=null){
    image(weapon,sword.position.x,sword.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(sword,chicken)==true)
  {
    World.remove(engine.world,sword);
    sword = null;
    chicken.changeAnimation('friedChicken');
    eating_sound.play();
  }

  if(collide(sword,star,20)==true){
    star.visible = false
    starDisplay.changeAnimation("one")
  }

  if(collide(sword,star2,20)==true){
    star2.visible = false
    starDisplay.changeAnimation("two")
  }

  if(sword!=null && sword.position.y>=650)
  {
    chicken.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    sword=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  sword_con.dettach();
  sword_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  sword_con_2.dettach();
  sword_con_2 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airBlow(){
  Matter.Body.applyForce(sword,{x:0,y:0},{x:0,y:-0.03})
  air.play()
}

