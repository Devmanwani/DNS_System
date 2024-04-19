import React, { useState } from 'react';
import './DNSRecordForm.css'; 

const DNSRecordForm = ({ onSubmit }) => {
  const [domain, setDomain] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (!domain || !type || !value) {
      setError('All fields are required');
      return;
    }

    try {
      
      const response = await fetch('https://PROXY_SERVER/pages/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain, type, value }), 
      });
      window.location.reload(); 

      // Check if request was successful
      if (response.ok) {
        const data = await response.json(); 
        onSubmit(data); 
        setDomain('');
        setType('');
        setValue('');
        setError('');
        
      } else {
        const errorData = await response.json(); 
        setError(`Error: ${errorData.error}`); 
      }
    } catch (error) {
      console.error('Error:', error);
      setError('DNS record created'); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add Record</button>
      {error && <p className="error">{error}</p>} {/* Display error message */}
    </form>
  );
};

export default DNSRecordForm;
