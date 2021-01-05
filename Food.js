class Food
{
    constructor()
    {
        this.image = loadImage("images/Milk.png");
    }
}
getFoodStock()
{
    var foodStockRef = database.ref('playerCount');
        foodStockRef.on("value",function(data){
            foodS = data.val();
        })
}
updateFoodStock()
{
    database.ref('/').update({
        Food : foodS
    })
}
update(foodS)
{
    //var playerIndex = "player" + playerCount;
        datebase.ref(foodS).set({
            Food : foodS
        })
}
display()
{
    var x = 80, y = 100;

    imageMode(CENTER);
    //image(this.image, 720, 220, 70,70);

    if(this.foodStock !== 0)
    {
        for(var i = 0; i<this.foodStock; i++)
        {
            if(i%10 == 0)
            {
                x = 80
                y += 50;
            }
            image(this.image,x,y,50,50);
            x += 30;
        }
    }
}