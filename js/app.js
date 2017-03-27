

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
    this.points = 0;
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
                difficultySetter(1400, 190, 170, 2, 3); 
                break;
            case 500:
                difficultySetter(1200, 200, 180);   
                break;
            case 700:
                difficultySetter(1000, 220, 190);  
                break;
            case 900:
                difficultySetter(800, 240, 220, 1, 3); 
                break;
            case 1300:
                difficultySetter(600, 260, 260);
                break;
            case 1700:
                difficultySetter(500, 300, 280, 3, 1);
                break;
            case 2500:
                difficultySetter(300, 360, 360); 
                break;
            case 3000:
                difficultySetter(300, 600, 600, 2, 2);
                break;
            case 3200:
                difficultySetter(300, 650, 650);
                break;                
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

var Item = function() {
    this.gem = 'images/Gem Orange.png';
    this.life = 'images/Heart.png';
    this.star = 'images/Key.png';
    this.height = 95;
    this.width = 130;
    this.Xoffset;
    this.Yoffset;
};

Item.prototype.render = function(){
    ctx.drawImage(Resources.get(this.gem), 101*this.Xoffset ,  84*this.Yoffset ,this.height, this.width);
};

Item.prototype.create = function(_points) {
    console.log("In create");
    
}

Item.prototype.remove = function() {

};
Item.prototype.update = function() {
    //console.log(this.Yoffset * 84 , player.y);
    //console.log(player.x - this.Xoffset * 101);
    if(this.Xoffset * 101 - player.x <  10 && this.Xoffset * 101 - player.x >  -10 && this.Yoffset * 84 - player.y <  40 && this.Yoffset * 84 - player.y >  -40)  {
        console.log("in if")
        player.points += 200;
        player.setScore();
    }
};

function difficultySetter(_interval, _topSpeed, _minSpeed, _Xoffset = 5, _Yoffset = 5) {
    interval = _interval;
    topSpeed = _topSpeed;
    minSpeed = _minSpeed;
    item.Xoffset = _Xoffset;
    item.Yoffset = _Yoffset;
}

function startInterval(_interval, _topSpeed, _minSpeed) {   
    intervalID  = window.setInterval(function() {
        step = Math.random() * (topSpeed-minSpeed) + minSpeed;
        Y = Verticals[(getIndex())];
        allEnemies.push(new Enemy(-100, Y, step));
        clearInterval(intervalID);
    }, _interval)
}

var getIndex = function() {
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

var Verticals = [215, 130, 45];
item = new Item();
allEnemies = [/*new Enemy(300, 215, 15), new Enemy(100, 130, 25), new Enemy(200, 45, 80)*/];
player = new Player(200, 300);


//Try object instead of seperate vars
var interval = 1500;
var topSpeed = 180;
var minSpeed = 140;
startInterval(interval, 180, 130);