import React, { useState } from 'react'; 
import axios from 'axios';
import './styles.css';

//import UserContext from './usercontext';

function GasExact({ username }){
    const [gas, setGas] = useState('');
    //const username = useContext(UserContext);
    //const [isSubmit, setIsSubmit] = useState(false); 

    function setValue(event){
        setGas(event.target.value)
    }

    async function handleSubmit(event){
        
        event.preventDefault();

        try { 
            const formData = new FormData(); 
            formData.append('gas', gas); 
            formData.append('username', username);            
            console.log(username);
            const response = await axios.post('http://127.0.0.1:5000/users/gasexact', formData);
            setGas('');

        }

        catch(error){
            console.log(error)
        }
    
    }

    return(
        <div className = "container-gas">
        <form className = "form-gas-1" onSubmit={handleSubmit}>
            <label className = "label-gas-1"> If you can, enter the amount of gas in gallons you have expended in the last week:
                    <input className = "input-gas-1" type="number" value={gas} onChange={setValue}/>

            </label>
            <button className = "btn-gas-1" type="submit">Submit</button>
        </form>

        </div>)
}

export default GasExact; 



