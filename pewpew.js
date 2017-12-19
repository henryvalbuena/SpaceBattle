var getDiv      = document.querySelector(".shape");
var newDiv      = [];
var newContent  = [],
    scoreKeep   = 1,
    check       = true;
var score = add => document.getElementById("score").innerHTML = "Score "+add;
function setToPixel(arg1, arg2, operation){
  if(operation){
    var result = arg1 + arg2 + "px";
    return result;
  } else {
    var result = arg1 - arg2 + "px";
    return result;
  }
}
function collisionCheck(a, b){
  var x = b.getBoundingClientRect().left;
	var y = b.getBoundingClientRect().top;
	var w = b.getBoundingClientRect().width;
	var h = b.getBoundingClientRect().height
	var xa = a.getBoundingClientRect().left;
	var ya = a.getBoundingClientRect().top;
	var x1 = x + w;
	var y1 = y + h;
	if(xa >= x && xa<= x1 && ya >= y && ya <= y1){
		return true;
    } else {
		return false;
    }
}
function showElement(){
  newDiv[0].style.left = setToPixel(event.pageX, 4, false);
  newDiv[0].style.top = setToPixel(event.pageY, 70, false);
  if(check){
    newDiv[1].style.left = setToPixel(event.pageX, 4, false);
    newDiv[1].style.top = setToPixel(event.pageY, 70, false);
  }
}
function particlesStart(){
  var timer = setInterval(() => {
    var a = Math.floor(Math.random()*300+20);
  newDiv[3].style.left = setToPixel(Math.floor(Math.random()*400 + 20), 0, false);
  newDiv[3].style.top = setToPixel(Math.floor(Math.random()*50 + 20), 0, false);
  newDiv[3].style.background = "blue";
  }, 1500);
}
function pewpew(){
  newDiv[1].style.left = newDiv[0].style.left;
  newDiv[1].style.top = newDiv[0].style.top;
  newDiv[1].style.fontSize = "1.5em";
  var xCurrent = newDiv[0].getBoundingClientRect().y;
  var bullet = 0;
  var pewTime = setInterval(()=>{
      if(bullet >= 670){
      newDiv[1].style.fontSize = "";
      check = true;
      clearTimeout(pewTime);
    } else {
      check = false;
      bullet = 8 + bullet;
      newDiv[1].style.top = setToPixel(xCurrent, bullet, false);
      if(collisionCheck(newDiv[1], newDiv[3])){
        clearTimeout(pewTime);
        check = true;
        newDiv[3].style.background = "red";
        newDiv[1].style.left = newDiv[0].style.left;
        newDiv[1].style.top = newDiv[0].style.top;
        newDiv[1].style.fontSize = "";
        score(scoreKeep++);
      }
    }
  }, 10);
}
function newElement(){
  for(var i = 0; i<= 1; i++){
    newDiv[i] = document.createElement('span');
    newContent[i] = document.createTextNode("*");
    newDiv[i].appendChild(newContent[i]);
    newDiv[i].style.position = "absolute";
    newDiv[i].style.left = "0px";
    newDiv[i].style.top = "0px";
    document.body.insertBefore(newDiv[i], getDiv);
  }
  newDiv[3] = document.createElement('div');
  newDiv[3].style.position = "absolute";
  newDiv[3].style.width = "50px";
  newDiv[3].style.height = "50px";
  newDiv[3].style.background = "red";
  newDiv[3].style.left = "0px";
  newDiv[3].style.top = "80px";
  document.body.insertBefore(newDiv[3], getDiv);
  particlesStart();
}

document.body.onload = newElement;

document.addEventListener('mousemove', (event) =>{
  getDiv.style.left = setToPixel(event.pageX, 50, false);
  getDiv.style.top = setToPixel(event.pageY, 60, false);
  showElement();
});

document.addEventListener('keypress', (event) =>{
  if(event.keyCode == 32){
    pewpew();
  }
});
