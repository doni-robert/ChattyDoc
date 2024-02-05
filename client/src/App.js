import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Features from "./pages/Features/Features";
import Navbar from './components/ui/Navbar';
import "./assets/styles/App.css";
import Dashboard from './pages/Dashboard/Dashboard';

function App(){
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/features" element={<Features />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
 
export default App;