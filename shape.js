
var getDiv      = document.querySelector(".shape"),
    xFinal      = 0,
    yFinal      = 0,
    yStart      = 0,
    xStart      = 0,
    wFinal      = 0,
    hFinal      = 0,
    hStart      = 0,
    wStart      = 0,
    yEnd        = 0,
    xEnd        = 0,
    hEnd        = 0,
    wEnd        = 0,
    xDistance   = 0,
    yDistance   = 0,
    hTransition = 0,
    wTransition = 0,
    run1         = true,
    run2         = true,
    run3         = true,
    run4         = true;
    // checkB      = false;

// getDiv.addEventListener('click', animationCalc);
document.addEventListener('keypress', (event) => {
  getDiv.innterHTML = event.key;
  // console.log("*********")
  // console.log(hTransition)
  // console.log(wTransition)
  // console.log(xDistance)
  // console.log(xDistance)
  // console.log("*********")
  // console.log(run)
  if(run1 && run2 && run3 && run4){
    // console.log("MEEE!!!!")
    // console.log(run)
    animationCalc();
    run1 = run2 = run3 = run4 = false;
  }
});

// SHAPE ANIMATION

function animationCalc(){
  var objTwoD = getDiv.getBoundingClientRect()
  yStart = objTwoD.top;
  xStart = objTwoD.left;
  hStart = objTwoD.height;
  wStart = objTwoD.width;
  getDiv.style.background = ranColor();
  // getDiv.style.borderColor = ranColor();
  // document.querySelector("body").style.background = ranColor();
  getDiv.style.borderRadius = Math.floor(Math.random()*500)+"px";
  yEnd = Math.floor(Math.random()*200+20);
  xEnd = Math.floor(Math.random()*200+20);
  hEnd = Math.floor(Math.random()*200+20);
  wEnd = Math.floor(Math.random()*200+20);
  motionCalc();
  shapeCalc();
  // console.log(run+" Hi")
  // run = true;
}
function ranColor(){
  var r = Math.floor(Math.random()*256)
  var g = Math.floor(Math.random()*256)
  var b = Math.floor(Math.random()*256)
  return "rgb("+r+", "+g+", "+b+")";
}
function shapeCalc(){
  var timeh      = 0,
      timew      = 0;

  if(hStart <= hEnd){
    hTransition = hEnd - hStart;
  } else {
    hTransition = hStart - hEnd;
  }
  if(wStart <= wEnd){
    wTransition = wEnd - wStart;
  } else {
    wTransition = wStart - wEnd;
  }

  var speedh = hTransition / 10000,
      speedw = wTransition / 10000;

  var timerh = setInterval(intervalh, speedh);
  var timerw = setInterval(intervalw, speedw);

  function intervalh(){
    if(timeh == hTransition){
      clearInterval(timerh);
      console.log("Clear 1")
      run1 = true;
    } else {
      if(hStart >= hEnd){
        hFinal = hStart - timeh;
      } else {
        hFinal = hStart + timeh;
      }
      timeh++;
      getDiv.style.height = hFinal+"px";
      // console.log("new Height: "+hFinal)
    }
  }
  function intervalw(){
    if(timew == wTransition){
      clearInterval(timerw);
      console.log("Clear 2")
      run2 = true;
    } else {
      if(wStart >= wEnd){
        wFinal = wStart - timew;
      } else {
        wFinal = wStart + timew;
      }
      timew++;
      getDiv.style.width = wFinal+"px";
      // console.log("new Width: "+wFinal)
    }
  }
}

function motionCalc(){
  var timex    = 0,
      timey    = 0;

  if(xStart <= xEnd){
    xDistance = xEnd - xStart;

    // console.log("xStart is <: "+xDistance)
  } else {
    xDistance = xStart - xEnd;
    // console.log("xStart is >: "+xDistance)
  }

  if(yStart <= yEnd){
    yDistance = yEnd - yStart;
    // console.log("yStart is <: "+yDistance)
  } else {
    yDistance = yStart - yEnd;
    // console.log("yStart is >: "+yDistance)
  }
  var speedx = xDistance / 10000,
      speedy = yDistance / 10000;

  var timerx  = setInterval(intervalx, speedx);
  var timery  = setInterval(intervaly, speedy);

  function intervalx(){
    if(timex == xDistance){
      clearInterval(timerx);
      console.log("Clear 3")
      run3 = true;
      // console.log("Speed X: "+speedx+" Speed Y: "+speedy)
      // console.log("Distance X: "+xDistance+" Distance Y: "+yDistance)
    } else if (timex <= xDistance){
      if(xStart >= xEnd){
        xFinal = xStart - timex;
      } else {
        xFinal = xStart + timex;
      }
      timex++;
      getDiv.style.left = xFinal+"px";
      // console.log("TravelX: "+timex)
    }
  }
  function intervaly(){
    if(timey == yDistance){
      clearInterval(timery);
      console.log("Clear 4")
      run4 = true;
      // console.log("Speed X: "+speedx+" Speed Y: "+speedy)
      // console.log("Distance X: "+xDistance+" Distance Y: "+yDistance)
    } else {
      if(yStart >= yEnd){
        yFinal = yStart - timey;
      } else {
        yFinal = yStart + timey;
      }
      timey++;
      getDiv.style.top = yFinal+"px";
      // console.log("TravelY: "+timey)
    }
  }
}
