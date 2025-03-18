import { useState } from 'react';
import axiosInstance from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError('Title and content are required');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await axiosInstance.post('/notes', {
                title: title.trim(),
                content: content.trim()
            });
            
            if (response.status === 201) {
                setSuccess('Note created successfully!');
                // Redirect to notes list after short delay
                setTimeout(() => {
                    navigate('/notes');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create note. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 px-4 py-12">
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8">
                <h1 className="text-4xl font-inter font-bold text-white mb-8 text-center">
                    Create A New Note
                </h1>
                
                {error && (
                    <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
                        {success}
                    </div>
                )}

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
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 
                            hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transform 
                            hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-purple-500/50
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Create Note'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Create;