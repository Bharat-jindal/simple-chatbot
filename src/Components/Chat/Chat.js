import React, { useState } from 'react';
import './Chat.css';

const Chat = props => {
    const [val , setVal] = useState('');
    const changeInputValueHandler = e => {
        setVal(e.target.value)
    }
    const sendMeassageHandler = () => {
        setVal('')
        props.sendMessage(val)
        
    }
    const messageKeyHandler = event => {
        if(event.keyCode === 13){
            setVal('')
            props.sendMessage(val)
        }
    }
    const chats = props.data.map((c,i) => <div className={`Chat-single-data chat-${c.name}`} key={i}>{c.message}</div>)
    return <div className="Chat">
        <div className="Chat-Container">
            {chats}
        </div>
        <div className="Chat-input">
            <input value={val} onChange={changeInputValueHandler} 
            placeholder="Enter the message"
            onKeyDown={(e) => messageKeyHandler(e)}
            autoFocus/>
            <span className="message-send-button" 
            onClick={sendMeassageHandler}>
                SEND
            </span>
        </div>
    </div>
}

export default Chat