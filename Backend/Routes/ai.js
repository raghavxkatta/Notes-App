import openai from '../../Frontend/src/config/OpenAiConfig.jsx'
import Note from '../models/Note.js'
import express from 'expreress'

const router = express.Router();

// Summarize a specific note
router.post('/summarize/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.jwtPayload.id;
        
        // Find the note and verify ownership
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        if (note.user.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to access this note' });
        }
        
        // Generate summary using OpenAI
        const completion = await openai.chat.completions.create({
            messages: [
                { 
                    role: "system", 
                    content: "You are a helpful assistant that summarizes notes concisely." 
                },
                { 
                    role: "user", 
                    content: `Summarize the following note in 3-4 bullet points:\n\n${note.title}\n${note.content}` 
                }
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 150,
        });
        
        const summary = completion.choices[0].message.content;
        
        // Return the summary
        res.status(200).json({ summary });
        
    } catch (error) {
        console.error('Error summarizing note:', error);
        res.status(500).json({ message: 'Failed to summarize note', error: error.message });
    }
});

// Organize and structure a note
router.post('/organize/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.jwtPayload.id;
        
        // Find the note and verify ownership
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        if (note.user.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to access this note' });
        }
        
        // Generate organized content using OpenAI
        const completion = await openai.chat.completions.create({
            messages: [
                { 
                    role: "system", 
                    content: "You are a helpful assistant that organizes notes with proper headings, bullet points, and structure." 
                },
                { 
                    role: "user", 
                    content: `Organize and structure the following note with proper headings, subheadings, and bullet points where appropriate. Keep all the information intact but make it more structured and readable:\n\n${note.title}\n${note.content}` 
                }
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 500,
        });
        
        const organizedContent = completion.choices[0].message.content;
        
        // Return the organized content
        res.status(200).json({ organizedContent });
        
    } catch (error) {
        console.error('Error organizing note:', error);
        res.status(500).json({ message: 'Failed to organize note', error: error.message });
    }
});


export default router;