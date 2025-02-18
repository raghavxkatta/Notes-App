import { useState } from 'react';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-purple-900 to bg-pink-900 shadow-lg backdrop-blur-lg py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                <div className="h-full flex items-center justify-between">
                    {/* Logo/Brand*/}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl font-inter font-bold text-white">
                            Notes App
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center flex-1 ml-20">
    <div className="flex space-x-12">
        <a href="/create" className="px-3 py-2 rounded-md text-2xl font-medium transition duration-300 ease-in-out 
                                    bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent 
                                    hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent animate-pulse">
            Create Note
        </a>
        <a href="/notes/:id" className="px-3 py-2 rounded-md text-2xl font-medium transition duration-300 ease-in-out 
                                    bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent 
                                    hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent animate-pulse">
            My Notes
        </a>
        <a href="/notes" className="px-3 py-2 rounded-md text-2xl font-medium transition duration-300 ease-in-out 
                                    bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent 
                                    hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent animate-pulse">
            All Notes
        </a>
    </div>
</div>

                    {/* Login Button  */}
                    <div className="hidden md:block">
                        <button className="bg-purple-800 cursor-pointer hover:bg-purple-700 text-white px-5  py-2 rounded-lg 
                                        font-medium transition duration-200 ease-in-out transform hover:scale-105">
                            Login/Register
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-purple-100 hover:text-white p-2 cursor-pointer "
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
                    <div className="px-2 pt-2 pb-3 space-y-6 transition-all ">
                        <a
                            href="/create"
                            className="block text-purple-100 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-600"
                        >
                            Create Note
                        </a>
                        <a
                            href="/notes/:id"
                            className="block text-purple-100 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-600"
                        >
                            My Notes
                        </a>
                        <a
                            href="/notes/:id"
                            className="block text-purple-100 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-600"
                        >
                            My Notes
                        </a>

                        <button className="w-full text-center bg-purple-600 cursor-pointer hover:scale-105  hover:bg-purple-700 text-white px-3 max-w-4xs 
                                        py-2 rounded-md text-base font-medium transition duration-150 ease-in-out">
                            Login
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Header;