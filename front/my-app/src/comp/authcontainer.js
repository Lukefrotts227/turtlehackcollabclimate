import React, { useState } from 'react';
import Login from './login';
import Signup from './signup';
import Basic from './studentpage'
import GasExact from './emissdata';
import DieselExact from './diesel';
import Food from './food';
import Combo from './groupcollab';
import GasOrDiesel from './gasordiesel';
import SuggestBase from './suggestionbase';

function AuthContainer() {
    const [showLogin, setShowLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isGas, setIsGas] = useState(false);    
    const [doneWithCheck, setDoneWithCheck] = useState(false);

    const [username, setUsername] = useState('');

    function setUsernameCallback(username) {
        setUsername(username);
      }
  
    function handleLoginClick() {
      setShowLogin(true);
    }
  
    function handleSignupClick() {
      setShowLogin(false);
    }

    if (isAuthenticated) { 
      if(!doneWithCheck){
        return (
          <div className = 'container-auth-1'>
            {username && <GasOrDiesel username = {username}
            setIsGas = {setIsGas}
            setDoneWithCheck = {setDoneWithCheck}/>}
          </div>
        )
        }

      if (isGas){
        return( <div className = "container-auth-1">
                <Basic />
                
                {username && <GasExact username={username} />}
                
                {username && <Food username={username} />}
                {username && <Combo username={username} />}
                {<SuggestBase/>}
        </div>
        );

        }

        else if(doneWithCheck && !isGas){
          return( <div className = "container-auth-1">
        <Basic />
        
        {username && <DieselExact username={username} />}
        {username && <Food username={username} />}
        {username && <Combo username={username} />}
        {<SuggestBase/>}
</div>
);
        }
      }
    
      return (
        <div className = "container-auth-2" >
          {showLogin ? (
            <Login
              handleSignupClick={handleSignupClick}
              setIsAuthenticated={setIsAuthenticated}  
              setUsernameCallback={setUsernameCallback}
            />
            
          ) : (
            <Signup handleLoginClick={handleLoginClick} />
            
          )}
          
        </div>
      );
    }
    
    export default AuthContainer;
    
    