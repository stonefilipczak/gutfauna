
let line1 = document.getElementById('line1');
let line2 = document.getElementById('line2');
let rightSide = document.getElementById('right');
let leftSide = document.getElementById('left');
let mobilebar = document.getElementById('mobilebar');
let musicOpen = false;
const delay = new Tone.PingPongDelay().toMaster();
const theramin = new Tone.MonoSynth().connect(delay);
const centerBox = document.getElementById('centerBox');

centerBox.addEventListener("touchmove", populate);

const topWords = ['ACID', "OFFICE", "DISCO", "420", "FART", "BODY",
                "MOOSE", "OTTER", "TURTLE", "PEE", "GOLF", "BEER"];

const bottomWords = ["INC.", "ISLAND", "SUPPLY", "BAG", "HOLE", "MEAT",
                    "LODGE", "BROS.", "MAN", "WAR", "PALS", ".COM"];

const grams = ["&#9776;", "&#9777;", "&#9778;", "&#9779;", "&#9780;", "&#9781;",
              "&#9782;", "&#9783;", 2, 3, 4, 5, 6, 7, 8];

const mobilegrams = ["&#9776;", "&#9777;", "&#9778;", "&#9779;", "&#9780;", "&#9781;",
            "&#9782;", "&#9783;"];



function reset() {
  line1.innerHTML = "GUT";
  line2.innerHTML = "FAUNA";
  rightSide.innerHTML = "GUT";
  leftSide.innerHTML = "CUM";
  document.getElementById("buttonbox").classList.remove('hide');
  document.getElementById("centerBox").classList.add('flash');
  stopTheramin();
};

function populate(event) {
  if (musicOpen == false){
  line1.innerHTML = topWords[Math.floor(Math.random() * topWords.length)];
  line2.innerHTML = bottomWords[Math.floor(Math.random() * bottomWords.length)];
  rightSide.innerHTML = `${grams[Math.floor(Math.random() * grams.length)]}
                          ${grams[Math.floor(Math.random() * grams.length)]}
                          ${grams[Math.floor(Math.random() * grams.length)]}`;
  leftSide.innerHTML = `${grams[Math.floor(Math.random() * grams.length)]}
                          ${grams[Math.floor(Math.random() * grams.length)]}
                          ${grams[Math.floor(Math.random() * grams.length)]}`;
  mobilebar.innerHTML = `${mobilegrams[Math.floor(Math.random() * mobilegrams.length)]}${mobilegrams[Math.floor(Math.random() * mobilegrams.length)]}${mobilegrams[Math.floor(Math.random() * mobilegrams.length)]}`;
  setTimeout(speak, 1000);
  playTheramin();
  flash();
  pound();
}
};

//flashing

function flash() {
  document.getElementById("centerBox").classList.toggle('flash');
}
//Speech Synthesis

let synth = window.speechSynthesis;

function speak(){
  if (synth.speaking) {
      console.log('speaking');
      return;
  }
  let speakThis = `${line1.innerHTML} ${line2.innerHTML}`;
  let trash = new SpeechSynthesisUtterance(speakThis);
  trash.volume = 0.5;
  const voices = synth.getVoices();
  trash.voice = voices[Math.floor(Math.random() * voices.length)];
  synth.speak(trash);
};


// theramin



var WIDTH = centerBox.clientHeight;
var HEIGHT = centerBox.clientHeight;



function playTheramin() {
  var x = event.clientX;
  var y = event.clientY;
  theramin.volume.value = -35;
  delay.wet = 0.2;
  theramin.triggerAttack(y, "8n");
};

function stopTheramin() {
    if (musicOpen === false){
      var y = event.clientY;
      theramin.triggerAttackRelease(y-200, "16n");
    }
  };

//buzzing synth

function pound(){

const synth = new Tone.MembraneSynth().toMaster();
// play a note with the synth we setup
var x = event.clientX;
var y = event.clientY;
synth.volume.value = -20;
synth.triggerAttackRelease(y/2, "16n");
};



//music player control

var musicbutton = document.getElementById('musicbutton');
var musicplayer = document.getElementById('musicplayer');

musicbutton.addEventListener('click', function(){
  if (musicOpen == false){
    openMusic();
  } else if (musicOpen == true){
    closeMusic();
  }
});

function openMusic(){
  musicplayer.classList.toggle('hide');
  document.getElementById('line1').classList.toggle('hide');
  document.getElementById('line2').classList.toggle('hide');
  musicOpen = true;
  musicbutton.innerHTML = "&#9786;";
  document.getElementById('bottomleft').innerHTML = "&#9755;";
  document.getElementById('bottomright').innerHTML = "&#9754;";
};

function closeMusic(){
  musicplayer.classList.toggle('hide');
  document.getElementById('line1').classList.toggle('hide');
  document.getElementById('line2').classList.toggle('hide');
  musicOpen = false;
  musicbutton.innerHTML = "&#9836;";
  document.getElementById('bottomleft').innerHTML = "&#9758;";
  document.getElementById('bottomright').innerHTML = "&#9756;";
};
