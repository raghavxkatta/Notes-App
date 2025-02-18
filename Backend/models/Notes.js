import { Schema, model } from 'mongoose'
const notesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }
}, { timestamps: true })

export default  model('Notes', notesSchema)