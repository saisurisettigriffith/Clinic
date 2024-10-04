import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictions, setPredictions] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSymptoms([
      // Your symptoms array
    ]);
  }, []);

  const handleSymptomChange = symptom => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(prev => [...prev, symptom]);
    }
  };

  const handleRemoveSymptom = symptom => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const queryString = selectedSymptoms.map(symptom => `symptom=${encodeURIComponent(symptom)}`).join('&');
    const response = await axios.get(`https://saisuri2015.pythonanywhere.com/predict?${queryString}`);
    setPredictions(response.data);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Symptom Checker</h1>
      </div>
      <div className="main">
        <div className="symptom-selection">
          <input 
            type="text" 
            placeholder="Search and add symptoms..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="symptom-list">
            {symptoms.filter(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedSymptoms.includes(symptom))
              .map(symptom => (
                <div key={symptom} onClick={() => handleSymptomChange(symptom)} className="symptom-item">
                  {symptom}
                </div>
              ))}
          </div>
        </div>
        <div className="selected-symptoms">
          {selectedSymptoms.map(symptom => (
            <div key={symptom} className="selected-symptom">
              {symptom}
              <button onClick={() => handleRemoveSymptom(symptom)}>x</button>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} className="submit-btn">Check Symptoms</button>
      </div>
      {predictions && (
        <div className="predictions">
          <h2>Predictions</h2>
          <p>{predictions}</p>
        </div>
      )}
    </div>
  );
}

export default App;