import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictions, setPredictions] = useState('');

  useEffect(() => {
    setSymptoms([
      "itchingg", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills", "joint_pain",
      "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting", "burning_micturition",
      "spotting_urination", "fatigue", "weight_gain", "anxiety", "cold_hands_and_feets", "mood_swings",
      "weight_loss", "restlessness", "lethargy", "patches_in_throat", "irregular_sugar_level", "cough",
      "high_fever", "sunken_eyes", "breathlessness", "sweating", "dehydration", "indigestion", "headache",
      "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "pain_behind_the_eyes", "back_pain",
      "constipation", "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine", "yellowing_of_eyes",
      "acute_liver_failure", "fluid_overload_1", "swelling_of_stomach", "swelled_lymph_nodes", "malaise",
      "blurred_and_distorted_vision", "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure",
      "runny_nose", "congestion", "chest_pain", "weakness_in_limbs", "fast_heart_rate", "pain_during_bowel_movements",
      "pain_in_anal_region", "bloody_stool", "irritation_in_anus", "neck_pain", "dizziness", "cramps", "bruising",
      "obesity", "swollen_legs", "swollen_blood_vessels", "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails",
      "swollen_extremities", "excessive_hunger", "extra_marital_contacts", "drying_and_tingling_lips", "slurred_speech",
      "knee_pain", "hip_joint_pain", "muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness",
      "spinning_movements", "loss_of_balance", "unsteadiness", "weakness_of_one_body_side", "loss_of_smell",
      "bladder_discomfort", "foul_smell_of_urine", "continuous_feel_of_urine", "passage_of_gases", "internal_itching",
      "toxic_look_(typhos)", "depression", "irritability", "muscle_pain", "altered_sensorium", "red_spots_over_body",
      "belly_pain", "abnormal_menstruation", "dischromic_patches", "watering_from_eyes", "increased_appetite", "polyuria",
      "family_history", "mucoid_sputum", "rusty_sputum", "lack_of_concentration", "visual_disturbances",
      "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding", "distention_of_abdomen",
      "history_of_alcohol_consumption", "fluid_overload_2", "blood_in_sputum", "prominent_veins_on_calf", "palpitations",
      "painful_walking", "pus_filled_pimples", "blackheads", "scurring", "skin_peeling", "silver_like_dusting",
      "small_dents_in_nails", "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"
    ]);
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
      const queryString = selectedSymptoms.map(symptom => `symptom=${encodeURIComponent(symptom)}`).join('&');
      const response = await axios.get(`https://saisuri2015.pythonanywhere.com/predict?${queryString}`);
      setPredictions(response.data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Symptom Checker</h1>
        <form onSubmit={handleSubmit} className="symptoms-form">
          <div className="symptoms-list">
            {symptoms.map(symptom => (
              <div key={symptom} className="symptom-item">
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
          </div>
          <button type="submit" className="submit-btn">Check Symptoms</button>
        </form>
        {predictions && (
          <div className="predictions">
            <h2>Predictions</h2>
            <p>{predictions}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;