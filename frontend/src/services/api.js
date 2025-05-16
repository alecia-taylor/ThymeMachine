import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5050/api', // Backend API base
});

// Include token in these requests
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const toggleFavorite = (recipeId) => API.post(`/users/favorite/${recipeId}`, {}, getAuthHeader());
export const getFavorites = () => API.get('/users/favorites', getAuthHeader());
export const getAllRecipes = () => API.get('/recipes');
export const createRecipe = (data) => API.post('/recipes', data);
export const getRecipeById = (id) => API.get(`/recipes/${id}`);
export const getCommentsByRecipe = (recipeId) => API.get(`/comments/${recipeId}`);
export const postComment = (data) => API.post(`/comments`, data);
export const deleteRecipe = (id) => API.delete(`/recipes/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});

