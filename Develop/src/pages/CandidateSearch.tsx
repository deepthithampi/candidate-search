
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchGithub();
        setCandidates(data);
      } catch (e) {
        setError('Failed to fetch candidate data');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleCandidateClick = async (username: string) => {
    try {
      const candidateDetails = await searchGithubUser(username);
      setSelectedCandidate(candidateDetails);
    } catch (e) {
      setError('Failed to fetch candidate details');
    }
  };

  const handleAddCandidate = () => {
    if (selectedCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(selectedCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
  };

  const handleRemoveCandidate = () => {
    if (selectedCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      const updatedCandidates = savedCandidates.filter(
        (candidate: Candidate) => candidate.id !== selectedCandidate.id
      );
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    }
  };

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      
      <h1>Candidate Search</h1>
      <h3 className='h3-candidate-search'>Click on the desired candidate's avatar to add or remove</h3>
    <div className="content">
      <div className="candidate-list">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="candidate-item"
            onClick={() => handleCandidateClick(candidate.login)}
          >
            <img src={candidate.avatar_url} alt={candidate.login} />
            <div className="candidate-info">
              <h3>{candidate.login}</h3>
              <p>{candidate.html_url}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedCandidate && (
        <div className="candidate-details">
          <img src={selectedCandidate.avatar_url} alt={selectedCandidate.login} />
          <h2>{selectedCandidate.name || selectedCandidate.login}</h2>
          <p>Location: {selectedCandidate.location || 'Not specified'}</p>
          <p>Email: {selectedCandidate.email || 'Not available'}</p>
          <p>Company: {selectedCandidate.organizations_url|| 'Not specified'}</p>
          <div className="button-group">
            <button onClick={handleRemoveCandidate} className="remove-button">-</button>
            <button onClick={handleAddCandidate} className="add-button">+</button>
          </div>
        </div>
      )}
    </div>
    </main>
  );
};

export default CandidateSearch;