
import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setCandidates(savedCandidates);
  }, []);

  const handleRemoveCandidate = (id: number) => {
    const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
    setCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <main>
     
      <h1>Potential Candidates</h1>
      <div className="content">
        {candidates.length > 0 ? (
          <div className="candidate-list">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="candidate-item">
                <img src={candidate.avatar_url} alt={candidate.login} />
                <div className="candidate-info">
                  <h3>{candidate.name || candidate.login}</h3>
                  <p>Location: {candidate.location || 'Not specified'}</p>
                  <p>Email: {candidate.email || 'Not available'}</p>
                  <p>Company: {candidate.organizations_url || 'Not specified'}</p>
                </div>
                <button 
                  onClick={() => handleRemoveCandidate(candidate.id)} 
                  className="remove-button"
                >
                  -
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h2>No Candidates Yet</h2>
        )}
      </div>
    </main>
  );
};

export default SavedCandidates;