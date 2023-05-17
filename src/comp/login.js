import React, { useState, useEffect } from 'react'; 
import AuthContainer from './authcontainer';
import axios from 'axios';
import './styles.css'; 

function Login({ handleSignupClick, setIsAuthenticated  }){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    function handleUsernameChange(event) {
      setUsername(event.target.value);
    }
  
    function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
    
  
    async function handleFormSubmit(event) {
      event.preventDefault();
  
      // Perform login/authentication logic here
      try {
        // Perform login/authentication logic here
        const response = await axios.post('/users/login', {
          username,
          password
        });
        console.log(response.data);
        // Handle the response or redirect to a success page
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        // Handle the error or display an error message
      }
  
  
      // Reset form inputs
      setUsername('');
      setPassword('');
  
      // Redirect to the desired page (StudentPage)
      setIsAuthenticated(true);
    }
  
    return (
      <div className="container">
        <h2>Login</h2>
        <form className="form" onSubmit={handleFormSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <p>
        Don't have an account? <button onClick={handleSignupClick}>Sign Up</button> // right here 
        </p>
      </div>
    );
  }
   




export default Login;