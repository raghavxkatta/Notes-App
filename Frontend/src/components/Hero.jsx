import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

      {/* Footer */}
      <footer className="bg-purple-950 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-purple-300 hover:text-white">Home</Link></li>
                <li>
                  <Link 
                    to={token ? "/notes/new" : "/login"}
                    className="text-purple-300 hover:text-white"
                    onClick={(e) => !token && navigate('/login')}
                  >
                    Create Note
                  </Link>
                </li>
                <li>
                  <Link 
                    to={token ? "/notes" : "/login"}
                    className="text-purple-300 hover:text-white"
                    onClick={(e) => !token && navigate('/login')}
                  >
                    All Notes
                  </Link>
                </li>
                <li><Link to="/login" className="text-purple-300 hover:text-white">Login</Link></li>
                <li><Link to="/register" className="text-purple-300 hover:text-white">Register</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-purple-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white">API References</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white">Support</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-white text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-purple-300 mb-4">Subscribe to our newsletter for tips and updates.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 rounded-l-lg bg-white/10 border-purple-300/30 text-white w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-purple-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-300">© 2025 Notes App. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-purple-300 hover:text-white">Privacy</a>
              <a href="#" className="text-purple-300 hover:text-white">Terms</a>
              <a href="#" className="text-purple-300 hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;