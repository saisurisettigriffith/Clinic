import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictions, setPredictions] = useState('');

  useEffect(() => {
    // Fetch the list of symptoms dynamically from the Flask API if available
    // Alternatively, define them statically if your API does not support it
    setSymptoms(['fever', 'cough', 'headache', 'sore throat']); // Example symptoms
  }, []);

  const handleSymptomChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSymptoms(prev => (
      checked ? [...prev, value] : prev.filter(symptom => symptom !== value)
    ));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: 'get',
        url: 'http://saisuri2015.pythonanywhere.com/predict',
        params: {
          symptom: selectedSymptoms
        }
      });
      setPredictions(response.data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  return (
    <div className="App">
      <h1>Symptom Checker</h1>
      <form onSubmit={handleSubmit}>
        {symptoms.map(symptom => (
          <div key={symptom}>
            <input
              type="checkbox"
              id={symptom}
              value={symptom}
              onChange={handleSymptomChange}
              checked={selectedSymptoms.includes(symptom)}
            />
            <label htmlFor={symptom}>{symptom}</label>
          </div>
        ))}
        <button type="submit">Check Symptoms</button>
      </form>
      {predictions && <div>
        <h2>Predictions</h2>
        <p>{predictions}</p>
      </div>}
    </div>
  );
}

export default App;