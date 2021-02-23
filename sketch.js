//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;


function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,100,100);
  dog.addImage("dog", dogImg);
  dog.scale=0.5

  database = firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);

  drawSprites();

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('food').update({
    food:x
  })
}