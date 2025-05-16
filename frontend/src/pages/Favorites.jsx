import { useEffect, useState } from 'react';
import { getFavorites } from '../services/api';
import { Link } from 'react-router-dom';
import '../App.css';

function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await getFavorites();
        setRecipes(res.data);
      } catch (err) {
        setError('You must be logged in to view favorites.');
      }
    }

    fetchFavorites();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        <h2 className="mb-3">Favorites</h2>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-success">{recipe.title}</h5>
                <p className="card-text"><strong>Rating:</strong> {recipe.averageRating?.toFixed(1) ?? 'N/A'}</p>
                <p className="card-text small text-muted">{recipe.ingredients.slice(0, 3).join(', ')}</p>
                <span><Link to={`/recipes/${recipe._id}`} className="btn btn-sm btn-primary">View</Link></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;