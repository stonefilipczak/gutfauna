let osc, delay, absolute, alpha, beta, gamma;
let phone = false;
let playing = false;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
  phone = true;
}


window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  absolute = event.absolute;
  alpha    = event.alpha;
  beta     = event.beta;
  gamma    = event.gamma;
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER);

  osc = new p5.Oscillator();
  osc.setType('sine');


  // delay = new p5.Delay();
  // // delay.process() accepts 4 parameters:
  // // source, delayTime, feedback, filter frequency
  // delay.process(osc, .2, .7, 2300);
}

function draw() {
  textSize(50);
  stroke(random(255), random(255), random(255));
  strokeWeight(10);
  fill(255);
  if (playing == false){
    text("CLICK TO PLAY", width/2, height/2);
  }
  if (phone == true && playing == false){
    background(0);
    text("TAP TO PLAY", width/2, height/2);
  }
  if (phone == false && playing == false){
      ellipse(mouseX, mouseY, 100);
  } else if (playing == true){
    if (phone == false){
      background(0);
      ellipse(width/2, height/2, map(mouseX, 0, width, 0, height));
    } else if (phone == true){
      background(0);
      ellipse(width/2, height/2, map(gamma, -90, 90, 0, 300))
    }
  }

  if (phone == false){
    osc.freq(mouseX);
    osc.amp(map(-mouseY, -windowHeight, 0, 0, 1));
  } else if (phone == true){
    osc.freq(map(gamma, -90, 90, 100, 2000));
    osc.amp(map(beta, -180, 180, 0, 1));
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}


function touchEnded(){

  // background(0);

  if (playing == false){
    osc.start();
    playing = true;
  } else if (playing == true){
    osc.stop();
    playing = false;
  }
}
