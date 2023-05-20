import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import ProgressBar from './progressbar';

function Combo({ username }) {
  const [data, setData] = useState(null);
  const [otherdata, setOtherData] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [otherCompleted, setOtherCompleted] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  const fetchOtherData = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);

      const response = await axios.post('http://127.0.0.1:5000/users/data', formData);
      setOtherData(response.data);
    } catch (error) {
      console.error('Error fetching other data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchOtherData();
  }, []);

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        setCompleted((prevCompleted) => {
          const newValue = prevCompleted + 1;
          return newValue <= data.bar ? newValue : prevCompleted;
        });
      }, 50);
  
      return () => clearInterval(interval);
    }
  }, [data]);

  useEffect(() => {
    if (otherdata) {
      const interval = setInterval(() => {
        setOtherCompleted((prevCompleted) => {
          const newValue = prevCompleted + 1;
          return newValue <= otherdata.barme ? newValue : prevCompleted;
        });
      }, 50);
  
      return () => clearInterval(interval);
    }
  }, [otherdata]);

  const handleClick = () => {
    fetchData();
    fetchOtherData();
    setCompleted(0); // Reset the progress bar
    setOtherCompleted(0);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !otherdata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-combo-1">
      <button className="btn-combo-1" onClick={handleClick}>
        Update the data
      </button>
        <p className = "paragraph-combo-1"> The top bar shows how well the community is doing and the bottom shows how well you are doing </p>
      <ProgressBar bgcolor="#6a1b9a" completed={completed} />
      <ProgressBar bgcolor="#ff0000" completed={otherCompleted} />
    </div>
  );
}

export default Combo;
