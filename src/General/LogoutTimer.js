import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutTimer = ({ logoutTime = 10000000 }) => {
  const [logoutTimer, setLogoutTimer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const resetTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      setLogoutTimer(setTimeout(logoutUser, logoutTime));
    };

    const logoutUser = () => {
      console.log('Logging out due to inactivity...');
      // Perform logout actions here (e.g., clear session, navigate to login)
      // Example:
      // localStorage.clear(); // Clear any stored session data
      navigate('/Precot'); // Redirect to Precot screen after logout
    };

    const clearTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };

    resetTimer();

    // Add event listeners to reset the timer on user activity
    window.addEventListener('click', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimer();
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [logoutTimer, logoutTime, navigate]);

  return <></>; // This component doesn't render any UI, so we return an empty fragment
};

export default LogoutTimer;
