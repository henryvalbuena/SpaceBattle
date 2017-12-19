var airCraft, aliens, laser, bulletTime, reset;
function startGame() {
  bulletTime = false;
  myGameArea.start();
  myGameArea.refresh();
  airCraft = new Component(30, 30, "white", 100, 150);
  aliens = new Component(30, 30, "green", 30, 100);
  laser = new Component(5, 0, "red", 100, 150);
  reset = new Component(30, 30, "blue", 30, 30);
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = window.innerWidth - 20;
    this.canvas.height = window.innerHeight - 20;
    this.canvas.style.cursor = "none";
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    window.addEventListener('keypress', (event) => {
      if(event.keyCode == 32) {
        bulletTime = true;
      }
    });
    window.addEventListener('click', (event) => {
      var buttonBott = reset.x + reset.width;
      var buttonSide = reset.y + reset.height;
      if(event.clientX >= reset.x && event.clientX <= buttonBott
        && event.clientY <= buttonSide && event.clientY >= reset.y){
        console.log("Clicked");
        myGameArea.refresh();
      }
    });
    window.addEventListener('mousemove', (event) =>{
      airCraft.x = event.pageX;
      airCraft.y = event.pageY;
    });
  },
  clear: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function(){
    this.canvas.style.cursor = "";
    clearInterval(this.interval);
  },
  refresh: function() {
    this.interval = setInterval(updateGameArea, 20);
  }
}
function Component(width, height, c, x, y){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.angle = 0;
  this.ships = function() {
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = c;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  }
  this.bullet = function() {
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, this.height, 2*Math.PI);
    ctx.fillStyle = c;
    ctx.fill();
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
      this.y-=18;
    } else {
      this.x = airCraft.x;
      this.y = airCraft.y;
      bulletTime = false;
    }
  }
  this.alienMotion = function() {
    this.x = Math.floor(Math.random()*(window.innerWidth - 30)+1);
  }
}
function updateGameArea() {

  if(airCraft.collision(aliens)){
    myGameArea.stop();
  } else {
    myGameArea.clear();
    airCraft.ships();
    airCraft.angle = 14.7654;
    aliens.ships();
    laser.bullet();
    laser.fire();
    reset.ships();
    if(laser.collision(aliens)) {
      bulletTime = false;
      aliens.alienMotion();
    }
  }
}
startGame();
