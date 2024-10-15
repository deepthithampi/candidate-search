import {Link} from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav>
    <ul className="nav">
      <li className="nav-item">
        <Link to="/" className="nav-link">Candidate Search</Link>
      </li>
      <li className="nav-item">
        <Link to="/SavedCandidates" className="nav-link">Saved Candidates</Link>
      </li>
    </ul>
  </nav>
  )
};

export default Nav;
