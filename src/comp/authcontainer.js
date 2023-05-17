import React, { useState } from 'react';
import Login from './login';
import Signup from './signup';
import Basic from './studentpage'

function AuthContainer() {
    const [showLogin, setShowLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    function handleLoginClick() {
      setShowLogin(true);
    }
  
    function handleSignupClick() {
      setShowLogin(false);
    }
    if (isAuthenticated) {
        return <Basic />;
      }
    
      return (
        <div>
          {showLogin ? (
            <Login
              handleSignupClick={handleSignupClick}
              setIsAuthenticated={setIsAuthenticated}
            />
          ) : (
            <Signup handleLoginClick={handleLoginClick} />
          )}
        </div>
      );
    }
    
    export default AuthContainer;
    
    