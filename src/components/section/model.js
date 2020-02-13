const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    letter: String,
    asigned_users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})

module.exports = mongoose.model('section', schema)