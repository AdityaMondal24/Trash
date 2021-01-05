var dog, happyDog, database, foodS, foodStock;
var canvas,database;

function preload()
{
    dogImage = loadImage("images/dogImg.png");
    happydogImage = loadImage("images/dogImg1.png");
}

function setup()
{
    database = firebase.database();
    canvas = createCanvas(1000,1000);
    dog = createSprite(250,250,50,50);
    dog.addImage(dogImage);
    dog.scale = 0.1;
    /*foodStock = database.ref('Food');
    foodStock.on("value", readStock, showError);*/
    foodObj = new Food();
    feed = createButton("Feed the Dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(700,95);
    addFood.mousePressed(addFoods);
}

function draw()
{
    background(46, 139, 87);
    foodObj.display();

    fedtTime = database.ref('FeedTime');
    fedTime.on("value",function(data){
        lastFed = data.val();
    });
    drawSprites();
    fill(0);
    stroke(4);
    textSize(20);
    text("Milk left:" + foodS,100,100);
    fill(255,255,254);
    textSize(15);
    if(lastFed>=12)
    {
        text("Last Fed: "+ lastFed%12 + "PM",350,30);
    }
    else if(lastFed == 0)
    {
        text("Last Feed : 12 AM",350,30);
    }
    else
    {
        text("Last Fed : "+ lastfed + "AM", 350,30);
    }
}

/*function readStock(data)
{
    foodS = data.val();
}

function writeStock(x)
{
    if(x<=0)
    {
        x = 0;
    }
    else
    {
        x--;
    }
    database.ref('/').update({
        Food: x
    });
}

function showError()
{
    console.log("Error in writing to database");
}*/

function feedDog()
{
    dog.addImage(happyDogImage);

    foodObj.updateFoodStock(foodObj.getFoodStock()--);
    database.ref('/').update({
        Food: foodObj.getFoodStock(),
        FeedTime: hour()
    })
}

function addFoods()
{
    foodS++;
    database.ref('/').update({
        Food: foodS
    })
}