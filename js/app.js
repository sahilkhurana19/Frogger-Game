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
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
Player.prototype.update = function(x, y, dt) {
    if(this.y < 0) 
        this.y = 300;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

var Verticals = [215, 130, 50];
allEnemies = [new Enemy(300, 215, 15), new Enemy(100, 130, 25), new Enemy(200, 45, 80)];
player = new Player(200, 300);

var interval = window.setInterval(function() {
    step = Math.random() * (120-40) + 40;
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
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
