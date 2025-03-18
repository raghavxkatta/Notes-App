import express from 'express'
const router = express.Router()
import Note from '../models/Notes.js'

/* To create a new note */
router.post('/', async (req, res) => {


    try {
        const { title, content } = req.body;
        const userId = req.jwtPayload.id;
        // Checking if body is an array or single object
        if (Array.isArray(req.body)) {
            // Insert multiple notes
            const notesWithUser = req.body.map(note => ({ ...note, user: userId }));
            const newNotes = await Note.insertMany(notesWithUser);
            res.status(201).json(newNotes);
        } else {
            // Create a single note
            const newNote = new Note({
                title,
                content,
                user: userId
            });
            await newNote.save();
            res.status(201).json(newNote);
        }
    } catch (err) {
        res.status(400).json({ message: 'Error creating notes', error: err.message });
    }
});

/* To read All Notes of a User */
router.get('/', async (req, res) => {
    try {
        // Getting User ID from JWT Payload
        const userId=req.jwtPayload.id
        /* Finding only those notes that belong to the current user */
        const notes = await Note.find({user:userId})
        res.status(200).json(notes)
    }
    catch (err) {
        res.status(400).json({ message: 'Error fetching notes', error: err.message })
    }
})

/* To read a specific note with ID */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const note = await Note.findById(id)

        /* Checking if note exists */
        if (!note) {
            return res.status(404).json({ message: `Note with ID ${id} not found` });
        }
        // Check if the note belongs to the current user
        if (note.user && note.user.toString() !== req.jwtPayload.id) {
            return res.status(403).json({ message: 'Not authorized to access this note' });
        }
        res.status(200).json(note)
    }
    catch (err) {
        res.status(400).json({ message: `Error fetching note with ID ${req.params.id}`, error: err.message });
    }
})

/* To update a Note */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body
        const note = await Note.findById(id)

        // Cheching if note exists
        if (!note) {
            return res.status(404).json({ message: `Note with ID ${id} not found` })
        }
        // Authorization check
        if (note.user && note.user.toString() !== req.jwtPayload.id) {
            return res.status(403).json({ message: "Not authorized to update this note" });
        }

        // Update after checks
        note.title = title || note.title;
        note.content = content || note.content;
        const updatedNote = await note.save();

        res.status(200).json(updatedNote)
    }
    catch (err) {
        res.status(400).json({ message: `Error updating note with Id ${req.params.id}`, error: err.message })
    }

})

/* To Delete a Note */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const note = await Note.findById(id);
        
        if (!note) {
            return res.status(404).json({ message: `Note with ${id} not found` })
        }
        // Authorization check
        if (note.user && note.user.toString() !== req.jwtPayload.id) {
            return res.status(403).json({ message: "Not authorized to delete this note" });
        }
        // Now delete the note
        await Note.findByIdAndDelete(id);
        res.status(200).json({message:`Note with id ${id} has been deleted`});
    }
    catch (err) {
        res.status(400).json({ message: `Failed to Delete Note with id ${req.params.id}`, error: err.message })
    }

})

export default router