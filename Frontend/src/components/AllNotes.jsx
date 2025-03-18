import { useState, useEffect } from "react";
import axiosInstance from "../config/AxiosInstance";
import { Link } from "react-router-dom";

function AllNotes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingNote, setEditingNote] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    const fetchNotes = async () => {
        try {
            const response = await axiosInstance.get("/notes");
            setNotes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to Fetch Notes");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/notes/${id}`);
            await fetchNotes(); /* This updates what the user sees */
        } catch (err) {
            setError(err.response?.data?.message || "Failed to Delete Note");
        }
    };

    /* Enable Edit Mode */
    const startEditing = (note) => {
        setEditingNote(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const handleEdit = async (id) => {
        try {
            await axiosInstance.put(`/notes/${id}`, {
                title: editTitle,
                content: editContent,
            });
            setEditingNote(null);
            await fetchNotes();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to Edit Note");
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
                <div className="text-white text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">
                    All Notes
                </h1>

                <div className="mb-6">
                    <Link
                        to="/notes/new"
                        className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-purple-500/50"
                    >
                        Create New Note
                    </Link>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                        {error}
                    </div>
                )}

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.length === 0 ? (
                        <div className="col-span-full text-center text-white text-lg">
                            No notes found. Create your first note!
                        </div>
                    ) : (
                        notes.map((note) => (
                            <div
                                key={note._id}
                                className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6"
                            >
                                {editingNote === note._id ? (
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-purple-300/30 
                        text-white placeholder-purple-200 focus:outline-none focus:ring-2"
                                        />
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-purple-300/30 
                        text-white placeholder-purple-200 focus:outline-none focus:ring-2 min-h-[100px]"
                                        />
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(note._id)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingNote(null)}
                                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-xl font-semibold text-white mb-2">
                                            {note.title}
                                        </h2>
                                        <p className="text-purple-200 mb-4">{note.content}</p>
                                        <div className="flex justify-between">
                                            <button
                                                onClick={() => startEditing(note)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(note._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllNotes;
