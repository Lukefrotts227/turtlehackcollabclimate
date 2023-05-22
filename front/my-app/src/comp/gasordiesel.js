import React, { useState } from 'react'; 
import axios from 'axios';
import './styles.css';

function GasOrDiesel({ setIsGas, setDoneWithCheck, username }) {
    async function handleSelectGas(event) {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('diesel', '0');
        formData.append('username', username);
        const response = await axios.post('http://127.0.0.1:5000/users/dieselexact', formData);
        setIsGas(true);
        setDoneWithCheck(true);
      } catch (error) {
        console.log(error);
      }
    }
  
    async function handleSelectDiesel(event) {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('gas', '0');
        formData.append('username', username);
        const response = await axios.post('http://127.0.0.1:5000/users/gasexact', formData);
        setIsGas(false);
        setDoneWithCheck(true);
      } catch (error) {
        console.log(error);
      }
    }
  
    function handleButtonClickGas(event) {
      handleSelectGas(event);

    }
  
    function handleButtonClickDiesel(event) {
      handleSelectDiesel(event);

    }
  
    return (
      <div className="container-gasordiesel">
        <h1>Choose whether you drive in gas or diesel</h1>
        <button onClick={handleButtonClickGas}>Choose gas</button>
        <button onClick={handleButtonClickDiesel}>Choose diesel</button>
      </div>
    );
  }

export default GasOrDiesel; 