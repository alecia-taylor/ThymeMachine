import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllRecipes from './pages/AllRecipes';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import SearchRecipes from './pages/SearchRecipes';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllRecipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/search" element={<SearchRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
