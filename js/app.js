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
    this.start = false;
};
Player.prototype.update = function(x, y, dt, points) {
   
    if(this.y < 0)
    {
        this.y = 300;
        this.addScore();
    }
    
};

Player.prototype.gameStarter = function() {

    //console.log("In reset")
    ctx.fillStyle = "black"
    ctx.font = "30px arial";
    ctx.fillRect(50, 130, 400, 250);
    ctx.clearRect(60, 140, 380, 230);
    ctx.fillText("Instructions:", 175, 190);
    ctx.font = "15px arial"
    ctx.fillText("1. Use arrow keys to play.",100, 220);
    ctx.fillText("2. Reaching water increase your points by 100",100, 240);
    ctx.fillText("3. Gems increase your points by 200",100, 260);
    ctx.fillText("4. Hearts will increase your life by 1",100, 280);
    ctx.fillText("5. Avoid Bugs",100, 300);
    ctx.fillText("Press Enter to continue", 175, 340)
    document.addEventListener('keyup', function(event) {
        if(event.key === 'Enter') {
            player.start = true;         
        }
    }, false);
    
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.start === false) {
        this.gameStarter();
    }
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
            case 300:
                difficultySetter(1400, 190, 150); 
                gemPlacer(1,1)
                break;
            case 500:
                difficultySetter(1200, 200, 170);   
                break;
            case 700:
                difficultySetter(1000, 220, 190);  
                break;
            case 900:
                lifePlacer(4,1); 
                break;
            case 1000:
                difficultySetter(800, 250, 200);
                gemPlacer(1, 3);
                lifePlacer(5,5);
                break;
            case 1100:
                lifePlacer(5,5);
                break;
            case 1300:
                difficultySetter(600, 290, 240);
                break;
            case 1700:
                difficultySetter(500, 350, 270);
                lifePlacer(0,1);                
                break;
            case 1800:
                gemPlacer(3,1);
                lifePlacer(5,5);
                break;
            case 2500:
                lifePlacer(5,5);
                difficultySetter(350, 500, 420); 
                break;
            case 3000:
                difficultySetter(300, 650, 550);
                gemPlacer(2,1);
                break;
            case 3200:
                difficultySetter(250, 800, 700);
                lifePlacer(2,3);
                break;
            default:
                lifePlacer(5,5);
                gemPlacer(5,5);

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
    if(this.gameOver === false && this.start === true)
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
    this.gemX;
    this.gemY;
    this.lifeX;
    this.lifeY;
};

Item.prototype.render = function(){
    ctx.drawImage(Resources.get(this.gem), 101*this.gemX ,  84*this.gemY ,this.height, this.width);
    ctx.drawImage(Resources.get(this.life), 102*this.lifeX, 88*this.lifeY, this.height, this.width);
};

Item.prototype.update = function() {
    if(this.gemX * 101 - player.x <  10 && this.gemX * 101 - player.x >  -10 && this.gemY * 84 - player.y <  40 && this.gemY * 84 - player.y >  -40)  {
        console.log("in gem if")
        player.points += 200;
        item.gemX = 5;
        item.gemY = 5;
        player.setScore();
    }
    if(this.lifeX * 101 - player.x <  10 && this.lifeX * 101 - player.x >  -10 && this.lifeY * 84 - player.y <  40 && this.lifeY * 84 - player.y >  -40)  {
        console.log("in heart if");
        player.lives += 1;
        this.lifeX = 5;
        this.lifeY = 5;
        player.lifeChecker();
    }
};

function difficultySetter(_interval, _topSpeed, _minSpeed) {
    interval = _interval;
    topSpeed = _topSpeed;
    minSpeed = _minSpeed;
}

function lifePlacer(_lifeX, _lifeY) {
    item.lifeX = _lifeX;
    item.lifeY = _lifeY;
}
function gemPlacer(_gemX, _gemY) {
    item.gemX = _gemX;
    item.gemY = _gemY;
}

function startInterval(_interval, _topSpeed, _minSpeed) {   
    intervalID  = window.setInterval(function() {
        step = Math.random() * (topSpeed-minSpeed) + minSpeed;
        Y = Verticals[(getIndex())];
        allEnemies.push(new Enemy(-100, Y, step));
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
allEnemies = [new Enemy(300, 215, 15), new Enemy(100, 130, 25), new Enemy(200, 45, 80)];
player = new Player(200, 300);


//Try object instead of seperate vars
var interval = 1500;
var topSpeed = 180;
var minSpeed = 140;
startInterval(interval, 180, 130);



    