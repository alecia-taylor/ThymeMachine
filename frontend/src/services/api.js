import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5050/api', // Backend API base
});

export const getAllRecipes = () => API.get('/recipes');
