export const speak = text => {
    var synth = window.speechSynthesis;
  
    var defaultPitchValue = 1;
    var defaultRateValue = 1;
  
    var voices = [];
  
    function populateVoiceList() {
      voices = synth.getVoices().sort(function(a, b) {
        const aname = a.name.toUpperCase(),
          bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname === bname) return 0;
        else return +1;
      });
    }
    populateVoiceList();
  
    var utterThis = new SpeechSynthesisUtterance(text);
  
    utterThis.onboundary = function(event) {
      // console.log("SpeechSynthesisUtterance.onboundary");
    };
  
    utterThis.onmark = function(event) {
      // console.log("SpeechSynthesisUtterance.onmark");
    };
  
    utterThis.onresume = function(event) {
      // console.log("SpeechSynthesisUtterance.onresume");
    };
  
    utterThis.onstart = function(event) {
      // console.log("SpeechSynthesisUtterance.onstart");
    };
  
    utterThis.onend = function(event) {
      // console.log("SpeechSynthesisUtterance.onend");
    };
    utterThis.onerror = function(event) {
      // console.error("SpeechSynthesisUtterance.onerror");
    };

    utterThis.voice = voices[10];
    utterThis.pitch = defaultPitchValue;
    utterThis.rate = defaultRateValue;
    synth.speak(utterThis);
  };
  