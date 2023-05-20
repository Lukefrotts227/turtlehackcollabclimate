import React, { useState } from 'react';
import axios from 'axios';

import './styles.css';

function Login({ handleSignupClick, setIsAuthenticated, setUsernameCallback }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }


  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/users/login', {
        username,
        password
      });
      console.log(response.data);

      // Check the response for authentication success
      if (response.data.success) {
        // Update the authentication state
        setIsAuthenticated(true);
        setUsernameCallback(username);
        //sendUserName(username)
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during login');
    }

    // Reset form inputs
    setUsername('');
    setPassword('');
  }

  return (
    <div className="container-log">
      <h2 className = "header-log-1">Login</h2>
      <form className="form-log-1" onSubmit={handleFormSubmit}>
        <label className = "label-log-1" htmlFor="username">Username:</label>
        <input className = "input-log-1"
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label className = "label-log-2" htmlFor="password">Password:</label>
        <input className = "input-log-2"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-log-1">
          Login
        </button>
      </form>
      <p className = "log-par-1">
        Don't have an account?{' '}
        <button className = "btn-log-2" onClick={handleSignupClick}>Sign Up</button>
      </p>
    </div>
  );
}

export default Login;