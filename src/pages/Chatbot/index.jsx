import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Como posso ajudar você hoje?", sender: "bot", name: "FraudeBot" },
    ]);
    const [input, setInput] = useState("");
    const [userName, setUserName] = useState("");
    const chatWindowRef = useRef(null);

    const getUserData = () => {
        const storedName = localStorage.getItem('name');
        return { name: storedName };
    };

    const getUserName = () => {
        const userData = getUserData();
        if (userData.name) {
            setUserName(userData.name);
        }
    };

    useEffect(() => {
        getUserName();
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { text: input, sender: "user", name: userName || "Usuário" }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
                sender: "user",
                message: input
            });

            const botResponses = response.data.map((msg, index) => ({
                text: msg.text || "Desculpe, não entendi.",
                sender: "bot",
                name: "FraudeBot",
                delay: index * 1500
            }));

            botResponses.forEach((response, index) => {
                setTimeout(() => {
                    setMessages((prevMessages) => [...prevMessages, response]);
                }, response.delay);
            });

        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            setMessages([
                ...newMessages,
                { text: "Desculpe, houve um problema ao processar sua solicitação.", sender: "bot" }
            ]);
        }
    };

    const formatMessage = (message) => {
        return message.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
        ));
    };

    const handleSuggestion = (suggestion) => {
        setInput(suggestion);
        sendMessage();
    };

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className='chatbot'>
            <h1 className='titulo'>Chatbot</h1>
            <div>
                <div className="chat-window" ref={chatWindowRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                        <strong>{msg.name}:</strong> {formatMessage(msg.text)}
                    </div>
                    ))}
                </div>

                <div className="input-area">
                    <div className="suggestions">
                        <button onClick={() => handleSuggestion("Como posso proteger minhas senhas?")}>
                            Segurança de Senhas
                        </button>
                        <button onClick={() => handleSuggestion("Dicas para proteger dados pessoais.")}>
                            Proteção de Dados Pessoais
                        </button>
                        <button onClick={() => handleSuggestion("Como fazer compras online seguras?")}>
                            Compras Online Seguras
                        </button>
                        <button onClick={() => handleSuggestion("Dicas para monitoramento de transações.")}>
                            Monitoramento de Transações
                        </button>
                        <button onClick={() => handleSuggestion("Como identificar phishing?")}>
                            Identificação de Phishing
                        </button>
                        <input
                            className="input-chat"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp={handleKeyPress}
                            placeholder="Digite a sua mensagem..."
                        />
                        <button onClick={sendMessage}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
