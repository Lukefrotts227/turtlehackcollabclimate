import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function Signup({ handleLoginClick }) {
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

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post('http://127.0.0.1:5000/users/signup', formData);
      console.log(response.data);
      // Redirect to the login page
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
      // Handle the error or display an error message
    }

    // Reset form inputs
    setUsername('');
    setPassword('');

    // Redirect to the login page
    window.location.href = '/login';
  }

  return (
    <div className="container-sign">
      <h2 className="header-sign-1">  Sign Up</h2>
      <form className="form-sign-1" onSubmit={handleFormSubmit}>
        <label className="label-sign-1" htmlFor="username">Username:</label>
        <input className = "input-sign-1"
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label className = "label-sign-2" htmlFor="password">Password:</label>
        <input className = "input-sign-2"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="btn-sign-1">
          Sign Up
        </button>
      </form>
      <p className = "p-sign-1">
        Already have an account? <button className = "btn-sign-2" onClick={handleLoginClick}>Login</button>
      </p>
    </div>
  );
}

export default Signup;