import { useState } from 'react';
import { createRecipe } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AddRecipe() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [error, setError] = useState('');

  const handleChange = (setter, index, value) => {
    setter(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addField = (setter) => {
    setter(prev => [...prev, '']);
  };

  const removeField = (setter, index) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        title,
        ingredients: ingredients.filter(i => i.trim() !== ''),
        steps: steps.filter(s => s.trim() !== ''),
      };
      await createRecipe(payload);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to submit recipe');
    }
  };

  return (
    <div className="container py-5">
      <div className="col-md-8 offset-md-2 bg-white p-4 rounded shadow-sm">
        <h3 className="text-success mb-4">Add New Recipe</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Recipe Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Ingredients */}
          <div className="mb-3">
            <label className="form-label">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => handleChange(setIngredients, index, e.target.value)}
                  required
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeField(setIngredients, index)}
                  >
                    &times;
                  </button>
                )}
                {index === ingredients.length - 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => addField(setIngredients)}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="mb-3">
            <label className="form-label">Steps</label>
            {steps.map((step, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  className="form-control"
                  value={step}
                  onChange={(e) => handleChange(setSteps, index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  required
                />
                {steps.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removeField(setSteps, index)}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => addField(setSteps)}
            >
              + Add Step
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit Recipe</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
