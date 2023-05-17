import React, {useState} from 'react'; 
import axios from 'axios'; 
import './styles.css'; 


function Signup({ handleLoginClick }){
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
  
      // Perform signup logic here
      try {
        // Perform signup logic here
        const response = await axios.post('/users/signup', {
          username,
          password
        });
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
      <div className="container">
        <h2>Sign Up</h2>
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
            Sign Up
          </button>
        </form>
        <p>
        Already have an account? <button onClick={handleLoginClick}>Login</button> // right here
      </p>
      </div>
    );
  }

  export default Signup; 