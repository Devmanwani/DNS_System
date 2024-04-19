import React, { useState, useEffect } from 'react';
import './DNSRecordTable.css'; 

const DNSRecordTable = () => {
  const [dnsRecords, setDNSRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editedRecord, setEditedRecord] = useState({
    domain: '',
    type: '',
    value: ''
  });

  const fetchDNSRecords = async () => {
    try {
      const response = await fetch('https://PROXY_SERVER/pages/api/get');
      if (response.ok) {
        const data = await response.json();
        setDNSRecords(data);
      } else {
        console.error('Failed to fetch DNS records');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setEditedRecord({
      domain: record.domain,
      type: record.type,
      value: record.value
    });
  };

  const handleDeleteRecord = async (domain, type, value) => {
    try {
      let newValue = value.replace(/,/g, '');
      console.log(value);
      const response = await fetch(`PROXY_SERVER/pages/api/delete?domain=${domain}&type=${type}&values=${value}`, {
      //const response = await fetch(`http://localhost:8080/api/dns/delete/${domain}?type=${type}&values=${value}`, { // Update the URL to your backend route (`/api/dns/delete/:domain)  
      //const response = await fetch(`http://localhost:3000/api/dns/delete/${domain}?type=${type}&values=${value}`, {
      method: 'DELETE',
      });

      if (response.ok) {
        console.log('DNS record deleted successfully');
        fetchDNSRecords();
      } else {
        console.error('Failed to delete DNS record');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateRecord = async () => {
    try {
      const response = await fetch(`PROXY_SERVER/pages/api/update?domain=${editedRecord.domain}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedRecord)
      });

      if (response.ok) {
        console.log('DNS record updated successfully');
        fetchDNSRecords();
        setEditingRecord(null);
      } else {
        console.error('Failed to update DNS record');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchDNSRecords();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>DNS Record Type</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dnsRecords.map(record => (
            <tr key={record.id}>
              <td>{editingRecord === record ? <input type="text" name="domain" value={editedRecord.domain} onChange={handleInputChange} /> : record.domain}</td>
              <td>{editingRecord === record ? <input type="text" name="type" value={editedRecord.type} onChange={handleInputChange} /> : record.type}</td>
              <td>{editingRecord === record ? <input type="text" name="value" value={editedRecord.value} onChange={handleInputChange} /> : record.value}</td>
              <td>
                {editingRecord === record ? (
                  <>
                    <button className="editButton"  onClick={handleUpdateRecord}>Save</button>
                    <button className="deleteButton" onClick={() => setEditingRecord(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="editButton"  onClick={() => handleEditRecord(record)}>Edit</button>
                    <button className="deleteButton" onClick={() => handleDeleteRecord(record.domain, record.type, record.value)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DNSRecordTable;
