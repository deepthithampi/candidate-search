import React, { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialCandidates = async () => {
      try {
        setLoading(true);
        const data = await searchGithub(); // Fetch a list of candidates
        setPotentialCandidates(data);
        setCurrentCandidate(data[0]); // Show the first candidate
      } catch (e) {
        setError("Failed to load candidate data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialCandidates();
  }, []);

  const saveCandidateToLocalStorage = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, candidate]));
  };

  const saveAndShowNextCandidate = () => {
    if (currentCandidate) {
      saveCandidateToLocalStorage(currentCandidate);
      fetchNextCandidate();
    }
  };

  const showNextCandidate = () => {
    fetchNextCandidate();
  };

  const fetchNextCandidate = async () => {
    const nextIndex = candidateIndex + 1;
    if (nextIndex < potentialCandidates.length) {
      // Use searchGithubUser to fetch detailed info on the next candidate
      try {
        setLoading(true);
        const candidateData = await searchGithubUser(potentialCandidates[nextIndex].login);
        setCurrentCandidate(candidateData);
        setCandidateIndex(nextIndex);
      } catch (e) {
        setError("Failed to load candidate data.");
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentCandidate(null);
      setError("No more candidates available.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!currentCandidate) return <p>No candidates available.</p>;

  return (
    <div >
    <div className='container-div'>
      <img className='candidate-item img-avatar' src={currentCandidate.avatar_url} alt={`${currentCandidate.name}'s avatar`} />
      <h2 className='candidate-item '>{currentCandidate.name || currentCandidate.login}</h2>
     
      <p className='candidate-item '>Location: {currentCandidate.location || 'Not Specified'}</p>
      <p className='candidate-item '>Email: {currentCandidate.email || 'Not Specified'}</p>
      <p className='candidate-item '>Company: <a href={currentCandidate.html_url || 'Not Specified'}>{currentCandidate.html_url}</a></p> 
      <p className='candidate-item '>Bio: {currentCandidate.bio || 'Not Specified'}</p>
    </div>
     <div className='button-group'>
        <button onClick={showNextCandidate} className='remove-button'>-</button>
        <button onClick={saveAndShowNextCandidate} className='add-button'>+</button>
      </div>
    </div>
  );
};

export default CandidateSearch;