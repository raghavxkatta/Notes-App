function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Gradient background with animated gradient overlay */}
      {/* absolute inset-0 helps cover the whole background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-800 to-pink-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI5NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjOEI1Q0Y2IiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzRDMUQ5NSIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTAgMGgxNDQwdjk2MEgweiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-24 text-center">
        {/* Abstract shapes */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Capture Your Ideas
          <span className="block text-purple-300">Anytime, Anywhere</span>
        </h1>

        <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-10 leading-relaxed">
          A powerful notes app designed to help you organize your thoughts, 
          save important moments, and keep track of everything that matters 
          in your digital journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className="px-8 py-4 bg-purple-800 hover:bg-purple-900 text-white text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 cursor-pointer">
            Get Started Free
          </button>
          
          <button 
            className="px-8 py-4 bg-purple-800 hover:bg-purple-900 hover:shadow-purple-500/50 text-white text-lg font-semibold rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer">
            Explore Features
          </button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: "Easy to Use",
              description: "Simple and intuitive interface for seamless note-taking"
            },
            {
              title: "Organize Better",
              description: "Keep your thoughts structured and easily accessible"
            },
            {
              title: "Quick Access",
              description: "Find your notes instantly with powerful search"
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-white/5 backdrop-blur-lg rounded-xl hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-purple-100/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;