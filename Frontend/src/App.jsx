import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Create from './components/Create';
import AllNotes from './components/AllNotes';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import PropTypes from 'prop-types';

  
// Protected Route Component
// Protected Routes mein children ka matlab hota hai jo bhi component uske andar aayega iss time mein proetected route ke andar AllNotes component and create component andar hai

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// PropTypes definition
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={
            <ProtectedRoute>
              <AllNotes />{/* this becomes the "child " prop automatically */}
            </ProtectedRoute>
          } />
          <Route path="/notes/new" element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
  }

export default App;
