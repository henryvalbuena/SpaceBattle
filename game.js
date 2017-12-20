var airCraft, aliens, laser, crashed, bulletTime, background0, background1, reset, innerW, innerH;
function startGame() {
  aliens = [];
  bulletTime = crashed = false;
  innerH = window.innerHeight;
  innerW = window.innerWidth;
  background0 = new Component(innerW, innerH, "background.jpg", 0,0, "image");
  background1 = new Component(innerW, innerH, "background.jpg", 0,-innerH, "image");
  airCraft = new Component(30, 30, "white", innerW/2, innerH/2, "others");
  // aliens = new Component(30, 30, "orange", 30, 100, "others");
  for(var i = 0; i <= 3; i++){
    aliens[i] = new Component(30, 30, "orange", 0, 0, "others");
  }
  laser = new Component(5, 0, "red", innerW/2, innerH/2, "laser");
  reset = new Component(30, 30, "blue", 30, 30, "others");
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
    this.interval = setInterval(updateGameArea, 20);
    aliens.forEach((x) => x.alienMotion());
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
      ctx.fillStyle = c;
      ctx.fill();
    }
  }
  this.collision = function(obj) {
      var objxBott = obj.x + obj.width;
      var objyHeight = obj.y + obj.height;
      if((this.x + 15) >= obj.x && (this.x + 15) <= objxBott
        && this.y <= objyHeight && this.y >= obj.y){
        return true;
      } else {
        return false;
      }
  }
  this.fire = function() {
    if(bulletTime && (this.y >= 0)){
      this.y-=22;
    } else {
      this.x = airCraft.x;
      this.y = airCraft.y;
      bulletTime = false;
    }
  }
  this.alienMotion = function() {
    this.x = Math.floor(Math.random()*(window.innerWidth - 30)+1);
    this.y = -20;
  }
}
function updateGameArea() {
  if(aliens.some((x) =>{ return airCraft.collision(x) })){
      myGameArea.stop();
  } else {
    myGameArea.clear();
    background0.create();
    background1.create();
    background1.y+=2;
    background0.y+=2;
    if(background1.y >= 0){
      background1.y = -innerH;
      background0.y = 0;
    }
    airCraft.create();
    airCraft.angle = 14.87;
    laser.create();
    laser.fire();
    aliens.forEach((x) =>{
      x.create();
      x.angle  += 1 * Math.PI / 15;
      x.y++;
      if(laser.collision(x)) {
        bulletTime = false;
        x.alienMotion();
      }
    });
  }
}
startGame();
