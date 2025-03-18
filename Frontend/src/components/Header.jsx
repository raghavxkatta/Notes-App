import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Redirect to login if user isn't authenticated
    const handleProtectedClick = (e) => {
        if (!token) {
            e.preventDefault();
            navigate('/login');
        }
    };

    return (
        <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 shadow-lg py-7">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white font-semibold text-2xl hover:text-purple-300 transition duration-200">
                            Notes App
                        </Link>
                    </div>
                    
                    {/* Center-aligned nav links - Desktop only */}
                    <div className="hidden md:flex flex-1 justify-center items-center">
                        <div className="flex space-x-12">
                            {/* Home - Always accessible */}
                            <Link 
                                to="/" 
                                className="text-white text-xl font-medium hover:text-purple-300 transition duration-200 transform hover:scale-105"
                            >
                                Home
                            </Link>
                            
                            {/* Create Note - Protected, redirects if not logged in */}
                            <Link 
                                to="/notes/new" 
                                className="text-white text-xl font-medium hover:text-purple-300 transition duration-200 transform hover:scale-105"
                                onClick={handleProtectedClick}
                            >
                                Create Note
                            </Link>
                            
                            {/* All Notes - Protected, redirects if not logged in */}
                            <Link 
                                to="/notes" 
                                className="text-white text-xl font-medium hover:text-purple-300 transition duration-200 transform hover:scale-105"
                                onClick={handleProtectedClick}
                            >
                                My Notes
                            </Link>
                        </div>
                    </div>
                    
                    {/* Login/Logout Button */}
                    <div className="hidden md:block">
                        {token ? (
                            <div className="flex items-center space-x-5">
                                <span className="text-purple-200 text-lg">Hi, {user?.username || 'User'}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 
                                            text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200 
                                            transform hover:scale-105 hover:shadow-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 
                                        text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200 
                                        transform hover:scale-105 hover:shadow-lg"
                            >
                                Login / Register
                            </Link>
                        )}
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white p-2 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-800 transition duration-200"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-2">
                        <Link 
                            to="/" 
                            className="block text-lg text-white hover:bg-purple-700 px-4 py-3 rounded-md transition duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/notes/new" 
                            className="block text-lg text-white hover:bg-purple-700 px-4 py-3 rounded-md transition duration-200"
                            onClick={(e) => {
                                setIsOpen(false);
                                handleProtectedClick(e);
                            }}
                        >
                            Create Note
                        </Link>
                        <Link 
                            to="/notes" 
                            className="block text-lg text-white hover:bg-purple-700 px-4 py-3 rounded-md transition duration-200"
                            onClick={(e) => {
                                setIsOpen(false);
                                handleProtectedClick(e);
                            }}
                        >
                            My Notes
                        </Link>
                        
                        {token ? (
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                                className="w-full text-left block text-lg text-white hover:bg-purple-700 px-4 py-3 rounded-md transition duration-200"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link 
                                to="/login" 
                                className="block text-lg text-white bg-purple-700 hover:bg-purple-600 px-4 py-3 rounded-md transition duration-200 text-center shadow-md"
                                onClick={() => setIsOpen(false)}
                            >
                                Login / Register
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header;