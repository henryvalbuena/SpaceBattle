var scoreBoard, airCraft, aliens, laser, crashed,
    bulletTime, background0, background1, reset, innerW,
    innerH, scoreCount;
function startGame() {
  scoreCount = 0;
  aliens = [];
  bulletTime = crashed = false;
  innerH = window.innerHeight;
  innerW = window.innerWidth;
  background0 = new Component(innerW, innerH, "background.jpg", 0,0, "image");
  background1 = new Component(innerW, innerH, "background.jpg", 0,-innerH, "image");
  airCraft = new Component(60, 60, "AirCraft.png", innerW/2, innerH/2, "image");
  for(var i = 0; i <= 5; i++){
    aliens[i] = new Component(40, 40, "AlienShip.png", 0, 0, "image");
  }
  laser = new Component(5, 0, "red", innerW/2, innerH/2, "laser");
  reset = new Component(96, 44, "Button.png", 30, 30, "image");
  scoreBoard = new Component(80, 30, "gray", (innerW/2 - innerW/3), (innerH - 100), "text");
  myGameArea.start();
  myGameArea.refresh();
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = innerW - 20;
    this.canvas.height = innerH - 20;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    window.addEventListener('keypress', (event) => {
      if(event.keyCode == 32) {
        bulletTime = true;
      }
    });
    document.addEventListener('click', (event) => {
      var buttonBott = reset.x + reset.width;
      var buttonSide = reset.y + reset.height;
      if(event.clientX >= reset.x && event.clientX <= buttonBott
        && event.clientY <= buttonSide && event.clientY >= reset.y){
        myGameArea.refresh();
      }
    });
    document.addEventListener('mousemove', (event) =>{
      airCraft.x = event.pageX;
      airCraft.y = event.pageY;
    });
  },
  clear: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function(){
    reset.create();
    this.canvas.style.cursor = "";
    clearInterval(this.interval);
  },
  refresh: function() {
    this.canvas.style.cursor = "none";
    scoreCount = 0;
    bulletTime = false;
    laser.x = airCraft.x = innerW/2;
    laser.y = airCraft.y = innerH/2;
    this.interval = setInterval(updateGameArea, 20);
    aliens.forEach((x) => x.alienHit());
  }
}
function Component(width, height, c, x, y, type){
  this.type = type;
  if(type == "image"){
    this.image = new Image();
    this.image.src = c;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.angle = 0;
  this.create = function() {
    ctx = myGameArea.context;
    if(type == "image"){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else if(type == "others"){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = c;
      ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
      ctx.restore();
    } else if(type == "laser"){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width, this.height, 2*Math.PI);
      // ctx.arc(this.x, this.y, this.width, this.height, 2*Math.PI);
      ctx.fillStyle = c;
      ctx.fill();
    } else if(type == "text"){
      ctx.font = "15px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Score "+scoreCount,this.x, this.y);
    }
  }
  this.collision = function(obj) {
      var objBott = obj.y + obj.height;
      var objLeft = obj.x;
      var objRight = obj.x + obj.width;
      var objTop = obj.y;
      var thisBott = this.y + this.height;
      var thisLeft = this.x;
      var thisRight = this.x + this.width;
      var thisTop = this.y;
      if(bulletTime){
        thisBott += 15;
        thisRight+= 2;
      }
      if((((objTop <= thisBott && objTop >= thisTop)
      || (objBott >= thisTop && objBott <= thisBott))
      && (objLeft <= thisRight && objRight >= thisLeft))){
  		return true;
      } else {
  		return false;
      }
  }
  this.fire = function() {
    if(bulletTime && (this.y >= 0)){
      this.y-=22;
    } else {
      this.x = airCraft.x + airCraft.width/2;
      this.y = airCraft.y - 5;
      bulletTime = false;
    }
  }
  this.alienHit = function() {
    this.x = Math.floor(Math.random()*(window.innerWidth - 30)+1);
    this.y = -20;
  }
  this.alienMotion = function(){
    this.angle  += 1 * Math.PI / 15;
    this.y++;
    if(this.y >= innerH){
      scoreCount--;
      this.y = -20;
    }
  }
  this.looping = function(){
    this.y+=2;
    background0.y+=2;
    if(this.y >= 0){
      this.y = -innerH;
      background0.y = 0;
    }
  }
}


function updateGameArea() {
  if(aliens.some((x) =>{
  return airCraft.collision(x)})){
      myGameArea.stop();
  } else {
    myGameArea.clear();
    background0.create();
    background1.create();
    background1.looping();
    airCraft.create();
    // airCraft.angle = 14.87;
    laser.create();
    laser.fire();
    scoreBoard.create();
    aliens.forEach((x) =>{
      x.create();
      x.alienMotion();
      if(laser.collision(x) && bulletTime) {
        bulletTime = false;
        scoreCount++;
        x.alienHit();
      }
    });
  }
}
startGame();
