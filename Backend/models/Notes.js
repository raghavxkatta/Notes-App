import mongoose,{ Schema, model } from 'mongoose'
const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}, { timestamps: true })

export default  model('Notes', notesSchema)