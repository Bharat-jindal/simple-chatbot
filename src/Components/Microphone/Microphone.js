import React, { useState, useEffect } from 'react';
import './Microphone.css';

import ListningGif from '../../assets/listning.gif';
import ListenPic from '../../assets/listenPic.PNG';

const Microphone = props => {
    const [speaking , setSpeaking] = useState(false);
    const [usrVal , setUsrVal] = useState('hello');
    const [botVal , setBotVal] = useState('hi');
    useEffect(() => {
        botSpeechSynyhesis()
    })
    const botSpeechSynyhesis = () => {
        console.log('speaking bot')
        const synth = window.speechSynthesis;
        if(synth.speaking){
            console.log('Already speaking');
            return;
        }
        if(props.botResponse !== ''){
            setBotVal(props.botResponse)
            const speakText = new SpeechSynthesisUtterance(props.botResponse);
            speakText.onend = e => {
                console.log('done speaking...');
                props.setBotResponse('')
            }
    
        speakText.onerror = e => {
            console.log('Something went wrong ..')
            props.setBotResponse('')
        }
        synth.speak(speakText)
        }
    }
    const recordSpeech = () => {
        //props.sendMessage('hello')
        console.log('recording')
        setSpeaking(true)
        var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
        var recognition = new window.webkitSpeechRecognition();
        var speechRecognitionList = new window.webkitSpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.start();
        console.log('Ready to receive a color command.');
        

        recognition.onresult = function(event) {
            console.log('hi')
            console.log(event.results[0][0].transcript)
            setSpeaking(false)
            setUsrVal(event.results[0][0].transcript)
            props.sendMessage(event.results[0][0].transcript);
        }
    }

    return <div className="Microphone">
        <div className="Microphone-image-container" onClick={recordSpeech}>
            {speaking ? <img src={ListningGif} className="Microphone-image-container-gif"/>:
            <img src={ListenPic} className="Microphone-image-container-static"/>}
        </div>
        <div className="Microphone-text">
        {usrVal!==''?<div>USER : {usrVal}</div>:null}
        {botVal!==''?<div>BOT : {botVal}</div>:null}
        </div>
    </div>
}

export default Microphone