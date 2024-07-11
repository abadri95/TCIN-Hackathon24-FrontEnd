import React, { useState } from 'react';
import axios from 'axios';

const FetchViolation = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [violations, setViolations] = useState([]);
  const [message, setMessage] = useState('');

  const handleFetch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/fetch-violation', {
        params: {
          vehicleNumber,
          chassisNumber
        }
      });
      setViolations(response.data);
      setMessage('');
    } catch (error) {
      setViolations([]);
      setMessage('No details found');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Fetch Violation</h2>
      <form onSubmit={handleFetch}>
        <div>
          <label>Vehicle Number:</label>
          <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
        </div>
        <div>
          <label>Chassis Number:</label>
          <input type="text" value={chassisNumber} onChange={(e) => setChassisNumber(e.target.value)} required />
        </div>
        <button type="submit">Fetch</button>
      </form>
      {violations.length > 0 ? (
        <div>
          <h3>Violation Details</h3>
          {violations.map((violation, index) => (
            <div key={index}>
              <p>Vehicle Number: {violation.vehicleNumber}</p>
              <p>Chassis Number: {violation.chassisNumber}</p>
              <p>Violations: {violation.violations ? violation.violations.join(', ') : 'No violations'}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default FetchViolation;
