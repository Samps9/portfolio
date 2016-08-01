$(document).ready(function(){

  var myAudioContext = new (window.AudioContext ||
                            window.webkitAudioContext ||
                            window.mozAudioContext ||
                            window.oAudioContext ||
                            window.msAudioContext );

  var lowOscillator = myAudioContext.createOscillator();
  var highOscillator = myAudioContext.createOscillator();
  var bassOscillator = myAudioContext.createOscillator();

  var panLeft = myAudioContext.createPanner();
      panLeft.setPosition(-2,2,1)
  var panRight = myAudioContext.createPanner();
      panRight.setPosition(4,0,4)

  var compressor = myAudioContext.createDynamicsCompressor();
      compressor.threshold.value = -100;
      compressor.knee.value = 20;
      compressor.ratio.value = 1;
      compressor.reduction.value = -40;
      compressor.attack.value = 0.5;
      compressor.release.value = 5.5;

  var delay = myAudioContext.createDelay(77.777);

  var gain = myAudioContext.createGain();
      gain.gain.value = 0.074777;

  var bassGain = myAudioContext.createGain()
      bassGain.gain.value = 0.047;
      
  var bassNotes = [110.00, 130.81, 146.83, 164.81, 185.00, 196.00]
  var lowNotes = [220, 246.94, 261.63, 293.66, 329.63, 369.99, 392.00];
  var highNotes = [440, 493.88, 523.25, 587.33, 659.25, 739.99, 783.99];

  bassOscillator.type = "square"
  bassOscillator.connect(bassGain);
  bassGain.connect(compressor);

  lowOscillator.type = "triangle"
  lowOscillator.connect(panLeft);
  panLeft.connect(compressor);

  highOscillator.type = "triangle"
  highOscillator.connect(panRight);
  panRight.connect(compressor);

  compressor.connect(delay);
  delay.connect(gain)

  gain.connect(myAudioContext.destination);
  
  bassOscillator.frequency.value = bassNotes[0]
  lowOscillator.frequency.value = lowNotes[2]
  highOscillator.frequency.value = highNotes[Math.floor( Math.random() * highNotes.length )]

  setInterval(function(){
    bassOscillator.frequency.value = bassNotes[Math.floor( Math.random() * bassNotes.length )]
  }, 5000)

  setInterval(function(){
    lowOscillator.frequency.value = lowNotes[Math.floor( Math.random() * lowNotes.length )]
  }, 2550)

  setInterval(function(){
    highOscillator.frequency.value = highNotes[Math.floor( Math.random() * highNotes.length )]
  }, randomInterval())

  function randomInterval(){
    var randomNumber = (Math.random() * 2550);
    if(randomNumber <= 450.0){
      randomNumber = 1225;
    }
    return randomNumber
  }


  setTimeout(function(){
    $("#dropdown-nav").attr("class", "visible") 
  }, 747) 

  var playedYet = false;

  $("#mute").click(function(event){
    if( $("#mute").attr("class") == "clicked" && playedYet == false ){
      $("#mute").attr("class", "");
      $("#mute i").attr("class", "fa fa-volume-up");
      gain.gain.value = 0.04777;
      bassGain.gain.value = 0.047;
      bassOscillator.start( myAudioContext.currentTime + 1 );
      lowOscillator.start( myAudioContext.currentTime + 2 );
      highOscillator.start( myAudioContext.currentTime + 4 );
      playedYet = true;
    }else if( $("#mute").attr("class") == "clicked" ) {
      $("#mute").attr("class", "");
      $("#mute i").attr("class", "fa fa-volume-up");
      gain.gain.value = 0.04777;
      bassGain.gain.value = 0.047;
    }else{
      $("#mute").attr("class", "clicked");
      $("#mute i").attr("class", "fa fa-volume-off");
      gain.gain.value = 0.0;
      bassGain.gain.value = 0.0;
    }

  })

})