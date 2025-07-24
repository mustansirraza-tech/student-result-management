import React, { useState } from 'react';
import './resultsearch.css';

const ResultSearch = () => {
  const [ticketNo, setTicketNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(true); // 👈 new state to control form visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/results/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketNo: ticketNo.toUpperCase(),
          name: studentName.toUpperCase(),
        }),
      });

      if (!response.ok) throw new Error('Result not found');
      const data = await response.json();

      setResult(data);
      setError('');
      setShowForm(false); // 👈 hide form on success
    } catch (err) {
      setResult(null);
      setError('❌ Result not found. Please check your Hall Ticket No and Name.');
    }
  };

  const handleReset = () => {
    // 👇 reset all states to allow new search
    setTicketNo('');
    setStudentName('');
    setResult(null);
    setError('');
    setShowForm(true);
  };

  return (
    <div className="result-wrapper">
      <div className="search-box">
        <img src="/asf-logo.jpeg" alt="ASF Logo" className="logo" />

        <h2>Result of</h2>
        <h1>Seerat-e-Mustafa ﷺ Quiz Competition 2025</h1>
        <h3>Organized by Ahle Sunnat Foundation, Peddapalli</h3>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Hall Ticket No"
              value={ticketNo}
              onChange={(e) => setTicketNo(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Your Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
            <button type="submit">Show Result</button>
          </form>
        )}

        {error && <p className="error">{error}</p>}

        {result && !showForm && (
          <div className="result-card">
            <h2>{result['Name']}</h2>
            <p><strong>Hall Ticket No:</strong> {result['Hall Ticket']}</p>
            <p><strong>Father's Name:</strong> {result['Father Name']}</p>
            <p><strong>Age:</strong> {result['Age']}</p>
            <p><strong>Address:</strong> {result['Address']}</p>
            <p><strong>Mobile No:</strong> {result['Mobile No']}</p>
            <p>
              <strong>Result:</strong>{' '}
              <span className={result['Result'] === 'PASS' ? 'pass' : 'fail'}>
                {result['Result']}
              </span>
            </p>

            {/* 👇 Button to search again */}
            <button onClick={handleReset} style={{ marginTop: '20px' }}>
              Search Another Result
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultSearch;
