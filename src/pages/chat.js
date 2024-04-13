import React, { useState, useRef, useEffect } from 'react';
import { TextField, Container, Paper, List, ListItem, ListItemText, Button } from '@mui/material';

function Message({ text, isUser }) {
  return (
    <ListItem
      alignItems="flex-start"
      style={{
        alignSelf: isUser ? 'flex-start' : 'flex-end',
        display: 'flex',
        justifyContent: isUser ? 'flex-start' : 'flex-end',
        marginBottom: '10px',
        width: '100%',
      }}
    >
      <ListItemText
        style={{
          borderRadius: '10px',
          padding: '10px',
          backgroundColor: isUser ? '#e6e6e6' : '#cce5ff',
          maxWidth: '70%',
        }}
        primary={text}
        primaryTypographyProps={{ component: 'div' }}
      />
    </ListItem>
  );
}

function MessageList({ messages }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Paper style={{ marginTop: '20px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px', padding: '10px', maxHeight: 'calc(100vh - 160px)', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#888 transparent' }}>
      <List ref={listRef} style={{ display: 'flex', flexDirection: 'column-reverse', gap: '10px', width: '100%' }}>
        {messages.slice(0).reverse().map((message, index) => (
          <Message key={index} text={message.text} isUser={message.isUser} />
        ))}
      </List>
    </Paper>
  );
}

function MessageInput({ onSendMessage }) {
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false); // State to track if message is being sent

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputText.trim() !== '') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setSending(true); // Set sending state to true
      onSendMessage(inputText);
      setInputText('');
      setTimeout(() => {
        setSending(false); // Set sending state back to false after 2 seconds
      }, 2000);
    }
  };

  return (
    <div style={{ marginBottom: '20px', marginLeft: '10px', marginRight: '10px', width: '100%', display: 'flex' }}>
      <TextField
        label="Ask your questions?"
        variant="outlined"
        fullWidth
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={sending} // Disable input while sending
        style={{ borderRadius: '10px', flexGrow: 1 }}
      />
      <Button variant="contained" onClick={sendMessage} disabled={sending} style={{ borderRadius: '10px', marginLeft: '10px' }}>Enter</Button>
    </div>
  );
}

function ChatApp() {
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    setMessages((prevMessages) => [...prevMessages, { text, isUser: true }]);
    // Simulate bot response (you would replace this with actual backend API calls)
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: 'AI is still not integrated so this will be the default response', isUser: false }]);
    }, 500);
  };

  return (
    <>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </>
  );
}

function ChatTrigger() {
  return (
    <div className="App" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <header className="App-header" style={{ position: 'fixed', top: 0, left: 0, backgroundColor: '#ffffff', padding: '10px' }}>
        <h1 style={{ textAlign: 'left', marginLeft: '10px', marginBottom: 0, fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>AILice</h1>
      </header>
      <Container maxWidth="sm" style={{ marginTop: '60px' }}>
        <ChatApp />
      </Container>
    </div>
  );
}

export default ChatTrigger;
