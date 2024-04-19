import React, { useState, useEffect } from 'react';
import Upload from './Upload';
import DNSRecordTable from './DNSRecordTable';
import DNSRecordForm from './DNSRecordForm';
import './Dashboard.css'; 

const Dashboard = () => {
  const [dnsRecords, setDNSRecords] = useState([]);
  const [key, setKey] = useState(Date.now());

  const handleAddRecord = () => {
    // Force reload of DNSRecordTable component by updating key
    setKey(Date.now()); // Update the key with a new value to force re-render
  };

  return (
    <div className="dashboard-container">
      <h1>Domain and DNS Record Management</h1>
      
      <DNSRecordForm onAddRecord={handleAddRecord} />
      <DNSRecordTable key={key} /> {/* Pass key prop to trigger re-render */}
      
    </div>
  );
};

export default Dashboard;