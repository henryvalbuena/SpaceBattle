
const createStars = () => {
  var span = [];
  var context = [];
  var time = 0;
  var counter = 0;
  for(var i=4; i<=24; i++){
    span[i] = document.createElement("span");
    context[i] = document.createTextNode(".");
    span[i].appendChild(context[i]);
    span[i].style.position = "absolute";
    span[i].style.left = setToPixel(Math.floor(Math.random()*1100 + 20), 0, false);
    document.body.appendChild(span[i]);
  }
  var timer = setInterval(() => {
      span.forEach((index) => {
      index.style.top = setToPixel(Math.floor(Math.random()*700 + 20), 0, false);
      });
  }, 100);
}

function setToPixel(arg1, arg2, operation){
  if(operation){
    var result = arg1 + arg2 + "px";
    return result;
  } else {
    var result = arg1 - arg2 + "px";
    return result;
  }
}

document.body.onload = createStars;
