import React, { useState } from 'react'; 
import axios from 'axios';
import './styles.css';

function DieselExact({ username }){
    const [diesel, setDiesel] = useState('');
    //const username = useContext(UserContext);
    //const [isSubmit, setIsSubmit] = useState(false); 

    function setValue(event){
        setDiesel(event.target.value)
    }

    async function handleSubmit(event){
        
        event.preventDefault();

        try { 
            const formData = new FormData(); 
            formData.append('diesel', diesel); 
            formData.append('username', username);            
            console.log(username);
            const response = await axios.post('http://127.0.0.1:5000/users/dieselexact', formData);
            setDiesel('');

        }
        

        catch(error){
            console.log(error)
        }
    
    }

    return(
        <div className = "container-diesel">
        <form className = "form-diesel-1" onSubmit={handleSubmit}>
            <label className = "label-diesel-1"> If you can, enter the amount of Diesel fuel in gallons you have expended in the last week:
                    <input className = "input-diesel-1" type="number" value={diesel} onChange={setValue}/>

            </label>
            <button className = "btn-diesel-1" type="submit">Submit</button>

        </form>

        </div>)
}

export default DieselExact; 