

var Enemy = function(x,y, step) {
    this.x = x;
    this.y = y;
    this.step = step;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.step*dt;
    if(this.x > 500) {
        delete Enemy();
    }
    if(this.x - player.x > -80 && this.x - player.x < 80 && this.y == player.y) {
        player.y = 300;
        player.x = 200;
        (player.points - 500 > 0) ? player.points -= 500 : player.lives -= 1;
        player.lifeChecker();
        player.setScore();
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.heart = 'images/Heart.png';
    this.x = x;
    this.y = y;
    this.points = 0;
    this.lives = 3;
};
Player.prototype.update = function(x, y, dt) {
    if(this.y < 0)
    {
        this.y = 300;
        this.addScore();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.lifeChecker();  
};

Player.prototype.addScore = function() {
    this.points += 100;
    player.setScore();
};

Player.prototype.setScore = function() {
    document.getElementById("score").innerHTML = this.points;
    //ctx.fillText(this.points, 25, 50);
};

Player.prototype.lifeChecker = function() {
    var i = this.lives;
    while(i--) {
        ctx.drawImage(Resources.get(this.heart),30 * i , 500 ,35 , 50 );
    }
    if(this.lives == 0) {
       //this.displayDialog("Game Over!");
        ctx.fillStyle = "black";
        ctx.fillRect(100, 180, 300, 200);
        ctx.clearRect(110, 190, 280, 180)
        ctx.fillStyle = "black";
        ctx.font = "20px arial";
        ctx.fillText("Game Over", 200, 250);
        ctx.fillText("Press Enter to play again",140, 300);
        document.addEventListener('keyup', (event) => {
            if(event.key === 'Enter')
                window.location.reload();
        }, true);
        
    }
};

Player.prototype.displayDialog = function(innerText) {
    
};

Player.prototype.handleInput = function(e) {
    switch (e) {
        case "up":  
                    this.y -= 85;
                    break;
        case "left":    
                    if(this.x > 0)
                        this.x -= 100;
                    break;
        case "right":
                    if(this.x < 400)
                        this.x += 100; 
                    break;
        case "down":
                    if(this.y < 380)
                        this.y += 85;
                    break;
    }       
};

var Verticals = [215, 130, 45];
allEnemies = [new Enemy(300, 215, 15), new Enemy(100, 130, 25), new Enemy(200, 45, 80)];
player = new Player(200, 300);

var interval = window.setInterval(function() {
    step = Math.random() * (150-60) + 60;
    Y = Verticals[(getIndex())];
    allEnemies.push(new Enemy(-100, Y, step));
}, 1500)

var getIndex = function()
{
    return Math.floor(Math.random() * (3-0) + 0);
}



document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
