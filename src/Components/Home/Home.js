import React, { useState , useEffect } from 'react';
import './Home.css';
import axios from '../../axiosbase'

import Microphone from '../Microphone/Microphone';
import Chat from '../Chat/Chat';


const Home = props => {
    const [microphone , setMicrophone] = useState(true);
    const [data , setData] = useState([{name:'bot',message:'Welcome'}]);
    const [botResponse ,setBotResponse] = useState('')

    const sendMessage = (m) => {
        var allMessages = data.map((b) => {return {...b}})
        allMessages.push({name:'user',message:m})
        setData([...allMessages])
        axios.post('/message',{mess:m})
        .then(async (res) => {console.log(res)
                allMessages.push({name:'bot',message:res.data})
                setData([...allMessages])
                setBotResponse(res.data)
            })
        .catch(err => console.log(err))
    }

    const microAndChatToggler = () => {
        let prevState = microphone;
        setMicrophone(!prevState);
    };
    return <div className="Home">
        <div onClick={microAndChatToggler}
            className="Home-toggler-button">
            {microphone?"Chat":"Microphone"}</div>
        {microphone?<Microphone 
        sendMessage = {(m) => sendMessage(m)}
        botResponse={botResponse}
        setBotResponse={setBotResponse}/>:
        <Chat data={data}
        sendMessage = {(m) => sendMessage(m)}/>}
    </div>
}

export default Home; 