import { useEffect, useState } from 'react';
import { getAllRecipes, deleteRecipe } from '../services/api';
import { Link } from 'react-router-dom';
import '../App.css';


function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!localStorage.getItem('token');


  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await getAllRecipes();
        setRecipes(response.data);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this recipe?')) return;

  try {
    await deleteRecipe(id);
    console.log('Deleting ID:', id);
    setRecipes((prev) => prev.filter((r) => r._id !== id));
  } catch (err) {
    console.error('Failed to delete recipe:', err);
    alert('Failed to delete recipe');
  }
};

  if (loading) return <p>Loading recipes...</p>;
  if (recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        <h2 className="mb-3">All Recipes</h2>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-success">{recipe.title}</h5>
                <p className="card-text"><strong>Rating:</strong> {recipe.averageRating?.toFixed(1) ?? 'N/A'}</p>
                <p className="card-text small text-muted">{recipe.ingredients.slice(0, 3).join(', ')}</p>
                <span><Link to={`/recipes/${recipe._id}`} className="btn btn-sm btn-primary">View</Link></span>
                <span>   </span>
                {isLoggedIn && (<button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(recipe._id)}>Delete</button>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRecipes;
