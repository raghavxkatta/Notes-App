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

    // For debugging
    console.log("Auth state in Header:", { user, token });

    return (
        <nav className="bg-gradient-to-r from-purple-900 to bg-pink-900 shadow-lg backdrop-blur-lg py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                <div className="h-full flex items-center justify-between">
                    {/* Logo/Brand*/}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-inter font-bold text-white">
                            Think Pad
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-12">
                            {token ? (
                                <>
                                    <Link to="/notes/new" className="px-3 py-2 rounded-md text-2xl font-medium transition duration-300 ease-in-out 
                                                bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent 
                                                hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent">
                                        Create Note
                                    </Link>
                                    <Link to="/notes" className="px-3 py-2 rounded-md text-2xl font-medium transition duration-300 ease-in-out 
                                                bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent 
                                                hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent">
                                        My Notes
                                    </Link>
                                </>
                            ) : (
                                <Link to="/" className="px-3 py-2 rounded-md text-2xl font-medium transition duration-300 ease-in-out 
                                            bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent 
                                            hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent">
                                    Home
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Login/Logout Button */}
                    <div className="hidden md:block">
                        {token ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-white">{user?.username ? `Welcome, ${user.username}` : 'Welcome'}</span>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-purple-800 cursor-pointer hover:bg-purple-700 text-white px-5 py-2 rounded-lg 
                                            font-medium transition duration-200 ease-in-out transform hover:scale-105">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-purple-800 cursor-pointer hover:bg-purple-700 text-white px-5 py-2 rounded-lg 
                                            font-medium transition duration-200 ease-in-out transform hover:scale-105">
                                Login/Register
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-purple-100 hover:text-white p-2 cursor-pointer"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-purple-900/95 backdrop-blur-lg">
                    <div className="px-2 pt-2 pb-3 space-y-6 transition-all">
                        {token ? (
                            <>
                                <Link
                                    to="/notes/new"
                                    className="block text-purple-100 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Create Note
                                </Link>
                                <Link
                                    to="/notes"
                                    className="block text-purple-100 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    My Notes
                                </Link>
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-center bg-purple-600 cursor-pointer hover:scale-105 hover:bg-purple-700 text-white px-3 max-w-4xs 
                                            py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="block text-purple-100 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/login"
                                    className="w-full text-center bg-purple-600 cursor-pointer hover:scale-105 hover:bg-purple-700 text-white px-3 max-w-4xs 
                                            py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Header;