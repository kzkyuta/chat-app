import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import SignUpScreen from './components/signup_screen';
import ChatScreen from './components/chat_screen';
import {RouteAuthGuard} from './components/route_auth_guard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpScreen />} />
      <Route
        path="/chat"
        element={
          <RouteAuthGuard redirect="/" children={<ChatScreen />} />
        }></Route>
    </Routes>
  );
}

export default App;
