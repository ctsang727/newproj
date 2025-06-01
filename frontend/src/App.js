import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(res => setMessage(res.data.message));
      
    axios.get('http://localhost:8000/api/data')
      .then(res => setData(res.data.data));
  }, []);

  return (
    <div>
      <h1>React + FastAPI</h1>
      <p>Backend says: {message}</p>  {/* Should match FastAPI */}
      <ul>
        {data.map((item) => (
          <li key={item}>{item}</li>  
        ))}
      </ul>
    </div>
  );
}

export default App;