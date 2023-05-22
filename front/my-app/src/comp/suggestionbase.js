import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function SuggestBase() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/users/advice');
      setData(response.data); // Access the 'data' property of the response
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="suggest-container">
    <h2> a helpful message</h2>
      {data && (
        <p>{data['itis']} </p>

      )}
    </div>
  );
}

export default SuggestBase;
