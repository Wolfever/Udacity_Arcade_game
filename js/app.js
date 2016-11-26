
// Enemy Number: you can choose the maximum number that can be shown
// on the screen 
var enemyNum = 5;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var rowNum =  Math.floor(Math.random() * 3 ) + 2; 
    this.row = rowNum; // set the bug randomly on the street 

    var speed = 150 + Math.floor(Math.random() * 100);  
    this.speed = speed; // speed is how many pixels the bug will move right per second. 
    this.sprite = 'images/enemy-bug.png'
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x || -Math.floor(Math.random()*1050 - 101);  // give the bug a different starting point 
    
    this.x += this.speed * dt;
    // if the bug moves out of the screen, the bug returns to the left, and was put to a different row
    if(this.x > 570) {
        this.row = Math.floor(Math.random() * 3 ) + 2;
        this.x = -Math.floor(Math.random()*100) - 101;   
    }

    this.y = 83 * this.row - 90;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function() {
    var cola = 2;
    var rowa = 6; 
    this.col = cola;
    this.row = rowa;
    this.x = 202;
    this.y = 408;
    this.sprite = "images/char-boy.png";
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function() {
    this.x = this.col * 101;
    this.y = this.row * 83 - 90; 
}

Player.prototype.handleInput = function(dir) {
    switch(dir){
        case 'left':
            if(this.col>0){
                this.col--;
            };
            break;
        case 'up':
            if(this.row>2){
                this.row--;

            } else{this.row=6;
                alert("Success! Cheers! ")};
            break;
        case 'right': 
            if (this.col<4){
                this.col++
            };
            break;
        case 'down': 
            if(this.row<6){
                this.row++;
            };
            break;
        default: 
            console.log("use other keys please");
    }
}

var checkCollisions = function() {
    for(var i = 0; i<enemyNum; i++){
        if(allEnemies[i].y == player.y){
            if(Math.abs(allEnemies[i].x - player.x) < 55){
                player.col = 2;
                player.row = 6;
                alert("BUG!");
            }
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
for(var z = 0; z < enemyNum; z++) {
    allEnemies[z] = new Enemy();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
