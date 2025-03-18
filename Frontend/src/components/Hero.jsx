import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // Function to handle "Get Started Free" button click
  const handleGetStarted = () => {
    if (token) {
      // If user is logged in, go to notes page
      navigate('/notes');
    } else {
      // If user is not logged in, go to login page
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-700">
      {/* Hero section */}
      <div className="container mx-auto px-6 py-36 flex flex-col items-center text-center">
        <h1 className="text-5xl sm:text-8xl font-bold text-white mb-6">
          Capture Your Ideas<br />
          <span className="text-purple-300">Anytime, Anywhere</span>
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mt-4 mb-12">
          A powerful notes app designed to help you organize your thoughts, save important moments, and keep track of everything that matters in your digital journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleGetStarted}
            className="px-8 py-3 bg-white hover:bg-purple-100 text-purple-900 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            Get Started Free
          </button>
          <button className="px-8 py-3 bg-transparent border border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-all duration-200">
            Explore Features
          </button>
        </div>
      </div>

      {/* Features section */}
      <div className="container mx-auto px-6 py-24 bg-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-2">Why Choose Our Notes App</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Easy to Use</h3>
            <p className="text-purple-200">Simple and intuitive interface for seamless note-taking</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Organize Better</h3>
            <p className="text-purple-200">Keep your thoughts structured and easily accessible</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Access</h3>
            <p className="text-purple-200">Find your notes instantly with powerful search</p>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Notes App</h2>
          <p className="text-xl text-white/80 mb-8">Capture your ideas anytime, anywhere. The perfect companion for your thoughts.</p>
        </div>
      </div>

    
    </div>
  );
};

export default Hero;