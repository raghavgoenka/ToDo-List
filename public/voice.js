var textData;
document.getElementById("mic").addEventListener("click", function() {

    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 10;
    recognition.start();
    
    recognition.onresult = function(event) {
        textData=event.results[0][0].transcript;
        console.log('You said: ', textData);
        var x=document.getElementById("auto");
        x.value=textData;
        textData="";
   
    };
    

  });
  