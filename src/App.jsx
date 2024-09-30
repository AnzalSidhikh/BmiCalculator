import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState('');
  const [healthTips, setHealthTips] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight && height && age && gender) {
      let bmiValue;
      if (unit === 'metric') {
        const heightInMeters = height / 100;
        bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      } else {
        bmiValue = ((703 * weight) / (height * height)).toFixed(2);
      }
      setBmi(bmiValue);
      const bmiStatus = getStatus(bmiValue);
      setStatus(bmiStatus);
      setHealthTips(getHealthTips(bmiStatus, gender));
      setError('');
    } else {
      setError('Please fill in all fields');
    }
  };

  const getStatus = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 25) return 'Normal weight';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    if (bmi >= 30 && bmi < 35) return 'Obese Class I';
    if (bmi >= 35 && bmi < 40) return 'Obese Class II';
    if (bmi >= 40) return 'Obese Class III';
  };

  const getHealthTips = (status, gender) => {
    const tips = {
      'Underweight': [
        'Consult with a healthcare professional or nutritionist.',
        'Increase your calorie intake with nutrient-dense foods.',
        'Include protein-rich foods in your diet.',
        'Consider strength training to build muscle mass.'
      ],
      'Normal weight': [
        'Maintain a balanced diet with plenty of fruits and vegetables.',
        'Stay hydrated and aim for at least 8 glasses of water a day.',
        'Engage in regular physical activity, at least 150 minutes per week.',
        'Get adequate sleep, aiming for 7-9 hours per night.'
      ],
      'Overweight': [
        'Focus on portion control and mindful eating.',
        'Increase your intake of fruits, vegetables, and whole grains.',
        'Limit processed foods and sugary drinks.',
        'Aim for at least 30 minutes of moderate exercise most days of the week.'
      ],
      'Obese Class I': [
        'Consult with a healthcare professional for personalized advice.',
        'Set realistic weight loss goals, aiming for 1-2 pounds per week.',
        'Keep a food diary to track your eating habits.',
        'Incorporate both cardio and strength training into your exercise routine.'
      ],
      'Obese Class II': [
        'Seek guidance from a healthcare professional or registered dietitian.',
        'Consider a structured weight loss program.',
        'Focus on making sustainable lifestyle changes.',
        'Gradually increase physical activity, starting with low-impact exercises.'
      ],
      'Obese Class III': [
        'Consult with a healthcare professional immediately.',
        'Consider medically supervised weight loss programs.',
        'Explore potential medical interventions with your doctor.',
        'Start with gentle exercises like water aerobics or chair exercises.'
      ]
    };

    const genderSpecificTip = gender === 'male' 
      ? 'Men should aim for a waist circumference less than 40 inches.'
      : 'Women should aim for a waist circumference less than 35 inches.';

    return [...tips[status], genderSpecificTip];
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setGender('');
    setBmi(null);
    setStatus('');
    setError('');
    setHealthTips('');
  };

  const getBmiColor = (bmi) => {
    if (bmi < 18.5) return '#3498db';
    if (bmi >= 18.5 && bmi < 25) return '#2ecc71';
    if (bmi >= 25 && bmi < 30) return '#f39c12';
    if (bmi >= 30 && bmi < 35) return '#e74c3c';
    if (bmi >= 35) return '#c0392b';
    return '#95a5a6';
  };

  return (
    <div className="bmi-calculator">
      <h1 className='fw-bold'>BMI Calculator</h1>
      <form onSubmit={calculateBMI}>
        <div className="input-group">
          <label htmlFor="unit">Unit:</label>
          <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="metric">Metric (kg/cm)</option>
            <option value="imperial">Imperial (lbs/in)</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lbs'}):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="height">Height ({unit === 'metric' ? 'cm' : 'in'}):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="button-group">
          <button type="submit">Calculate BMI</button>
          <button type="button" onClick={resetForm}>Reset</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {bmi && (
        <div className="result">
          <h2>Your BMI is: {bmi}</h2>
          <p>Status: <span className={status.toLowerCase().replace(' ', '-')}>{status}</span></p>
          <div className="bmi-meter">
            <div className="bmi-scale">
              <div className="bmi-marker" style={{ left: `${Math.min(Math.max(bmi - 15, 0) * 2.5, 100)}%`, backgroundColor: getBmiColor(bmi) }}></div>
            </div>
            <div className="bmi-labels">
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40+</span>
            </div>
          </div>
          <div className="health-tips">
            <h3>Health Tips:</h3>
            <ul>
              {healthTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}