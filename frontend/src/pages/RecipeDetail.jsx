import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipeById, getCommentsByRecipe, postComment } from '../services/api';
import { toggleFavorite } from '../services/api';
import '../App.css';


function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ username: '', text: '', rating: 5 });
  const [error, setError] = useState('');
  const [favoriteMessage, setFavoriteMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [recipeRes, commentsRes] = await Promise.all([
          getRecipeById(id),
          getCommentsByRecipe(id)
        ]);
        setRecipe(recipeRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        setError('Could not load recipe');
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = {
        recipe: id,
        ...form,
        rating: parseInt(form.rating),
      };
      await postComment(newComment);
      const updatedComments = await getCommentsByRecipe(id);
      setComments(updatedComments.data);
      setForm({ username: '', text: '', rating: 5 });
    } catch (err) {
      console.error(err);
      setError('Failed to post comment');
    }
  };

  const handleFavorite = async () => {
    try {
      await toggleFavorite(id);
      setFavoriteMessage('Recipe favorited!');
      setTimeout(() => setFavoriteMessage(''), 1500);
    } catch (err) {
      setFavoriteMessage('Login to favorite recipes');
      setTimeout(() => setFavoriteMessage(''), 1500);
    }
  };

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <h1>{recipe.title}</h1>
      <h3>Ingredients:</h3>
      <ul>{recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}</ul>

      <h3>Steps:</h3>
      <ol>{recipe.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>

      <p>Average Rating: {recipe.averageRating?.toFixed(1) || 'Not rated'}</p>
      
      <button onClick={handleFavorite}>Favorite</button>
      {favoriteMessage && <p>{favoriteMessage}</p>}

      <hr />
      <h2>Leave a Comment</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Your name" value={form.username} onChange={handleChange} required />
        <br />
        <textarea name="text" placeholder="Comment" value={form.text} onChange={handleChange} required />
        <br />
        <label>Rating: </label>
        <select name="rating" value={form.rating} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>

      <hr />
      <h2>Comments</h2>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((c) => (
        <div key={c._id}>
          <strong>{c.username}</strong> ({c.rating}/5):
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export default RecipeDetail;




