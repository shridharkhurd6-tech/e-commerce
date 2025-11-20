import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('admin-user');
    if (user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Show nothing while checking auth
  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect already happened
  if (!isAuth) {
    return null;
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;
