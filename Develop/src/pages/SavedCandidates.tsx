
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
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Bio</th>
              <th className="p-3 text-left">Reject</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={candidate.id} >
                <td className="tbody ">
                  <img src={candidate.avatar_url} alt={candidate.login} />
                </td>
                <td className="tbody">
                  <div>{candidate.name || candidate.login}</div>
                  <div >({candidate.login})</div>
                </td>
                <td className="tbody ">{candidate.location || 'Not specified'}</td>
                <td className="tbody ">
                  <a href={`mailto:${candidate.email}`} >
                    {candidate.email || 'Not available'}
                  </a>
                </td>
                <td className="tbody ">{candidate.company || 'Not specified'}</td>
                <td className="tbody ">{candidate.bio || 'No bio available'}</td>
                <td className="tbody ">
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
        <p className="text-center mt-8 text-xl">No Candidates Yet</p>
      )}
    </main>
  );
};

export default SavedCandidates;