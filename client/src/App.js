import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import AddAddress from './AddAddress';  // Add address page
import Donate from './donate';  // Donate page
import Profile from './profile';
import SignUp from './signup';
import Home from './home';
import Collection from './Collection';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/add-address" element={<AddAddress />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/Collection" element={<Collection />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
