import React, { useState } from 'react';
import axios from 'axios';

const InsertViolation = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [violations, setViolations] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const violationsArray = violations.split(',').map(v => v.trim());
    try {
      const response = await axios.post('http://localhost:8080/api/add-violation', {
        vehicleNumber,
        chassisNumber,
        violations: violationsArray
      });
      setMessage({ type: 'success', text: 'Violation details inserted successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error inserting violation details' });
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Insert Violation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vehicle Number:</label>
          <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
        </div>
        <div>
          <label>Chassis Number:</label>
          <input type="text" value={chassisNumber} onChange={(e) => setChassisNumber(e.target.value)} required />
        </div>
        <div>
          <label>Violations (comma-separated):</label>
          <input type="text" value={violations} onChange={(e) => setViolations(e.target.value)} required />
        </div>
        <button type="submit">Insert</button>
      </form>
      {message && <p className={`message ${message.type}`}>{message.text}</p>}
    </div>
  );
};

export default InsertViolation;
