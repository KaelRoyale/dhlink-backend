const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Services = new Schema(
    {
        service_name: { type: String, required: true },
        description: { type: String, required: true },
        version: { type: Number, required: true },
        apis : [{
            confluent_api: [{
                pipeline_url: {
                    type: String
                },
                version: {type: Number, required: true}
            }]
        }]
    }
    
)

module.exports = mongoose.model('Services', Services)