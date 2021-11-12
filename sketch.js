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
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var apple;
var boy;

var button,blower;
var boyy;
var eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var blower;

function preload()
{
  bg_img = loadImage('beautiful_image.png');
  apple = loadImage('apple.png');
  boy = loadImage('Cartoonboy.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  eat = loadImage("cartoonboy_eating.png");
  sad = loadImage("cartoonboy_sad.png");

  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  blower = createImg('balloon.png');
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airBlow);

  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  eat.frameDelay = 20;

  boyy = createSprite(400,420,100,100);
  //boyy.scale = 0.2;
  
  //boyy.addImage(boy);
  //boyy.addAnimation('eating',eat);
  //boyy.addAnimation('crying',sad);
  //bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background("white");
  //image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  fruit.addImage(apple);
  boyy.addImage(boy);
  drawSprites();

  if(collide(fruit,boyy)==true)
  {
    boyy.changeImage(eat);
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    boyy.changeImage(sad);
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){
 Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
 air.play();
}

function mute(){
 if(bk_song.isPlaying())
 {
   bk_song.stop();
 }
 else
 {
  bk_song.play();
 }

}
