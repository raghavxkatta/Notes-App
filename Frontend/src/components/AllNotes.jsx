import React,{useState,useEffect} from 'react';
import axios from 'axios'

function AllNotes(){
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingNote, setEditingNote] = useState(null);
        const [editTitle, setEditTitle] = useState('');
        const [editContent, setEditContent] = useState('');


    const fetchNotes=async()=>{
        try{
            const response=await axios.get('http://localhost:5000/api/notes/')
            setNotes(response.data)
        }
        catch(err){
            setError(err.response?.data?.message||'Failed to Fetch Notes')
        }
        /* Toh agar load ho rhi hogi toh neeche waala dikhega */
        finally{
            setLoading(false)
    }
}


const handleDelete=async(id)=>{
    try{
        await axios.delete(`http://localhost:5000/api/notes/${id}`)
        await fetchNotes()/* This updates what the user sees */
    }
    catch(err){
        setError(err.response?.data?.message||'Failed to Delete Note')
    }
}
/* Enable Edit Mode */
const startEditing=(note)=>{
    setEditingNote(note._id)
    setEditTitle(note.title)
    setEditingContent(note.content)
}

const handleEdit=async(id)=>{
    try{
        await axios.put(`http://localhost:5000/api/notes/${id}`,{title:editTitle,content:editContent})
        setEditingNote(null)
        await fetchNotes()
        
    }
    catch(err){
        setError(err.response?.data?.message||'Failed to Edit Note')
    }
}

    useEffect(()=>{
fetchNotes()
    },[])

if(loading){
    return(
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className=" text-white text-center ">Loading...</div>
        </div>
    )
}
    return(
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 px-4 py-12">
        <div className="max-w-7xl mx-auto ">
            {/* Error Aagya fetch karne mein */}
        {error && (
                    <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                        {error}
                    </div>
                )}
                <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note)=>(
                        <div key={note._id} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8">
                        <h1 className="text-xl">{note.title}</h1>
                        <p className="text-purple-200">{note.content}</p>

<button className="" onClick={()=>handleDelete(note._id)}>
    Delete
</button>
<button className='' onClick={()=>handleEdit(note._id)}>
    Edit
</button>
                </div>))}
        </div>
        <h1>All Notes</h1>  

    </div>
    </div>
)  
}

export default AllNotes

