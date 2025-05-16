import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">All Recipes</Link></li>
        <li><Link to="/add">Add Recipe</Link></li>
        <li><Link to="/search">Search</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
