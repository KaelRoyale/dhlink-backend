const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Requests = new Schema(
    {
        user_name: { type: String, required: true },
        user_email: {type: String, required: true},
        category: [Number],
        content: { type: String, required: true }
        
    }
    
)

module.exports = mongoose.model('Requests', Requests)