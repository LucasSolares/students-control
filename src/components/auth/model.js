const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    username: String,
    password: String,
    email: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    rol: {
        type: String,
        required: false,
        default: 'ROL_ALUMNO'
    }
})

module.exports = mongoose.model('auth', schema)