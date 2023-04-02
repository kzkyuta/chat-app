import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import SignUpScreen from './components/signup_screen';
import ChatScreen from './components/chat_screen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
    </Routes>
  );
}

export default App;
