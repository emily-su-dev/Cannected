import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Correctly import BrowserRouter, Routes, and Route
import Login from './login';  // Import Login component
import Profile from './profile';  // Import Profile component
import SignUp from './signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />  {/* Default route */}
      <Route path="/login" element={<Login />} />  {/* Login route */}
      <Route path="/profile" element={<Profile />} />  {/* Profile route */}
    </Routes>
  );
}

export default App;
