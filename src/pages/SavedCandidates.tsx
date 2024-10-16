
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
    <main className="container">
      <h1 >Potential Candidates</h1>
      
      <div >
        <table className="table">
          <thead>
            <tr className="tr">
              <th >Image</th>
              <th >Name</th>
              <th >Location</th>
              <th >Email</th>
              <th >Company</th>
              <th >Bio</th>
              <th >Reject</th>
            </tr>
          </thead>
          <tbody className="tbody ">
            {candidates.map((candidate) => (
              <tr key={candidate.id} >
                <td >
                  <img src={candidate.avatar_url} alt={candidate.login} />
                </td>
                <td >
                  <div>{candidate.name || candidate.login}</div>
                  <div >({candidate.login})</div>
                </td>
                <td >{candidate.location || 'Not specified'}</td>
                <td >
                  <a href={`mailto:${candidate.email}`} >
                    {candidate.email || 'Not available'}
                  </a>
                </td>
                <td >{candidate.company || 'Not specified'}</td>
                <td >{candidate.bio || 'No bio available'}</td>
                <td >
                  <button className="remove-button"
                    onClick={() => handleRemoveCandidate(candidate.id)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {candidates.length === 0 && (
        <p>No Candidates Yet</p>
      )}
    </main>
  );
};

export default SavedCandidates;