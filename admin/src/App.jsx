import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Admin from './Pages/Admin/Admin';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const App = () => {
  const isLoginPage = window.location.pathname === '/login';
  const isSignupPage = window.location.pathname === '/signup';

  return (
    <div className="app">
      {!isLoginPage && !isSignupPage && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<ProtectedRoute>
          <Admin />
        </ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
