import { useEffect, useState } from 'react';
import { getAllRecipes } from '../services/api';
import { Link } from 'react-router-dom';

function SearchRecipes() {
  const [query, setQuery] = useState('');
  const [allRecipes, setAllRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await getAllRecipes();
        setAllRecipes(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
      }
    }

    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    const results = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="mb-3">Search Recipes</h2>
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Search by recipe title..."
          value={query}
          onChange={handleSearch}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted">No recipes found.</p>
      ) : (
        <div className="row g-4">
          {filtered.map((recipe) => (
            <div key={recipe._id} className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-success">{recipe.title}</h5>
                  <p className="card-text small">
                    Rating: {recipe.averageRating?.toFixed(1) ?? 'N/A'}
                  </p>
                  <p className="card-text text-muted small">
                    {recipe.ingredients.slice(0, 3).join(', ')}
                  </p>
                  <Link to={`/recipes/${recipe._id}`} className="btn btn-sm btn-primary">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchRecipes;
