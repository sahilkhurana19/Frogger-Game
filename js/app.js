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
        player.lives -= 1;
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
    this.points = 2900;
    this.lives = 3;
    this.gameOver = false;
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
    if(this.points > 0) {
        switch(this.points){
            case  300: 
                interval = 1400;
                topSpeed = 190;
                minSpeed = 170;
                break;
            case 500:   
                interval = 1200;
                topSpeed = 200;
                minSpeed = 180;
                break;
            case 700: 
                interval = 1000;
                topSpeed = 220;
                minSpeed = 190;
                break;
            case 900:
                interval = 800;
                topSpeed = 240;
                minSpeed = 220;
                break;
            case 1300:
                interval = 600;
                topSpeed = 260;
                minSpeed = 260;
                break;
            case 1700:
                interval = 500;
                topSpeed = 300;
                minSpeed = 280;
                break;
            case 2500: 
                interval = 300;
                topSpeed = 360;
                minSpeed = 360;
                break;
            case 3000:
                interval = 300;
                topSpeed = 600;
                minSpeed = 600;
                
        }
        console.log(this.points, interval, topSpeed, minSpeed);
        clearInterval(intervalID);
        startInterval(interval, 250, 200);
    }
    //ctx.fillText(this.points, 25, 50);
};

Player.prototype.lifeChecker = function() {
    var i = this.lives;
    while(i--) {
        ctx.drawImage(Resources.get(this.heart),30 * i , 500 ,35 , 50 );
    }
    if(this.lives == 0) {
       //this.displayDialog("Game Over!");
        this.gameOver = true;
        ctx.fillStyle = "black";
        ctx.fillRect(100, 180, 300, 200);
        ctx.clearRect(110, 190, 280, 180)
        ctx.fillStyle = "black";
        ctx.font = "20px arial";
        ctx.fillText("Game Over", 200, 250);
        ctx.fillText("Press Enter to play again",140, 300);
        document.addEventListener('keyup', function(event) {
            if(event.key === 'Enter')
                window.location.reload();

        }, false);
        
    }
};

Player.prototype.displayDialog = function(innerText) {
    
};

Player.prototype.handleInput = function(e) {
    if(this.gameOver === false)
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

var Object = function() {
    this.gem = 'images/Gem Orange.png';
    this.life = 'images/Heart.png';
    this.star = 'images/Key.png';
};

Object.prototype.place = function(){

};

Object.prototype.remove = function() {

};

var Verticals = [215, 130, 45];
allEnemies = [new Enemy(300, 215, 15), new Enemy(100, 130, 25), new Enemy(200, 45, 80)];
player = new Player(200, 300);

//Try object instead of seperate vars
var interval = 1500;
var topSpeed = 180;
var minSpeed = 140;

startInterval(interval, 180, 130);

function startInterval(_interval, _topSpeed, _minSpeed) {   
    intervalID  = window.setInterval(function(){
        step = Math.random() * (topSpeed-minSpeed) + minSpeed;
        Y = Verticals[(getIndex())];
        allEnemies.push(new Enemy(-100, Y, step));
    }, _interval)
}

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
