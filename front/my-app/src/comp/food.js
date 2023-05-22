import React, { useState } from 'react'; 
import axios from 'axios';
import './styles.css';

function Food({ username }) {
    const [calories, setCalories] = useState(0);
    const [inputs, setInputs] = useState([
      { name: "meat", value: 0 },
      { name: "dairy", value: 0 },
      { name: "fruits_veggies", value: 0 },
      { name: "grain", value: 0 },
    ]);
  
    function handleCaloriesChange(value) {
      setCalories(Number(value));
    }
  
    function handleChange(index, value) {
      const updatedInputs = [...inputs];
      updatedInputs[index].value = Number(value);
      setInputs(updatedInputs);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      const sum = inputs.reduce((acc, curr) => acc + curr.value, 0);
      if (sum === 100) {
        // Create a data object to send to the backend
        const formData = new FormData();
        formData.append('username', username);
        formData.append('calories', calories);
        inputs.forEach((input) => {
          formData.append(input.name, input.value);
        });
  
        // Send the form data to the backend using Axios
        axios
          .post("http://127.0.0.1:5000/users/foodcalc", formData)
          .then(() => {
            alert("Form data sent successfully!");
          })
          .catch((error) => {
            alert("Error sending form data.");
            console.log(error);
          });
      } else {
        alert("Sum is not equal to 100!");
      }
    }
  
    return (
      <div className="container-food-1">
        <h2 className="header-food-1">Enter Your Daily Food Intake</h2>
        <p className="paragraph-food-1">
          The percentage shown below indicates the proportion of each food group in your total daily caloric intake.
        </p>
        <form className = "form-food-1" onSubmit={handleSubmit}>
          <div className="container-food-2">
            <div className="container-food-3">
              <label className = "label-food-1"htmlFor="calories">Total Calories per Day:</label>
              <input
                type="number"
                name="calories"
                id="calories"
                value={calories}
                onChange={(e) => handleCaloriesChange(e.target.value)}
                className="input-food-1"
              />
            </div>
            {inputs.map((input, index) => (
              <div className="container-food-4" key={index}>
                <label className = "label-food-2" htmlFor={input.name}>{input.name}:</label>
                <input
                  type="number"
                  name={input.name}
                  id={input.name}
                  value={input.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="input-food-2"
                />
              </div>
            ))}
          </div>
          <button className = "btn-food-1" type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default Food;