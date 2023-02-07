try {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
        
    recognition.onstart = function() {
        console.log("We are listening. Try speaking into the microphone.");
    };

    recognition.onspeechend = function() {
        recognition.stop();
    }
                
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        oTextArea.setValue(transcript)
    };
} catch (err) {
    console.log("Voice to Text not supported on this browser.")
    oButtonVoiceToText.setType("Reject")
    oButtonVoiceToText.setEnabled(false)
}