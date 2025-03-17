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
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import axiosInstance from './config/axiosConfig';

  
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
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
              <AllNotes />
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
