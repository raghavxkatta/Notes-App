import express from 'express'
const router=express.Router()
import Note from '../models/Notes'

/* To create a new note */
router.post('/' ,async(req,res)=>{
    const {title,content}=req.body
    try{
        const newNote= new Note({
            title,
            content
        })
        await newNote.save()
        res.status(201).json(newNote)
    }
    catch(err){
        res.status(400).json({message:'Error creating a Note', error:err.message})
    }
})

/* To read All Notes */
router.get('/', async(req,res)=>{
    try{
        const notes=await Note.find()
        res.status(200).json(notes)
    }
    catch(err){
        res.status(400).json({message:'Error fetching notes', error:err.message})
    }
})

/* To read a specific note with ID */
router.get('/:id', async(req,res)=>{
    try{
        const {id}=req.params
        const note=await Note.findById(id) 
        if (!note) {
            return res.status(404).json({ message: `Note with ID ${id} not found` });
        } 
        res.status(200).json(note)
    }
    catch (err) {
        res.status(400).json({ message: `Error fetching note with ID ${req.params.id}`, error: err.message });
    }

})

/* To update a Note */
router.put('/:id',async (req,res)=>{
    try{
    const {id}=req.params
    const{title,content}=req.body
        const updatedNote= await Note.findByIdAndUpdate(id,{title,content},{new:true})
        if(!updatedNote){
        return res.status(404).json({message:`Note with ID ${id} not found`})
        }
        res.status(200).json(updatedNote)
        
    }
    catch(err){
        res.status(400).json({message:`Error updating note with Id ${req.params.id}`,error:err.message})
    }
    
})

/* To Delete a Note */
router.delete('/:id',async(req,res)=>{
    try{
        const{id}=req.params
    const deletedNote=await Note.findByIdAndDelete(id)
    if(!deletedNote){
        return res.status(404).json({message:`Note with ${id} not found`})
    }
    res.status(200).json({message:`Note with id ${id} has been deleted`})
    }
    catch(err){
        res.status(400).json({message:`Failed to Delete Note with id ${req.params.id}`,error:err.message})
    }
    
})
