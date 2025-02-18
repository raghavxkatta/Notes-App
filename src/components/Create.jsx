import { useState } from 'react';

function Create() {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({ title, note });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 px-4 py-12">
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8">
                <h1 className="text-4xl font-inter font-bold text-white mb-8 text-center">
                    Create A New Note
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note Title"
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-300/30 
                                text-white placeholder-purple-200 focus:outline-none focus:ring-2 
                                    focus:ring-purple-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <div>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Enter your note..."
                            rows="6"
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-300/30 
                                     text-white placeholder-purple-200 focus:outline-none focus:ring-2 
                                     focus:ring-purple-500 focus:border-transparent transition duration-200 
                                     resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 
                                 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transform 
                                 hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
                    >
                        Create Note
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Create;