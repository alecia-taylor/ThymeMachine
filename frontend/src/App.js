import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllRecipes from './pages/AllRecipes';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import SearchRecipes from './pages/SearchRecipes';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<AllRecipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/search" element={<SearchRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
