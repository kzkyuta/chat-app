import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import ChatScreen from './screens/chat_screen';
import {RouteAuthGuard} from './components/route_auth_guard';
import SignUpScreen from './screens/signup_screen';
import LoginScreen from './screens/login_screen';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route
        path="/"
        element={
          <RouteAuthGuard redirect="/login" children={<ChatScreen />} />
        }></Route>
    </Routes>
  );
}

export default App;
